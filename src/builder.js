import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { config } from './config.js';
import { loadPlugins, slugify, htmlToText } from './utils/builderUtils.js';

export async function build() {
    const plugins = await loadPlugins(config);

    const postsDir = path.join(process.cwd(), config.postDir || 'posts');
    const themeDir = path.join(process.cwd(), 'themes', config.theme || 'default');
    const componentsDir = path.join(themeDir, config.componentsDir || 'components');
    const outputDir = path.join(process.cwd(), config.outputDir || 'dist');
    const postsOutputDir = path.join(outputDir, config.postDir || 'post');
    const publicDir = path.join(process.cwd(), 'public');
    const publicOutputDir = path.join(outputDir);

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    if (!fs.existsSync(postsOutputDir)) fs.mkdirSync(postsOutputDir, { recursive: true });

    function replaceComponents(template) {
      return template.replace(/%(.*?)%/g, (_, key) => {
        const compPath = path.join(componentsDir, `${key.trim()}.html`);
        return fs.existsSync(compPath) ? fs.readFileSync(compPath, 'utf-8') : `<!-- Component ${key} not found -->`;
      });
    }

    function replaceBaseUrl(content, config) {
      const baseUrl = config.baseUrl || "/";
      const normalized = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
      return content.replace(/{base_url}/g, normalized);
    }


    const md = new MarkdownIt({ html: true });
    const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];
    const postList = [];

    let postTemplate = fs.readFileSync(path.join(componentsDir, 'posts.html'), 'utf-8');
    postTemplate = postTemplate
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');

    files.forEach(file => {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, content: markdown } = matter(content);

        if (!data.title) {
          return console.warn(`⚠️ Post "${file}" is missing a title in its front matter.`);
        }

        let processedMarkdown = markdown;
        for (const plugin of plugins) {
            if (plugin.onMarkdownParse) {
              processedMarkdown = plugin.onMarkdownParse(processedMarkdown, data);
            }
        }

        const html = md.render(processedMarkdown);
        const excerpt = htmlToText(html).slice(0, 200) + '...';

        postList.push({ 
          ...data, 
          url: `post/${slugify(data.title || '')}`,
          excerpt
        });

        let postFullTemplate = fs.readFileSync(path.join(themeDir, 'post.html'), 'utf-8');
        postFullTemplate = replaceComponents(postFullTemplate)
          .replace(/{{title}}/g, config.title || 'My Zeno Blog')
          .replace(/{{post_title}}/g, data.title || '')
          .replace(/{{date}}/g, data.date || '')
          .replace(/{{content}}/g, html);
        postFullTemplate = replaceBaseUrl(postFullTemplate, config);

        for (const plugin of plugins) {
            if (plugin.onRenderHTML) {
              postFullTemplate = plugin.onRenderHTML(postFullTemplate, data);
            }
        }

        const slug = slugify(data.title || '');
        const postDir = path.join(postsOutputDir, slug);
        if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });
        fs.writeFileSync(path.join(postDir, 'index.html'), postFullTemplate);
    });

    const postListSorted = postList.sort((a, b) => {
      const dateA = new Date(a.date || '1970-01-01');
      const dateB = new Date(b.date || '1970-01-01');
      return dateB.getTime() - dateA.getTime();
    });

    const postsFile = path.join(outputDir, 'posts.json');
    fs.writeFileSync(postsFile, JSON.stringify(postListSorted, null, 2));

    let indexTemplate = fs.readFileSync(path.join(themeDir, 'index.html'), 'utf-8');
    indexTemplate = indexTemplate.replace(/%posts%/g, '<div id="posts-container" class="posts-container"></div><div id="pagination"></div>');
    indexTemplate = replaceComponents(indexTemplate)
      .replace(/{{title}}/g, config.title || 'My Zeno Blog');

    // Inject JS for dynamic rendering & pagination
    const postsLoaderScript = `
<script>
  const itemsPerPage = ${config.postsPerPage || 5};
  let currentPage = 1;
  let posts = [];
  const postTemplate = \`${postTemplate}\`;

  async function loadPosts() {
    posts = await fetch('posts.json').then(r => r.json());
    renderPage(currentPage);
  }

  function renderPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const container = document.getElementById('posts-container');

    container.innerHTML = posts
      .slice(start, end)
      .map(p => {
        let html = postTemplate;
        html = html.replace(/{{post_title}}/g, p.title)
                   .replace(/{{date}}/g, p.date || '')
                   .replace(/{{slug}}/g, p.url)
                   .replace(/{{excerpt}}/g, p.excerpt || '');
        return html;
      }).join('');

    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = Array.from({length: totalPages}, (_, i) =>
      \`<button \${i+1===page?'disabled':''} onclick="renderPage(\${i+1})">\${i+1}</button>\`
    ).join(' ');
  }

  loadPosts();
</script>
`;

    indexTemplate += postsLoaderScript;
    indexTemplate = replaceBaseUrl(indexTemplate, config);

    for (const plugin of plugins) {
        if (plugin.onRenderHTML) {
            indexTemplate = plugin.onRenderHTML(indexTemplate, { homepage: true });
        }
    }

    // Copy theme CSS
    fs.copyFileSync(path.join(themeDir, 'style.css'), path.join(outputDir, 'style.css'));
    fs.writeFileSync(path.join(outputDir, 'index.html'), indexTemplate);

    // Run post-build hooks
    for (const plugin of plugins) {
        if (plugin.onPostBuild) {
          plugin.onPostBuild(outputDir);
        }
    }

    // Copy public folder
    if (fs.existsSync(publicDir)) {
      fs.cpSync(publicDir, publicOutputDir, { overwrite: true, recursive: true });
    }

    console.log('✅ Blog built successfully');
}

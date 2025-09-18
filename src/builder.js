import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { config } from './config.js';

async function loadPlugins() {
  const plugins = [];
  for (const p of config.plugins || []) {
    const pluginPath = path.join(process.cwd(), 'plugins', `${p.name}.js`);
    if (fs.existsSync(pluginPath)) {
      const mod = await import(pathToFileURL(pluginPath).href);
      plugins.push(mod.default(p.options || {}));
    } else {
      console.warn(`⚠️ Plugin "${p.name}" not found at ${pluginPath}`);
    }
  }
  return plugins;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function htmlToText(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function build() {
    const plugins = await loadPlugins();

    const postsDir = path.join(process.cwd(), 'posts');
    const themeDir = path.join(process.cwd(), 'themes', config.theme || 'default');
    const componentsDir = path.join(themeDir, 'components');
    const outputDir = path.join(process.cwd(), 'dist');
    const postsOutputDir = path.join(outputDir, 'post');

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    if (!fs.existsSync(postsOutputDir)) fs.mkdirSync(postsOutputDir, { recursive: true });

    function replaceComponents(template) {
      return template.replace(/%(.*?)%/g, (_, key) => {
        const compPath = path.join(componentsDir, `${key.trim()}.html`);
        return fs.existsSync(compPath) ? fs.readFileSync(compPath, 'utf-8') : `<!-- Component ${key} not found -->`;
      });
    }

    const md = new MarkdownIt({ html: true });
    const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];
    let postsListHTML = '';

    files.forEach(file => {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, content: markdown } = matter(content);

        let processedMarkdown = markdown;
        for (const plugin of plugins) {
            if (plugin.onMarkdownParse) {
              processedMarkdown = plugin.onMarkdownParse(processedMarkdown, data);
            }
        }

        const html = md.render(processedMarkdown);

        let postPreviewTemplate = fs.readFileSync(path.join(componentsDir, 'posts.html'), 'utf-8');
        postPreviewTemplate = postPreviewTemplate
          .replace(/{{post_title}}/g, data.title || '')
          .replace(/{{date}}/g, data.date || '')
          .replace(/{{excerpt}}/g, htmlToText(html).slice(0, 200) + '...')
          .replace(/{{slug}}/g, slugify(data.title));

        for (const plugin of plugins) {
          if (plugin.onRenderHTML) {
            postPreviewTemplate = plugin.onRenderHTML(postPreviewTemplate, data);
          }
        }

        postsListHTML += postPreviewTemplate;

        let postFullTemplate = fs.readFileSync(path.join(themeDir, 'post.html'), 'utf-8');
        postFullTemplate = replaceComponents(postFullTemplate)
          .replace(/{{title}}/g, config.title || 'My Zeno Blog')
          .replace(/{{post_title}}/g, data.title || '')
          .replace(/{{date}}/g, data.date || '')
          .replace(/{{content}}/g, html);

        for (const plugin of plugins) {
            if (plugin.onRenderHTML) {
              postFullTemplate = plugin.onRenderHTML(postFullTemplate, data);
            }
        }

        const slug = slugify(data.title);
        const postDir = path.join(postsOutputDir, slug);
        if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });
        fs.writeFileSync(path.join(postDir, 'index.html'), postFullTemplate);
    });

    let indexTemplate = fs.readFileSync(path.join(themeDir, 'index.html'), 'utf-8');

    // BUG: need to push the postsListHTML into index.html first
    indexTemplate = indexTemplate.replace(/%posts%/g, postsListHTML);
    
    indexTemplate = replaceComponents(indexTemplate)
      .replace(/{{title}}/g, config.title || 'My Zeno Blog')

    for (const plugin of plugins) {
        if (plugin.onRenderHTML) {
            indexTemplate = plugin.onRenderHTML(indexTemplate, { homepage: true });
        }
    }

    fs.copyFileSync(path.join(themeDir, 'style.css'), path.join(outputDir, 'style.css'));
    fs.writeFileSync(path.join(outputDir, 'index.html'), indexTemplate);

    for (const plugin of plugins) {
        if (plugin.onPostBuild) {
          plugin.onPostBuild(outputDir);
        }
    }


    console.log('✅ Blog built successfully, preview with "zeno serve"');
}

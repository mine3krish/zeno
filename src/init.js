#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

export function init(projectName = 'mysite') {
      const baseDir = path.join(process.cwd(), projectName);

      if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

      const folders = [
        'posts',
        'themes/default/components',
        'plugins'
      ];

      folders.forEach(f => {
        const dir = path.join(baseDir, f);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      });

      const indexHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>{{title}}</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      %navbar%
      <main id="posts">
        %posts%
      </main>

      <footer>
        <hr>
        <p>Powered by Zeno 🚀</p>
      </footer>
    </body>
    </html>
      `.trim();

      const postHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>{{post_title}}</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      %navbar%
      <article>
        <h1>{{post_title}}</h1>
        <p class="date">{{date}}</p>
        <div class="content">{{content}}</div>
      </article>
    </body>
    </html>
      `.trim();

      const styleCSS = `
    body { font-family: sans-serif; margin: 2rem; line-height: 1.6; }
    h1, h2, h3 { margin-top: 1.5rem; }
    article { margin-bottom: 2rem; }
    .date { color: gray; font-size: 0.9rem; }
    a { color: #007acc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    footer { margin-top: 3rem; font-size: 0.8rem; color: gray; }
      `.trim();

      const configJSON = JSON.stringify({
        title: 'My Zeno Blog',
        theme: 'default',
        plugins: []
      }, null, 2);

      const components = {
        'navbar.html': `
    <nav>
      <a href="/">Home</a> | 
      <a href="https://github.com/mine3krish/zeno">mine3krish/zeno</a>
    </nav>
    <hr>
        `.trim(),

        'posts.html': `
    <article class="post-preview">
      <h2><a href="/post/{{slug}}/">{{post_title}}</a></h2>
      <p class="date">{{date}}</p>
      <p class="excerpt">{{excerpt}}</p>
    </article>
        `.trim()
      };

      if (!fs.existsSync(path.join(baseDir, 'themes/default/index.html'))) {
        fs.writeFileSync(path.join(baseDir, 'themes/default/index.html'), indexHTML);
      }

      if (!fs.existsSync(path.join(baseDir, 'themes/default/post.html'))) {
        fs.writeFileSync(path.join(baseDir, 'themes/default/post.html'), postHTML);
      }

      if (!fs.existsSync(path.join(baseDir, 'themes/default/style.css'))) {
        fs.writeFileSync(path.join(baseDir, 'themes/default/style.css'), styleCSS);
      }

      for (const [name, content] of Object.entries(components)) {
        const filePath = path.join(baseDir, 'themes/default/components', name);
        if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, content);
      }

      if (!fs.existsSync(path.join(baseDir, 'zeno.config.json'))) {
        fs.writeFileSync(path.join(baseDir, 'zeno.config.json'), configJSON);
      }

      console.log(`✅ Zeno project '${projectName}' initialized successfully!`);
      console.log(`➡️  cd ${projectName} && npx zeno build && npx zeno serve`);
}

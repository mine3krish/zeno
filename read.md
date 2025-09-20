# Zeno — Blazing fast blogs for everyone

Zeno is a lightweight, plugin-first Markdown → Blog framework built with JavaScript. It's designed to be simple, hackable, and extendable.

---

## 🚀 Quick Start

```bash
# Create a new blog
npx zeno init mysite
cd mysite

# Build the blog
zeno build

# Start the development server
zeno serve 3000
```

---

## ✨ Core MVP Features

* **Markdown to HTML** — Write posts in plain `.md` files with frontmatter.
* **Themes** — Simple folder-based themes (`post.html`, `index.html`, `style.css`).
* **Plugins** — Extend with hooks: `onMarkdownParse`, `onRenderHTML`, `onPostBuild`.
* **CLI** — `init`, `build`, `serve` commands.
* **Config file** — `zeno.config.json` for theme + plugins.
* **Tags support** — Add tags in post frontmatter to show on homepage and post pages.

---

## 🛠 Example Workflow

```bash
# create new blog
npx zeno-blog init mysite
cd mysite

# build blog
zeno build

# start local dev server
zeno serve 3000
```

---

## 🔌 Example Plugin

```js
// plugins/popup.js
export default function popupPlugin(options) {
  return {
    name: 'popup-plugin',
    onRenderHTML(html) {
      const script = `
        <script>
          window.addEventListener('load', () => {
            alert('${options.message || "Hello from plugin!"}');
          });
        </script>
      `;
      return html.replace('</body>', script + '</body>');
    }
  };
}
```

Configure in `zeno.config.json`:

```json
{
  "title": "My Blog",
  "theme": "default",
  "plugins": [
    { "name": "popup", "options": { "message": "Welcome to my blog!" } }
  ]
}
```

---

## 📝 Markdown Post Example

```md
---
title: "What is Zeno?"
date: "2025-09-19"
tags: "first post, blog"
---

Zeno is a plugin-first Markdown blog framework built in JavaScript. It allows you to write in Markdown, apply themes, extend with plugins, and publish your blog with one command.
```

---

## 🏗 Theme Structure

```
themes/default/
├── components/
│   ├── navbar.html
│   └── posts.html
├── index.html
├── post.html
└── style.css
```

* `components/` — Reusable components for your pages.
* `index.html` — Home page template.
* `post.html` — Individual post template.
* `style.css` — Theme styles.

---

## ⚡ Plugin Hooks

* `onMarkdownParse(markdown, frontmatter)` — Modify Markdown before rendering.
* `onRenderHTML(html, frontmatter)` — Modify HTML after rendering.
* `onPostBuild(distDir)` — Hook after the blog is built.

---

## 💡 Features in Progress

* Tag archive pages.
* Filtering posts by tags.
* Advanced theme customization.

---

## 📂 Project Structure

```
zeno/
├── bin/
│   └── zeno.js
├── src/
│   ├── builder.js
│   ├── cli.js
│   ├── config.js
│   └── server.js
├── plugins/
│   └── popup.js
├── themes/
│   └── default/
└── posts/
    └── first-post.md
```

---

## ✅ MVP Goal

Deliver a fast, hackable blogging framework where developers can:

* Write in Markdown
* Apply themes
* Extend with plugins
* Add tags to posts
* Publish with one command
# ✨ Zeno – Markdown ➡️ Blog Framework(#-zeno--markdown--blog-framework)
<p align="center"> <img src="docs/images/logo.png" alt="Zeno Logo" width="120"/> </p> <p align="center"> <b>Turn your Markdown files into a full-featured blog with zero hassle 🚀</b> </p> <p align="center"> <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a> <img src="https://img.shields.io/badge/Node-%3E=18-green"> <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen"> <img src="https://img.shields.io/github/stars/mine3krish/zeno?style=social"> </p>

## 📑 Table of Contents

- [✨ Features](#-features)
- [🎯 MVP Goal](#-mvp-goal)
- [🚀 Quick Start](#-quick-start)
- [📂 Project Structure](#-project-structure)
- [🖼 Example](#-example)
- [⚙️ Configuration](#️-configuration)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [⚡ Plugin Hooks (Developers)](#-plugin-hooks-developers)
- [📜 License](#-license)

<hr>

### ✨ Features

- ✅ Write posts in Markdown
- ✅ Zero Config – start instantly
- ✅ 🎨 Custom Themes (minimal, modern, dark, etc.)
- ✅ ⚡ Hot Reload for instant previews
- ✅ 📦 Static Export for deployment (Netlify, Vercel, GitHub Pages)
- ✅ 🌍 Beginner-friendly open source project

<hr>

### 🎯 MVP Goal
Deliver a fast, hackable blogging framework where developers can:
- 📝 Write in Markdown
- 🎨 Apply themes
- ⚡ Extend with plugins
- 🏷️ Add tags to posts
- 🚀 Publish with one command

<hr>

### 🚀 Quick start 
 🔧 Requirements
- Node.js v18+
- npm/yarn/pnpm

⚡ Install & Run
```bash
# Create a new blog
npx zeno init mysite
cd mysite

# Build the blog
zeno build

# Start the development server
zeno serve 3000
```
Open 👉 http://localhost:3000
<hr>

### 📂 Project Structure

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
<hr> 

### 🖼 Example 

```md
---
title: "What is Zeno?"
date: "2025-09-19"
tags: "first post, blog"
---

Zeno is a plugin-first Markdown blog framework built in JavaScript. It allows you to write in Markdown, apply themes, extend with plugins, and publish your blog with one command.
```

👉 Renders as:

<p align="center"> <img src="docs/images/sample-blog.png" width="600" alt="Sample Blog Screenshot"/> </p>

<hr>

### ⚙️ Configuration
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
<hr>

### 🛣 Roadmap 
- [ ] 🌗 Dark mode toggle
- [ ] 🏷️ Tag archive pages  
- [ ] 🔍 Filtering posts by tags  
- [ ] 🎨✨ Advanced theme customization  

<hr>

### 🤝 Contributing 
💡 Contributions are welcome!
- 1. Fork the repo 
- 2. Create a feature branch (git checkout -b feature/my-feature)
- 3. Commit and push your changes 
- 4. Submit a pull request 

[![Contributing](https://img.shields.io/badge/Contributing-Guidelines-blue)](CONTRIBUTING.md) 

<hr>

### ⚡ Plugin Hooks (Developers)
Zeno provides plugin hooks so developers can extend functionality:
- onMarkdownParse(markdown, frontmatter) — Modify Markdown before rendering.
- onRenderHTML(html, frontmatter) — Modify HTML after rendering.
- onPostBuild(distDir) — Hook after the blog is built.

<hr>

### 📜 License
Zeno is licensed under the MIT License - see [LICENSE](LICENSE)

<hr>
<hr>

## 🔥 Start blogging the easy way with Zeno today!
<p align="center"><a href="#-zeno--markdown--blog-framework">⬆️ Back to Top</a></p>
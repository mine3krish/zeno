---
title: What is Zeno?
date: 2025-09-19
tags: "how to"
---

### Introduction

Zeno is a **plugin-first Markdown → Blog framework** built with JavaScript. It’s designed to make blogging fast, hackable, and flexible for developers. You can write your posts in Markdown, apply themes, extend functionality with plugins, and publish your blog with a single command.

### Why Zeno?

Many blogging frameworks are either heavy, complicated, or hard to customize. Zeno solves these problems by being:

- **Lightweight**: Minimal setup, minimal dependencies.
- **Plugin-First**: Add or remove functionality easily.
- **Markdown-Based**: Focus on writing content, not dealing with complex HTML templates.
- **Theme-Friendly**: Build or switch themes easily.
- **CLI-Powered**: Manage your blog from the terminal.

### Core Features

#### Markdown to HTML

Write posts in simple `.md` files with frontmatter (like `title` and `date`) and let Zeno automatically convert them to beautiful HTML.

#### Themes

Zeno uses **folder-based themes**, so you can include files like:

- `index.html`
- `post.html`
- `style.css`

You can also create reusable **components** such as `navbar.html` or `posts.html` that get injected dynamically.

#### Plugins

Extend Zeno’s functionality using hooks like:

- `onMarkdownParse` – Modify Markdown before rendering.
- `onRenderHTML` – Modify HTML after rendering.
- `onPostBuild` – Run custom actions after the build is done.

#### CLI Commands

Zeno comes with a simple CLI:

```bash
npx zeno init mysite   # initialize a new blog
zeno build             # build the blog
zeno serve -p 3000     # serve locally
```

### Example Plugins
- TOC Plugin – Automatically generate a Table of Contents from headings.

### Getting Started
1. Initialize a new blog:
```bash
npx zeno init mysite
cd mysite
```
2. Add posts in the posts/ folder.
3. Run `zeno build` to generate your blog in /dist.
4. Serve it locally with `zeno serve`.
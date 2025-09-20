---
title: "Introduction to Zeno"
date: "2025-09-19"
tags: "getting-started, introduction, overview"
---

Welcome to **Zeno** — the blazing fast, plugin-first Markdown blog framework that makes creating beautiful blogs effortless. Whether you're a developer looking for a simple blogging solution or someone who wants complete control over their blog's functionality, Zeno is designed to get out of your way and let you focus on what matters: **writing great content**.

## What is Zeno?

Zeno is a lightweight, JavaScript-based static site generator specifically built for blogs. It transforms your Markdown files into beautiful, fast-loading websites with minimal configuration. Think of it as the perfect balance between simplicity and power.

```bash
# It's really this simple
npx zeno-blog init my-blog
cd my-blog
zeno build
zeno serve
```

Unlike heavyweight frameworks that come with everything you might never need, Zeno starts minimal and grows with your requirements through its powerful plugin system.

## Why Choose Zeno?

### 🚀 **Blazing Fast**
- **Zero client-side JavaScript** by default
- **Optimized build process** with minimal overhead
- **Static file generation** for maximum performance
- **CDN-ready** output that scales globally

### ✨ **Developer-First**
- **Plugin architecture** — extend functionality exactly how you need it
- **Simple CLI** with intuitive commands
- **Hot reload development** server
- **Theme system** for complete design control

### 📝 **Content-Focused**
- **Write in Markdown** with frontmatter support
- **Tags and categorization** built-in
- **No database required** — your content is version-controlled
- **Easy migration** from other platforms

### 🛠 **Hackable & Extensible**
- **Hook-based plugins** for maximum flexibility
- **Component-based themes** for reusability
- **Simple configuration** via JSON
- **Open source** and community-driven

## How Zeno Works

Zeno follows a simple, predictable workflow:`

1. **Write content** in Markdown files with frontmatter metadata
2. **Configure** your blog with a simple JSON file
3. **Choose a theme** or create your own
4. **Add plugins** for extra functionality
5. **Build** your blog into optimized static files
6. **Deploy** anywhere — GitHub Pages, Netlify, Vercel, or your own server

## Core Philosophy

Zeno is built around several core principles:

### **Convention over Configuration**
Sensible defaults mean you can get started immediately, but everything is customizable when you need it.

### **Plugin-First Architecture**
The core is intentionally minimal. Features are added through plugins, keeping the framework lean and focused.

### **Developer Experience**
Fast builds, hot reloading, clear error messages, and intuitive APIs make development enjoyable.

### **Performance by Default**
Every decision is made with performance in mind — from the build process to the generated output.

## What Makes Zeno Different?

| Feature | Zeno | Gatsby | Next.js | Hugo |
|---------|------|---------|---------|------|
| **Learning Curve** | Minimal | Steep | Medium | Medium |
| **Build Speed** | ⚡ Fast | Slow | Medium | ⚡ Very Fast |
| **Plugin System** | Simple hooks | GraphQL-heavy | Complex | Go templates |
| **JavaScript Required** | No | Yes | Yes | No |
| **Customization** | Theme-based | Component-heavy | Full-stack | Template-based |
| **Best For** | Blogs | Complex sites | Full apps | Documentation |

## Quick Example

Here's what a typical Zeno workflow looks like:

**1. Create a new blog:**
```bash
npx zeno-blog init my-awesome-blog
cd my-awesome-blog
```

**2. Write your first post:**
```markdown
---
title: "Hello, Zeno!"
date: "2024-09-19"
tags: "first-post, introduction"
---

# My First Zeno Post

This is incredibly easy! I can write in **Markdown** and Zeno 
handles all the heavy lifting.

```javascript
// Even code blocks work perfectly
console.log("Hello, Zeno!");
```
```

**3. Build and serve:**
```bash
zeno build
zeno serve 3000
```

**4. Your blog is live at `http://localhost:3000`!**

## Plugin Example

Want to add Google Analytics? Just create a simple plugin:

```javascript
// plugins/analytics.js
export default function analyticsPlugin(options) {
  return {
    name: 'google-analytics',
    onRenderHTML(html) {
      const script = `
        <script async src="https://www.googletagmanager.com/gtag/js?id=${options.trackingId}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${options.trackingId}');
        </script>
      `;
      return html.replace('</head>', script + '</head>');
    }
  };
}
```

Add it to your config:
```json
{
  "plugins": [
    { 
      "name": "analytics", 
      "options": { "trackingId": "GA_TRACKING_ID" } 
    }
  ]
}
```

That's it! Analytics is now added to every page.

## Who Is Zeno For?

### **Perfect For:**
- **Developers** who want a simple, hackable blogging platform
- **Technical writers** who prefer Markdown over WYSIWYG editors
- **Teams** who want version-controlled content
- **Performance enthusiasts** who demand fast-loading sites
- **Minimalists** who don't need complex CMS features

### **Maybe Not For:**
- **Non-technical users** who prefer visual editors
- **Large teams** needing advanced content workflows
- **E-commerce sites** requiring dynamic functionality
- **Complex web applications** beyond blogging

## Getting Started

Ready to dive in? Here are your next steps:

1. **[Installation](/post/installation)** — Set up Zeno on your machine
3. **[Configuration](/post/configuration)** — Learn about zeno.config.json
4. **[Themes](/post/theme)** — Understand how theming works
5. **[Plugins](/post/plugins)** — Extend Zeno's functionality

## Community & Support

Zeno is open source and community-driven:

- **[GitHub Repository](https://github.com/mine3krish/zeno)** — Source code, issues, and contributions
- **[Documentation](/)** — Comprehensive guides and API reference

## What's Next?

In upcoming releases, we're working on:

- **Advanced theming system** with component inheritance
- **Built-in SEO optimizations** and meta tag generation
- **RSS feed generation** plugin
- **Image optimization** pipeline
- **Deployment helpers** for popular platforms
- **Content collections** for organizing large sites

---

**Ready to build something amazing?** Let's get you [set up with Zeno](/post/installation) and create your first blog!

## Need Help?

- 📚 **Browse the [full documentation](/)** for detailed guides
- 🐛 **Found a bug?** [Report it on GitHub](https://github.com/mine3rish/zeno/issues)
- 💡 **Have an idea?** [Start a discussion](https://github.com/mine3rish/zeno/discussions)
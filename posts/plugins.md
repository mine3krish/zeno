---
title: "Plugins"
date: "2024-09-19"
tags: "plugins, extensions, hooks"
excerpt: "Simple guide to using and creating plugins for Zeno."
---

# Plugins

Plugins extend Zeno's functionality through simple hooks. Add features without bloating the core.

## Using Plugins

Add to `zeno.config.json`:

```json
{
  "plugins": [
    { "name": "toc" },
    { "name": "analytics", "options": { "id": "GA-123" } }
  ]
}
```

Plugins run automatically during build.

## Built-in Plugins

### **toc** - Table of Contents
```json
{
  "name": "toc",
  "options": {
    "minHeadings": 2,
    "maxLevel": 4
  }
}
```

### **analytics** - Google Analytics
```json
{
  "name": "analytics",
  "options": {
    "trackingId": "GA-XXXXXXXXX"
  }
}
```

## Plugin Hooks

Plugins use hooks to modify content:

| Hook | When | Purpose |
|------|------|---------|
| `onMarkdownParse` | Before HTML conversion | Modify markdown |
| `onRenderHTML` | After HTML generation | Modify final HTML |
| `onPostBuild` | After build complete | Run cleanup tasks |

## Creating Plugins

Create `plugins/my-plugin.js`:

```javascript
export default function myPlugin(options = {}) {
  return {
    name: 'my-plugin',
    
    onMarkdownParse(markdown) {
      // Modify markdown before HTML conversion
      return markdown.replace(/TODO:/g, '⚠️ TODO:');
    },
    
    onRenderHTML(html, frontmatter) {
      // Modify final HTML
      return html.replace('</head>', 
        '<meta name="author" content="Me"></head>'
      );
    },
    
    onPostBuild(buildData) {
      // Run after build
      console.log(`Built ${buildData.posts.length} posts`);
    }
  };
}
```

Use in config:
```json
{
  "plugins": [
    { "name": "my-plugin" }
  ]
}
```

## Quick Examples

### Add Google Analytics
```javascript
// plugins/analytics.js
export default function analytics(options) {
  return {
    name: 'google-analytics',
    onRenderHTML(html) {
      const script = `
        <script async src="https://www.googletagmanager.com/gtag/js?id=${options.id}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${options.id}');
        </script>
      `;
      return html.replace('</head>', script + '</head>');
    }
  };
}
```

### Add Reading Time
```javascript
// plugins/reading-time.js
export default function readingTime(options = {}) {
  return {
    name: 'reading-time',
    onMarkdownParse(markdown) {
      const words = markdown.split(/\s+/).length;
      const minutes = Math.ceil(words / (options.wordsPerMinute || 200));
      return `*${minutes} min read*\n\n${markdown}`;
    }
  };
}
```

### Auto-generate Sitemap
```javascript
// plugins/sitemap.js
import fs from 'fs/promises';
import path from 'path';

export default function sitemap(options = {}) {
  return {
    name: 'sitemap',
    async onPostBuild(buildData) {
      const urls = buildData.posts.map(post => 
        `${options.baseUrl || 'https://example.com'}/${post.slug}.html`
      );
      
      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;
      
      await fs.writeFile(
        path.join(buildData.config.outputDir, 'sitemap.xml'),
        sitemapXml
      );
    }
  };
}
```

## Plugin Data

Plugins receive data through hook parameters:

### `onMarkdownParse(markdown, frontmatter)`
- `markdown` - Raw markdown content
- `frontmatter` - Post metadata object

### `onRenderHTML(html, frontmatter)`
- `html` - Generated HTML string
- `frontmatter` - Post metadata object

### `onPostBuild(buildData)`
- `buildData.config` - Zeno configuration
- `buildData.posts` - Array of all posts
- `buildData.outputDir` - Build output directory

## Plugin Options

Pass options from config:

```json
{
  "plugins": [
    {
      "name": "my-plugin",
      "options": {
        "setting1": "value",
        "setting2": true,
        "setting3": 42
      }
    }
  ]
}
```

## Plugin Tips

- **Keep it simple** - One plugin, one feature
- **Use options** - Make plugins configurable
- **Handle errors** - Wrap in try/catch blocks
- **Test thoroughly** - Check with different content
- **Export default** - Always use `export default`
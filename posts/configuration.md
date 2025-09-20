---
title: "Configuration"
date: "2024-09-19"
tags: "configuration, setup, config"
excerpt: "Simple guide to configuring your Zeno blog with zeno.config.json."
---

# Configuration

Zeno uses a single `zeno.config.json` file to configure your entire blog. Simple and straightforward.

## Basic Configuration

Create `zeno.config.json` in your project root:

```json
{
  "title": "My Blog",
  "theme": "default",
  "plugins": []
}
```

That's it! Your blog is ready to build.

## All Options

```json
{
  "title": "My Blog",
  "theme": "default",
  "plugins": [
    {
      "name": "plugin-name",
      "options": {
        "key": "value"
      }
    }
  ]
}
```

## Configuration Reference

| Option | Default | Description |
|--------|---------|-------------|
| `title` | `"My Zeno Blog"` | Site title |
| `theme` | `"default"` | Theme folder name |
| `plugins` | `[]` | Array of plugin configurations |

## Common Examples

### Blog Setup
```json
{
  "title": "John's Tech Blog",
  "theme": "classy",
  "plugins": [
    { "name": "toc" },
    { "name": "analytics", "options": { "id": "GA-123" } }
  ]
}
```

### Documentation Site
```json
{
  "title": "Project Docs",
  "theme": "docs",
  "plugins": [
    { "name": "toc", "options": { "minHeadings": 3 } },
    { "name": "search" }
  ]
}
```

## Plugin Configuration

Plugins are configured as objects with `name` and optional `options`:

```json
{
  "plugins": [
    { "name": "simple-plugin" },
    {
      "name": "advanced-plugin",
      "options": {
        "setting1": "value1",
        "setting2": true,
        "setting3": 42
      }
    }
  ]
}
```

## Validation

Zeno validates your config on build. Common errors:

```json
// ❌ Wrong - strings required
{
  "title": 123,
  "theme": true
}

// ✅ Correct
{
  "title": "My Blog",
  "theme": "default"
}
```

## Quick Tips

- **Keep it simple** - Start with just title and theme
- **Use relative paths** - Avoid absolute directory paths
- **Test locally** - Run `zeno build` to validate config
- **Version control** - Always commit your config file

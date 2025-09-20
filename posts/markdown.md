---
title: "Markdown"
date: "2024-09-19"
tags: "markdown, writing, content"
excerpt: "Simple guide to writing Markdown posts in Zeno with frontmatter and features."
---

# Markdown

Write your posts in Markdown with frontmatter metadata. Simple, clean, and version-controlled.

## Basic Post Structure

```markdown
---
title: "My First Post"
date: "2024-09-19"
tags: "blog, getting-started"
---

# My First Post

This is the content of my post written in **Markdown**.

## Section Heading

More content here...
```

## Frontmatter

Add metadata at the top of your `.md` files:

### Required Fields
```yaml
---
title: "Post Title"
date: "2024-09-19"
---
```

### Optional Fields
```yaml
---
title: "Complete Post Example"
date: "2024-09-19"
tags: "tutorial, guide, markdown"
excerpt: "Short description for previews"
author: "Your Name"
draft: false
toc: true
---
```

## Markdown Syntax

### Headers
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`
```

### Links & Images
```markdown
[Link text](https://example.com)
[Internal link](/other-post.html)

![Alt text](image.jpg)
![Image with caption](https://example.com/image.png)
```

### Lists
```markdown
- Unordered list
- Another item
  - Nested item
  - Another nested

1. Ordered list
2. Second item
3. Third item
```

### Code Blocks
````markdown
```javascript
// Code with syntax highlighting
function hello() {
  console.log("Hello, Zeno!");
}
```

```bash
# Shell commands
zeno build
zeno serve
```
````

### Blockquotes
```markdown
> This is a blockquote
> 
> Multiple paragraphs work too
```

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Info     | Here     |
```

### Horizontal Rule
```markdown
---
```

## File Organization

### Directory Structure
```
posts/
├── 2024-01-15-first-post.md
├── 2024-02-20-second-post.md
```

### File Naming
- Use descriptive names: `getting-started.md`
- Include dates: `2024-09-19-new-features.md`
- Use hyphens: `my-blog-post.md` (not spaces)

## Post Examples

### Blog Post
```markdown
---
title: "Getting Started with Zeno"
date: "2024-09-19"
tags: "tutorial, beginner"
excerpt: "Learn how to create your first blog with Zeno"
---

# Getting Started with Zeno

Welcome to **Zeno**! This guide will help you create your first blog.

## Installation

First, install Zeno:

```bash
npx zeno-blog init my-blog
```

## Your First Post

Create a new file in the `posts/` directory...
```

### Documentation Page
```markdown
---
title: "API Reference"
date: "2024-09-19"
tags: "docs, api, reference"
toc: true
---

# API Reference

Complete reference for the Zeno API.

## Configuration

### Basic Options

The following options are available...

## Methods

### `zeno.build()`

Builds your blog...
```

### Draft Post
```markdown
---
title: "Work in Progress"
date: "2024-09-19"
draft: true
---

# Work in Progress

This post is not ready yet...
```

## Content Tips

### Writing Style
- **Use headers** - Structure your content
- **Short paragraphs** - Easier to read online
- **Code examples** - Show, don't just tell
- **Lists and bullets** - Break up dense text

### SEO Friendly
- **Descriptive titles** - Clear and specific
- **Good excerpts** - Summarize your content
- **Relevant tags** - Help with organization
- **Internal links** - Connect related posts

### Performance
- **Optimize images** - Use appropriate sizes
- **External links** - Open in new tabs if needed
- **Code blocks** - Use syntax highlighting

## File Processing

Zeno processes your Markdown files:

1. **Parse frontmatter** - Extract metadata
2. **Convert to HTML** - Using marked.js
3. **Apply plugins** - Run content hooks
4. **Render templates** - Insert into themes
5. **Output files** - Generate final HTML

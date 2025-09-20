---
title: "Themes"
date: "2024-09-19"
tags: "themes, design, templates"
---

# Themes

Themes control how your blog looks. Simple folder-based system with HTML templates and CSS.

## Using Themes

Set theme in `zeno.config.json`:

```json
{
  "title": "My Blog",
  "theme": "classy"
}
```

Build and your theme is applied automatically.

## Built-in Themes

### **default**
Clean, minimal theme for blogs
```json
{ "theme": "default" }
```

### **classy** 
Modern, elegant theme with dark mode
```json
{ "theme": "classy" }
```

### **docs**
Documentation-focused with sidebar and TOC
```json
{ "theme": "docs" }
```

## Theme Structure

```
themes/my-theme/
├── index.html       # Homepage template
├── post.html        # Single post template
├── style.css        # Theme styles
└── components/      # Reusable parts
    ├── navbar.html
    ├── footer.html
    └── posts.html
```

## Templates

### Homepage (`index.html`)
```js
<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  %navbar%
  <main>
    %posts%
  </main>
  %footer%
</body>
</html>
```

### Post Page (`post.html`)
```js
<!DOCTYPE html>
<html>
<head>
  <title>{{post_title}} - {{title}}</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  %navbar%
  <article>
    <h1>{{post_title}}</h1>
    <time>{{date}}</time>
    <div class="content">
      {{content}}
    </div>
  </article>
  %footer%
</body>
</html>
```

## Placeholders

| Placeholder | Description | Where |
|-------------|-------------|-------|
| `{{title}}` | Site title | Any template |
| `{{post_title}}` | Post title | Post template |
| `{{date}}` | Post date | Post template |
| `{{content}}` | Post HTML | Post template |
| `{{excerpt}}` | Post preview | Posts component |
| `{{slug}}` | Post URL slug | Posts component |

## Components

Components are reusable HTML snippets:

### Posts List (`components/posts.html`)
```js
<article class="post-preview">
  <h2><a href="/post/{{slug}}">{{post_title}}</a></h2>
  <time>{{date}}</time>
  <p>{{excerpt}}</p>
</article>
```

### Navigation (`components/navbar.html`)
```js
<nav>
  <a href="/">{{title}}</a>
  <div class="nav-links">
    <a href="/">Home</a>
    <a href="/about.html">About</a>
  </div>
</nav>
```

Use components with `%component-name%`:
```html
%navbar%    <!-- Includes navbar.html -->
%posts%     <!-- Includes posts.html -->
%footer%    <!-- Includes footer.html -->
```

## Creating a Theme

1. **Create theme folder:**
```bash
mkdir themes/my-theme
```

2. **Add required files:**
```bash
themes/my-theme/
├── index.html
├── post.html
└── style.css
```

3. **Use in config:**
```json
{ "theme": "my-theme" }
```

4. **Build and test:**
```bash
zeno build
zeno serve
```

## Theme Tips

- **Start simple** - Copy `default` theme and modify
- **Test locally** - Use `zeno serve` for live preview
- **Mobile first** - Design for small screens
- **Use components** - Keep templates DRY
- **CSS in style.css** - Keep styles organized
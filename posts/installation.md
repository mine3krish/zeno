---
title: "Installation"
date: "2025-09-19"
tags: "installation, setup, getting-started"
---

# Installation

## Prerequisites

- **Node.js** 16+ 
- **npm** 7+

Check your versions:
```bash
node --version
npm --version
```

## Quick Install

```bash
# Create a new blog
npx zeno-blog init my-blog
cd my-blog

# Install dependencies
npm install

# Build and serve
zeno build
zeno serve
```

Your blog is now running at `http://localhost:3000`! 🎉

## Alternative Methods

### Global Installation
```bash
# Install globally
npm install -g zeno-blog

# Create blog
zeno init my-blog
cd my-blog
npm install
```

### From Source
```bash
# Clone and setup
git clone https://github.com/mine3krish/zeno
cd zeno-blog
npm install
npm link
```

## Platform Setup

### Windows
```cmd
# Install Node.js from nodejs.org
# Then run:
npx zeno-blog init my-blog
```

### macOS
```bash
# Using Homebrew
brew install node
npx zeno-blog init my-blog
```

### Linux
```bash
# Ubuntu/Debian
sudo apt install nodejs npm
npx zeno-blog init my-blog

# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
npx zeno-blog init my-blog
```

## Troubleshooting

### Permission Issues
```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
```

### Node Version Issues
```bash
# Update Node.js
npm install -g n
n latest
```

### Path Issues
```bash
# Add to PATH (Linux/macOS)
echo 'export PATH=$PATH:~/.npm-global/bin' >> ~/.bashrc
source ~/.bashrc
```
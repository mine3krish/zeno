# Contributing to Zeno

Thank you for your interest in contributing to Zeno! We welcome developers, designers, and writers to help make Zeno better.

## 📦 How to Contribute

### 1. Fork & Clone

```bash
# Fork this repository on GitHub
# Clone your fork
git clone https://github.com/your-username/zeno.git
cd zeno
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Make Your Changes

* **Bug Fixes**: Check the issues labeled `bug`.
* **Features**: Check the issues labeled `enhancement` or propose your own.
* **Themes**: Create a new theme in `themes/` folder and make it compatible.
* **Plugins**: Add plugins in the `plugins/` folder following the plugin hook conventions.

### 4. Test Your Changes

```bash
# Build the blog to check changes
npm run build

# Serve locally
npm run dev
```

### 5. Commit and Push

```bash
git add .
git commit -m "Add your descriptive message"
git push origin your-branch
```

### 6. Open a Pull Request

* Go to your fork on GitHub and open a PR to the main repository.
* Include a description of your changes and why they improve Zeno.

## 🛠 Plugin & Theme Guidelines

* **Plugins**: Follow the plugin hook interface: `onMarkdownParse`, `onRenderHTML`, `onPostBuild`.
* **Themes**: Ensure the folder contains `index.html`, `post.html`, `style.css` and optionally `components/`.
* **Naming**: Keep theme and plugin names lowercase and hyphen-separated.

## 🧹 Code Style

* Use ES Modules (`import/export`), not CommonJS.
* Use 2-space indentation.
* Keep functions small and modular.
* Document new hooks, features, or changes in `README.md` if relevant.

## ⚠️ Issues & Bug Reporting

* Create issues for any bugs or feature requests.
* Include steps to reproduce, expected behavior, and screenshots if applicable.

## 🤝 Be Respectful

* Treat maintainers, contributors, and users with respect.
* Keep discussions constructive and focused on the code or content.

Thanks for helping make Zeno an amazing, hackable Markdown blog framework!

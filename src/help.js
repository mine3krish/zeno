export function showHelp() {
  console.log(`
Zeno - Blazing fast blogs for everyone

Usage:
  zeno init <folder>      Initialize a new blog in <folder>
  zeno build              Build the blog into /dist
  zeno serve [port]       Start a development server (default: 3000)
  zeno --help             Show this help

Examples:
  npx zeno init myblog
  zeno build
  zeno serve 3000
  `);
}
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, { recursive: true });

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export function init(projectName = "mysite", options = {}) {
  const baseDir = path.join(process.cwd(), projectName);
  fs.mkdirSync(baseDir, { recursive: true });

  ["posts", "plugins", "themes"].forEach(f =>
    fs.mkdirSync(path.join(baseDir, f), { recursive: true })
  );

  const srcTheme = path.join(__dirname, "../themes", "default");
  const destTheme = path.join(baseDir, "themes", "default");

  if (!fs.existsSync(srcTheme)) {
    console.error(chalk.red(`❌ Default theme not found in ${srcTheme}`));
    console.error(chalk.yellow("Make sure your CLI package has a 'themes/default' folder"));
  } else {
    copyRecursive(srcTheme, destTheme);
  }

  const publicSrc = path.join(__dirname, "../public");
  const publicDest = path.join(baseDir, "public");
  
  if (fs.existsSync(publicSrc)) {
    copyRecursive(publicSrc, publicDest);
  }

  const config = {
    title: options.title || "My Zeno Blog",
    theme: "default",
    plugins: []
  };
  const configPath = path.join(baseDir, "zeno.config.json");
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }

  console.log(chalk.green(`✅ Zeno project '${projectName}' initialized successfully!`));
  console.log(chalk.blue(`➡️ cd ${projectName} && npx zeno-blog build && npx zeno-blog serve`));
}

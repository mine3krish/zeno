import path from 'path';
import process from 'process';
import fs from 'fs';
import { pathToFileURL } from 'url';

export async function loadPlugins(config) {
  const plugins = [];
  for (const p of config.plugins || []) {
    const pluginPath = path.join(process.cwd(), 'plugins', `${p.name}.js`);
    if (fs.existsSync(pluginPath)) {
      const mod = await import(pathToFileURL(pluginPath).href);
      plugins.push(mod.default(p.options || {}));
    } else {
      console.warn(`⚠️ Plugin "${p.name}" not found at ${pluginPath}`);
    }
  }
  return plugins;
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '') // Delete non-word characters
    .replace(/\-\-+/g, '-') // Collapse contiguous hyphens 
    .replace(/^-+/, '') // Delete hyphens at the beginning
    .replace(/-+$/, ''); // Delete hyphens at the end
}

export function htmlToText(html) {
  return html
    .replace(/<[^>]+>/g, '') // Remove tags
    .replace(/\s+/g, ' ') // Remove extra whitespace
    .trim();
}

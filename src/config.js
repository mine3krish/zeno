import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'zeno.config.json');
let raw = '{}';
try {
  raw = fs.readFileSync(configPath, 'utf-8');
} catch (err) {
  console.warn('⚠️ zeno.config.json not found, using default config.');
}

export const config = JSON.parse(raw);
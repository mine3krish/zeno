import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'zeno.config.json');
let raw = '{}';
try {
  raw = fs.readFileSync(configPath, 'utf-8');
} catch (err) {}

export const config = JSON.parse(raw);
#!/usr/bin/env node
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cliPath = pathToFileURL(path.join(__dirname, '../src/cli.js')).href;

import(cliPath);
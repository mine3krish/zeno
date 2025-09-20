#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from "./builder.js";
import { serve } from "./server.js";
import { init } from "./init.js";
import { showHelp } from "./help.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkgPath = path.join(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const args = process.argv.slice(2);
const cmd = args[0];
const arg1 = args[1];

const commands = {
  init: (folder) => {
    if (!folder) {
      console.log("❌ Please provide a folder name for init.");
      return showHelp();
    }
    init(folder);
  },

  build: async () => {
    await build();
  },

  serve: (port) => {
    const parsedPort = port ? parseInt(port, 10) : 3000;
    serve(parsedPort);
  },

  version: () => {
    console.log(`Zeno CLI v${pkg.version}`);
  },

  help: () => showHelp(),
};

(async () => {
  if (!cmd || ["--help", "-h"].includes(cmd)) {
    return commands.help();
  }
  if (["--version", "-v"].includes(cmd)) {
    return commands.version();
  }
  const command = commands[cmd];
  if (command) {
    await command(arg1);
  } else {
    console.log(`❌ Unknown command: ${cmd}`);
    commands.help();
  }
})();

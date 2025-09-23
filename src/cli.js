#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { build } from "./builder.js";
import { serve } from "./server.js";
import { init } from "./init.js";
import { showHelp } from "./help.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkgPath = path.join(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

const program = new Command();

program
  .name("zeno")
  .description("⚡ Zeno - Super-fast blogs for everyone")
  .version(pkg.version);

program
  .command("init <folder>")
  .description("Initialize a new Zeno project in the specified folder")
  .action((folder) => {
    init(folder);
  });

program
  .command("build")
  .description("Build the blog")
  .action(async () => {
    await build();
  });

program
  .command("serve [port]")
  .description("Serve the blog locally (default: 3000)")
  .action((port) => {
    const parsedPort = port ? parseInt(port, 10) : 3000;
    serve(parsedPort);
  });

program
  .command("help")
  .description("Show help")
  .action(() => {
    showHelp();
  });

program.parse(process.argv);

#!/usr/bin/env node
import { build } from './builder.js';
import { serve } from './server.js';
import { init } from './init.js';
import { showHelp } from './help.js';

const args = process.argv.slice(2);
const cmd = args[0];
const arg1 = args[1];

(async () => {
  switch (cmd) {
    case 'init':
        if (!arg1) {
          console.log('Please provide a folder name for init.');
          return showHelp();
        }
        init(arg1);
        break;

    case 'build':
        await build();
        break;

    case 'serve':
        const port = arg1 ? parseInt(arg1, 10) : 3000;
        serve(port);
        break;

    case '--help':
    case '-h':
    default:
        showHelp();
        break;
  }
})();

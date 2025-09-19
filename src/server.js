import express from 'express';
import path from 'path';
import chokidar from 'chokidar';
import { build } from './builder.js';

export function serve(port = 3000) {
  const app = express();
  const distPath = path.join(process.cwd(), 'dist');

  try {
    build();
  } catch (err) {
    console.error('❌ Error during rebuild:', err);
  }

  const watcher = chokidar.watch(['posts', 'themes'], { ignoreInitial: true });
  watcher.on('all', (event, pathChanged) => {
    console.log(`🔄 ${event} detected in ${pathChanged}, rebuilding...`);
    try {
      build();
    } catch (err) {
      console.error('❌ Error during rebuild:', err);
    }
  });

  app.use(express.static(distPath));

  app.listen(port, () => {
    console.log(`🚀 Dev server running at http://localhost:${port}`);
  });
}
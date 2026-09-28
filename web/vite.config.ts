import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function fontUploaderPlugin(): Plugin {
  return {
    name: 'font-uploader-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const host = req.headers.host || 'localhost';
        const url = new URL(req.url || '/', `http://${host}`);

        if (url.pathname === '/api/font-status' && req.method === 'GET') {
          const fontsDir = path.resolve(__dirname, 'public/fonts');
          let files: string[] = [];
          if (fs.existsSync(fontsDir)) {
            files = fs.readdirSync(fontsDir).filter(f => /\.(woff2|woff|otf|ttf)$/i.test(f));
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ installed: files.length > 0, files }));
          return;
        }

        if (url.pathname === '/api/upload-font' && req.method === 'POST') {
          try {
            const fontsDir = path.resolve(__dirname, 'public/fonts');
            if (!fs.existsSync(fontsDir)) {
              fs.mkdirSync(fontsDir, { recursive: true });
            }

            const rawFilename = url.searchParams.get('filename') || 'NeueBruecke-Regular.woff2';
            const ext = path.extname(rawFilename).toLowerCase() || '.woff2';
            const primaryFilename = `NeueBruecke-Regular${ext}`;
            const primaryPath = path.join(fontsDir, primaryFilename);

            const chunks: Buffer[] = [];
            req.on('data', (chunk: Buffer) => chunks.push(chunk));
            req.on('end', () => {
              const buffer = Buffer.concat(chunks);
              fs.writeFileSync(primaryPath, buffer);

              if (ext === '.woff2') {
                const altPath = path.join(fontsDir, 'NeueBruecke-Regular.woff');
                if (!fs.existsSync(altPath)) {
                  try { fs.writeFileSync(altPath, buffer); } catch (_) {}
                }
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, filename: primaryFilename, size: buffer.length }));
            });
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err?.message || 'Upload failed' }));
          }
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), fontUploaderPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

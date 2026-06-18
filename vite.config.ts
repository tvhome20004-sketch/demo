import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'admin-html',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/admin' || req.url === '/admin/') {
            const html = fs.readFileSync(
              path.resolve(__dirname, 'public', 'admin', 'index.html'),
              'utf-8'
            )
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
          } else {
            next()
          }
        })
      },
    },
  ],
})

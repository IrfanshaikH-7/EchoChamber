import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user': {
        target: process.env.SERVER_URL,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/chat': {
        target:  process.env.SERVER_URL,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/message': {
        target:  process.env.SERVER_URL,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Creamos un túnel llamado '/api-inegi'
      '/api-inegi': {
        target: 'https://www.inegi.org.mx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-inegi/, ''),
        secure: false,
      }
    }
  }
})
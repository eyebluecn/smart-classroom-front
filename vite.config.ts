import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6600,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:6500', // 后端服务实际地址
        changeOrigin: true
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: false,
      keep_classnames: true,
      keep_fnames: true,
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    rollupOptions:{
      output: {
        chunkFileNames: 'container/latest/assets/[name]-[hash].js',
      }
    },
    outDir: 'dist',
  },
  publicDir:'/container/latest/assets/'
})

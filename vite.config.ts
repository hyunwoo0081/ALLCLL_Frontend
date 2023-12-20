import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
const TargetServer = 'http://localhost:8080';
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "allcll",
    project: "javascript-react"
  })],

  base: '/',

  resolve: {
    alias: {
      '@static': path.resolve(__dirname, 'static'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  },

  server: {
    proxy: {
      '/api': {
        target: TargetServer,
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },

  build: {
    sourcemap: true
  }
});
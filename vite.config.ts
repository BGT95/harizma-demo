/// <reference types="vitest/config" />
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
// Локально: base /. GitHub Pages: npm run build:pages (--mode pages → /harizma-demo/)
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/harizma-demo/' : '/',
  plugins: [
    ...(process.env.VITE_INSPECT === '1' ? [inspectAttr()] : []),
    react(),
    {
      name: 'html-public-assets-base',
      transformIndexHtml(html) {
        if (mode !== 'pages') return html
        const prefix = '/harizma-demo'
        return html
          .replace(/content="\/images\//g, `content="${prefix}/images/`)
          .replace(/"image": "\/images\//g, `"image": "${prefix}/images/`)
          .replace(/href="\/images\//g, `href="${prefix}/images/`)
          .replace(/href="\/llms\.txt"/g, `href="${prefix}/llms.txt"`)
      },
    },
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('swiper')) return 'swiper';
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('@radix-ui')) return 'radix';
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
}));

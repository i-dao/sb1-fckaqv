import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        technical: resolve(__dirname, 'technical-specs.html'),
        implementation: resolve(__dirname, 'implementation-guide.html'),
        product: resolve(__dirname, 'product-guide.html'),
        versions: resolve(__dirname, 'versions.html')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          i18n: ['i18next', 'react-i18next'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  publicDir: 'public'
});
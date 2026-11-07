import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    alias: { '~': path.resolve(__dirname, 'app') },
  },
  server: {
    /* en développement, les appels /api sont relayés vers Django */
    proxy: {
      '/api': { target: process.env.VITE_API_PROXY ?? 'http://localhost:8000', changeOrigin: true },
    },
  },
});

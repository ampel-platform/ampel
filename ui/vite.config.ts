import { reactRouter } from '@react-router/dev/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  envPrefix: ['VITE_', 'HEADER_', 'BASE_API_URL'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  build: {
    sourcemap: false,
  },
});

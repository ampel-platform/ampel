import { vitePlugin as remix } from '@remix-run/dev';
import path from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    //server config damit es in docker funktioniert
    host: true,
    port: 5173,
  },
  build: { sourcemap: false },
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('/', 'routes/root-redirect.tsx'); // redirect to test medical case 0001949132 ↓
          route('alerts/cases/:case_id', 'pages/alerts/PatientAlertsPageController.tsx');
          route('*', 'routes/catchall-redirect.tsx'); // redirect to test medical case 0001949132 ↑
        });
      },
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './app'),
    },
  },
});

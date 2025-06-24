import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import path from 'path';

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
          route('/', 'routes/root-redirect.tsx');
          route('alerts/patients/:patient_id/cases/:case_id', 'pages/alerts/PatientAlerts.tsx');
        });
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
});

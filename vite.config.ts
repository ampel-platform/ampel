import { vitePlugin as remix } from '@remix-run/dev';
import path from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve' || mode === 'development';
  return {
    server: {
      host: '127.0.0.1',
      port: 5173,
    },
    build: { sourcemap: false },
    plugins: [
      remix({
        //ssr: false,
        routes(defineRoutes) {
          return defineRoutes((route) => {
            if (isDev) {
              route('/', 'routes/root-redirect.tsx');
              route('/', 'routes/init-catchall-redirect.tsx');
            }
            route('alerts/cases/:case_id', 'pages/alerts/PatientAlertsPageController.tsx');
            route('*', 'routes/catchall-redirect.tsx');
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
  };
});

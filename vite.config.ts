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
        routes(defineRoutes) {
          return defineRoutes((route) => {
            if (!isDev) {
              route('/', 'routes/root-redirect.tsx'); // only 4 development because this tool gets opened in a route redirect to test medical case 0001949132 ↓
            } else {
              route('/', 'routes/init-catchall-redirect.tsx'); // redirect to last route medical case ↓
            }
            route('alerts/cases/:case_id', 'pages/alerts/PatientAlertsPageController.tsx');
            route('*', 'routes/catchall-redirect.tsx'); // redirect to last route medical case ↑
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

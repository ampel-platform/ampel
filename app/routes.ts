import process from 'node:process';

import type { RouteConfig } from '@react-router/dev/routes';

const isDev = process.env.NODE_ENV === 'development';

const routes: RouteConfig = [
  ...(isDev
    ? ([
        { path: '/', file: 'routes/root-redirect.tsx' },
        { path: '/', file: 'routes/init-catchall-redirect.tsx' },
      ] as const)
    : []),

  {
    path: 'alerts/cases/:case_id',
    file: 'pages/alerts/PatientAlertsPageController.tsx',
  },

  {
    path: '*',
    file: 'routes/catchall-redirect.tsx',
  },
];

export default routes;

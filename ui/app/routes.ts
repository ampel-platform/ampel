import process from 'node:process';

import type { RouteConfig } from '@react-router/dev/routes';

const isDev = process.env.NODE_ENV === 'development';
const isDemo = process.env.VITE_TEST_DATA_VIEW === 'demo';
const shouldUseDefaultCaseRedirect = isDev || isDemo;

const routes: RouteConfig = [
  ...(shouldUseDefaultCaseRedirect
    ? ([{ path: '/', file: 'routes/root-redirect.tsx' }] as const)
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

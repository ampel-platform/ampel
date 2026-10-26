import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./app/**/*.{ts,js,tsx}'],
  theme: {
    extend: {
      colors: {
        'alert-critical': colors.rose[500],
        'alert-warning': colors.amber[300],
        'alert-success': colors.lime[500],
      },
      keyframes: {
        'alert-detail-overlay-open': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'alert-detail-overlay-open': 'alert-detail-overlay-open 300ms ease-in-out',
      },
    },
  },
  plugins: [],
};

// eslint-disable-next-line import/no-default-export
export default config;

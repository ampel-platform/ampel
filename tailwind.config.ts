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
    },
  },
  plugins: [],
};

// eslint-disable-next-line import/no-default-export
export default config;

import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./app/**/*.{ts,js,tsx}'],
  theme: {
    extend: {
      colors: {
        'alert-critical': colors.rose[500], // Rot
        'alert-warning': colors.amber[300], // Gelb-Orange
        'alert-success': colors.lime[500], // Limegreen
      },
    },
  },
  plugins: [],
};

// eslint-disable-next-line import/no-default-export
export default config;

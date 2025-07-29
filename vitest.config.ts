import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./app/tests/setupTests.ts'],
    environment: 'jsdom',
  },
});

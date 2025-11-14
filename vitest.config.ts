import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./app/tests/setupTests.ts'],
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...configDefaults.exclude,
        '**/index.*',
        '**/build/client/assets/*',
        '**/app/routes/*',
        '**postcss.config.*',
        '**tailwind.config.*',
        '**/AmpelResultRepository.tsx*',
        '**/PatientAlertsPageController.*',
        '**/root.tsx*',
        '**/tests*',
        '**/entry.server.*',
        '**/entry.client.*',
        '**/MedicalCaseMetadataRepository.*',
        '**/routes.ts',
        '**/react-router.config.ts',
        '**/.react-router/*',
      ],
    },
  },
});

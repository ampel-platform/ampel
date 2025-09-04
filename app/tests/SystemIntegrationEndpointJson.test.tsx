import { describe, it, vi } from 'vitest';

const isSystemTest = import.meta.env?.VITE_TEST_DATA_VIEW === 'system-test';

if (!isSystemTest) {
  // Vitest will see this file but with no active tests
  describe.skip('JsonIntegration tests skipped in system test mode', () => {});
} else {
  vi.mock('@remix-run/react', async () => {});

  describe('Patient JSON Structure', async () => {
    it('the JSON Structure have all required main sections for Patient', async () => {});
  });

  describe('Alert Results JSON Structure', async () => {
    it('the JSON Structure have all required main sections for AlertResults', async () => {});
  });

  describe('Ampel Status for one patient JSON Structure', async () => {
    it('the JSON Structure have all required main sections for Ampel Status', async () => {});
  });
}

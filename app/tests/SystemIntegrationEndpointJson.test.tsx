import { describe, it } from 'vitest';

import { AmpelResultRepository } from '../pages/alerts/AmpelResultRepository';
import { MedicalCaseMetadataRepository } from '../pages/alerts/MedicalCaseMetadataRepository';
import { AmpelKisStatus } from '../pages/alerts/types/types';
import { ApiResultCollection, MedicalCaseMetadataApiResult } from '../pages/alerts/types/types-api';
import { AmpelKisStatusRepository } from './AmpelKisStatusRepository';

const isSystemTest = import.meta.env?.VITE_TEST_DATA_VIEW === 'system-test';

if (!isSystemTest) {
  describe.skip('JsonIntegration tests skipped i system test mode', () => {});
} else {
  describe('Patient JSON Structure', async () => {
    it('the JSON Structure have all required main sections for Patient', async () => {
      const patientData = await MedicalCaseMetadataRepository.getByMedicalCaseId('0001949132');

      const check = MedicalCaseMetadataApiResult.safeParse(patientData);
      if (!check.success) {
        throw new Error(
          `PatientApiResult mismatch: ${JSON.stringify(check.error.format(), null, 2)}`,
        );
      }
      expect(check.success).toBe(true);
    });
  });

  describe('Alert Results JSON Structure', async () => {
    it('the JSON Structure have all required main sections for AlertResults)', async () => {
      const data = await AmpelResultRepository.getByMedicalCaseId('0001949132');

      const check = ApiResultCollection.safeParse(data);
      if (!check.success) {
        throw new Error(
          `ApiResultCollection mismatch: ${JSON.stringify(check.error.format(), null, 2)}`,
        );
      }
      expect(check.success).toBe(true);
    });
  });

  describe('Ampel Status for one patient KIS JSON Structure', async () => {
    it('exposes info status (critical/warning/inconspicuous)', async () => {
      const data = await AmpelKisStatusRepository.getByMedicalCaseId('0001949132');

      expect(typeof data).toBe('number');
      expect([
        AmpelKisStatus.GREEN,
        AmpelKisStatus.YELLOW,
        AmpelKisStatus.RED,
        AmpelKisStatus.NONE,
      ]).toContain(data);
    });
  });
}

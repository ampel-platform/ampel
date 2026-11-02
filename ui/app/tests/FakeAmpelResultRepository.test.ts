import { describe, expect, it, vi } from 'vitest';

describe('FakeAmpelResultRepository', () => {
  it('returns non-empty scoring systems for fake alerts data', async () => {
    vi.resetModules();
    vi.stubEnv('VITE_FAST_FAKE', '1');
    const { FakeAmpelResultRepository } = await import('./FakeAmpelResultRepository');

    const result = await FakeAmpelResultRepository.uiFakesToApi('CASE-123');

    expect(result.medicalCaseId).toBe('CASE-123');
    expect(result.scoringSystems.length).toBeGreaterThan(0);
  });

  it('returns default fake patient metadata', async () => {
    vi.resetModules();
    vi.stubEnv('VITE_FAST_FAKE', '1');
    const { FakeAmpelResultRepository } = await import('./FakeAmpelResultRepository');

    const metadata = await FakeAmpelResultRepository.generateFakePatientMetaData();

    expect(metadata.medicalCaseId).toBe('med-123');
    expect(metadata.firstname).toBe('Max');
    expect(metadata.lastname).toBe('Musterfrau');
  });
});

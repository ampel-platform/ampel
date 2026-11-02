import { afterEach, describe, expect, it, vi } from 'vitest';

import { MedicalCaseMetadataRepository } from '../pages/alerts/MedicalCaseMetadataRepository';

describe('MedicalCaseMetadataRepository', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('marks metadata network failures as service unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')));

    await expect(
      MedicalCaseMetadataRepository.getByMedicalCaseId('CASE-123'),
    ).rejects.toMatchObject({
      status: 503,
      message: expect.stringContaining('Netzwerkfehler'),
    });
  });

  it('marks metadata request aborts as service unavailable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new DOMException('The operation was aborted.', 'AbortError')),
    );

    await expect(
      MedicalCaseMetadataRepository.getByMedicalCaseId('CASE-123'),
    ).rejects.toMatchObject({
      status: 503,
      message: expect.stringContaining('Netzwerkfehler'),
    });
  });

  it('marks invalid metadata payloads as server errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ nope: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    );

    await expect(
      MedicalCaseMetadataRepository.getByMedicalCaseId('CASE-123'),
    ).rejects.toMatchObject({
      status: 500,
    });
  });
});

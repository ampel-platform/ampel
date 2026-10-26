import { afterEach, describe, expect, it, vi } from 'vitest';

import { AmpelResultRepository } from '../pages/alerts/AmpelResultRepository';

describe('AmpelResultRepository', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('marks alert request aborts as service unavailable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new DOMException('The operation was aborted.', 'AbortError')),
    );

    await expect(AmpelResultRepository.getByMedicalCaseId('CASE-123')).resolves.toMatchObject({
      status: 503,
      message: expect.stringContaining('Netzwerkfehler'),
    });
  });
});

import { afterEach, describe, expect, it, vi } from 'vitest';

import { getPatientHeaderConfig } from '../patientHeaderConfig';

describe('patientHeaderConfig', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('uses no runtime logos by default', () => {
    const config = getPatientHeaderConfig();

    expect(config.productLogoUrl).toBe('');
    expect(config.clinicLogoUrl).toBe('');
  });

  it('maps the product logo filename to a public URL', () => {
    vi.stubEnv('HEADER_PRODUCT_LOGO_URL', 'brand-logo.svg');

    expect(getPatientHeaderConfig().productLogoUrl).toBe('/runtime-assets/brand-logo.svg');
  });

  it('maps the clinic logo container path to a public URL', () => {
    vi.stubEnv('HEADER_CLINIC_LOGO_URL', '/app/public/runtime-assets/clinical-logo.svg');

    expect(getPatientHeaderConfig().clinicLogoUrl).toBe('/runtime-assets/clinical-logo.svg');
  });

  it('reads the renamed header metadata env vars', () => {
    vi.stubEnv('HEADER_TICKET_LINK', 'https://example.test/ticket');
    vi.stubEnv('HEADER_CONTACT_PHONE', '12345');
    vi.stubEnv('HEADER_MT_NUMBER', 'MT-42');
    vi.stubEnv('HEADER_INSTRUCTIONS_LINK', 'https://example.test/instructions');

    expect(getPatientHeaderConfig()).toMatchObject({
      ticketLink: 'https://example.test/ticket',
      contactPhone: '12345',
      mtNumber: 'MT-42',
      instructionsLink: 'https://example.test/instructions',
    });
  });
});

import { afterEach, describe, expect, it, vi } from 'vitest';

import { getPatientHeaderConfig, getPatientHeaderConfigScript } from '../patientHeaderConfig';

describe('patientHeaderConfig', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    delete globalThis.window.__AMPEL_HEADER_CONFIG__;
  });

  it('uses no runtime logos by default', () => {
    const config = getPatientHeaderConfig();

    expect(config.productLogoUrl).toBe('');
    expect(config.clinicLogoUrl).toBe('');
  });

  it('maps the product logo filename to a public URL', () => {
    vi.stubEnv('HEADER_PRODUCT_LOGO_URL', 'brand-default-logo.svg');

    expect(getPatientHeaderConfig().productLogoUrl).toBe('/runtime-assets/brand-default-logo.svg');
  });

  it('keeps a source assets logo path for bundled logo resolution', () => {
    vi.stubEnv('HEADER_PRODUCT_LOGO_URL', 'assets/brand-default-logo.svg');

    expect(getPatientHeaderConfig().productLogoUrl).toBe('assets/brand-default-logo.svg');
  });

  it('strips wrapping quotes from logo env values', () => {
    vi.stubEnv('HEADER_PRODUCT_LOGO_URL', '"assets/brand-default-logo.svg"');

    expect(getPatientHeaderConfig().productLogoUrl).toBe('assets/brand-default-logo.svg');
  });

  it('maps the clinic logo container path to a public URL', () => {
    vi.stubEnv('HEADER_CLINIC_LOGO_URL', '/app/public/runtime-assets/clinic-logo.svg');

    expect(getPatientHeaderConfig().clinicLogoUrl).toBe('/runtime-assets/clinic-logo.svg');
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

  it('uses the browser runtime header config after hydration', () => {
    globalThis.window.__AMPEL_HEADER_CONFIG__ = {
      productLogoUrl: 'assets/brand-default-logo.svg',
      clinicLogoUrl: 'assets/clinical-default-logo.svg',
      ticketLink: 'https://example.test/runtime-ticket',
      contactPhone: '54321',
      mtNumber: 'MT-runtime',
      instructionsLink: 'https://example.test/runtime-instructions',
    };

    expect(getPatientHeaderConfig()).toMatchObject({
      productLogoUrl: 'assets/brand-default-logo.svg',
      clinicLogoUrl: 'assets/clinical-default-logo.svg',
      ticketLink: 'https://example.test/runtime-ticket',
      contactPhone: '54321',
      mtNumber: 'MT-runtime',
      instructionsLink: 'https://example.test/runtime-instructions',
    });
  });

  it('serializes the browser runtime config safely', () => {
    const script = getPatientHeaderConfigScript({
      productLogoUrl: '</script><script>alert(1)</script>',
      clinicLogoUrl: '',
      ticketLink: '',
      contactPhone: '',
      mtNumber: '',
      instructionsLink: '',
    });

    expect(script).toContain('window.__AMPEL_HEADER_CONFIG__');
    expect(script).not.toContain('</script>');
    expect(script).toContain('\\u003c/script>');
  });
});

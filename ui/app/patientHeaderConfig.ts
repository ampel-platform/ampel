type EnvRecord = Record<string, string | undefined>;

export interface PatientHeaderConfig {
  productLogoUrl: string;
  clinicLogoUrl: string;
  ticketLink: string;
  contactPhone: string;
  mtNumber: string;
  instructionsLink: string;
}

const DEFAULTS: PatientHeaderConfig = {
  productLogoUrl: '',
  clinicLogoUrl: '',
  ticketLink: '',
  contactPhone: '',
  mtNumber: '',
  instructionsLink: '',
};

const PUBLIC_RUNTIME_ASSETS_PREFIX = '/runtime-assets/';
const CONTAINER_RUNTIME_ASSETS_PREFIX = '/app/public/runtime-assets/';
const SOURCE_ASSETS_PREFIX = 'assets/';
const HEADER_CONFIG_GLOBAL = '__AMPEL_HEADER_CONFIG__';

declare global {
  interface Window {
    __AMPEL_HEADER_CONFIG__?: Partial<PatientHeaderConfig>;
  }
}

function readNodeEnv(): EnvRecord | undefined {
  if (typeof globalThis === 'undefined') return undefined;
  const maybeProcess = globalThis as { process?: { env?: EnvRecord } };
  return maybeProcess.process?.env;
}

function readBuildEnv(): EnvRecord | undefined {
  if (typeof import.meta === 'undefined') return undefined;
  return import.meta.env as EnvRecord | undefined;
}

function readEnvValue(runtimeName: string, buildName: string): string | undefined {
  const runtimeEnv = readNodeEnv();
  if (runtimeEnv && runtimeName in runtimeEnv) {
    return runtimeEnv[runtimeName];
  }

  const buildEnv = readBuildEnv();
  if (buildEnv && runtimeName in buildEnv) {
    return buildEnv[runtimeName];
  }

  if (buildEnv && buildName in buildEnv) {
    return buildEnv[buildName];
  }

  return undefined;
}

function readBrowserHeaderConfig(): Partial<PatientHeaderConfig> | undefined {
  if (typeof globalThis === 'undefined') return undefined;
  const maybeGlobal = globalThis as typeof globalThis & {
    window?: Window;
    __AMPEL_HEADER_CONFIG__?: Partial<PatientHeaderConfig>;
  };

  return maybeGlobal.window?.[HEADER_CONFIG_GLOBAL] ?? maybeGlobal[HEADER_CONFIG_GLOBAL];
}

function normalizeRuntimeLogoUrl(value: string | undefined): string {
  const trimmed = value?.trim().replace(/^(['"])(.*)\1$/, '$2') ?? '';
  if (!trimmed) return '';

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  if (trimmed.startsWith(CONTAINER_RUNTIME_ASSETS_PREFIX)) {
    return `${PUBLIC_RUNTIME_ASSETS_PREFIX}${trimmed.slice(CONTAINER_RUNTIME_ASSETS_PREFIX.length)}`;
  }

  if (trimmed.startsWith(PUBLIC_RUNTIME_ASSETS_PREFIX) || trimmed.startsWith('/')) {
    return trimmed;
  }

  const relativePath = trimmed.replace(/^\.?\/*/, '');
  if (relativePath.startsWith(SOURCE_ASSETS_PREFIX)) {
    return relativePath;
  }

  return `${PUBLIC_RUNTIME_ASSETS_PREFIX}${relativePath}`;
}

function withDefaults(config: Partial<PatientHeaderConfig>): PatientHeaderConfig {
  return {
    productLogoUrl: normalizeRuntimeLogoUrl(config.productLogoUrl ?? DEFAULTS.productLogoUrl),
    clinicLogoUrl: normalizeRuntimeLogoUrl(config.clinicLogoUrl ?? DEFAULTS.clinicLogoUrl),
    ticketLink: config.ticketLink ?? DEFAULTS.ticketLink,
    contactPhone: config.contactPhone ?? DEFAULTS.contactPhone,
    mtNumber: config.mtNumber ?? DEFAULTS.mtNumber,
    instructionsLink: config.instructionsLink ?? DEFAULTS.instructionsLink,
  };
}

export function getPatientHeaderConfig(): PatientHeaderConfig {
  const browserHeaderConfig = readBrowserHeaderConfig();
  if (browserHeaderConfig) {
    return withDefaults(browserHeaderConfig);
  }

  return withDefaults({
    productLogoUrl:
      readEnvValue('HEADER_PRODUCT_LOGO_URL', 'VITE_HEADER_PRODUCT_LOGO_URL') ??
      DEFAULTS.productLogoUrl,
    clinicLogoUrl:
      readEnvValue('HEADER_CLINIC_LOGO_URL', 'VITE_HEADER_CLINIC_LOGO_URL') ??
      DEFAULTS.clinicLogoUrl,
    ticketLink:
      readEnvValue('HEADER_TICKET_LINK', 'VITE_HEADER_TICKET_LINK') ?? DEFAULTS.ticketLink,
    contactPhone:
      readEnvValue('HEADER_CONTACT_PHONE', 'VITE_HEADER_CONTACT_PHONE') ?? DEFAULTS.contactPhone,
    mtNumber: readEnvValue('HEADER_MT_NUMBER', 'VITE_HEADER_MT_NUMBER') ?? DEFAULTS.mtNumber,
    instructionsLink:
      readEnvValue('HEADER_INSTRUCTIONS_LINK', 'VITE_HEADER_INSTRUCTIONS_LINK') ??
      DEFAULTS.instructionsLink,
  });
}

export function getPatientHeaderConfigScript(config: PatientHeaderConfig): string {
  const serializedConfig = JSON.stringify(config)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return `window.${HEADER_CONFIG_GLOBAL} = ${serializedConfig};`;
}

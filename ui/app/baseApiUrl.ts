type EnvRecord = Record<string, string | undefined>;

function readNodeEnv(): string | undefined {
  if (typeof globalThis === 'undefined') return undefined;
  const maybeProcess = globalThis as { process?: { env?: EnvRecord } };
  return maybeProcess.process?.env?.NODE_ENV;
}

function isDevMode(): boolean {
  if (typeof import.meta !== 'undefined') {
    if (import.meta.env?.DEV) return true;
    if (import.meta.env?.MODE === 'development') return true;
  }
  return readNodeEnv() === 'development';
}

function readRuntimeBaseApiUrl(): string | undefined {
  if (typeof globalThis === 'undefined') return undefined;
  const maybeProcess = globalThis as { process?: { env?: EnvRecord } };
  const value = maybeProcess.process?.env?.BASE_API_URL;
  return value?.trim() ? value : undefined;
}

function readBuildTimeBaseApiUrl(): string | undefined {
  if (typeof import.meta === 'undefined') return undefined;
  const value = import.meta.env?.BASE_API_URL ?? import.meta.env?.VITE_BASE_API_URL;
  return value?.trim() ? value : undefined;
}

function readWindowOrigin(): string | undefined {
  if (typeof globalThis === 'undefined') return undefined;
  const maybeWindow = globalThis as { location?: { origin?: string } };
  return maybeWindow.location?.origin;
}

function ensureTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

/**
 * Resolve the base API URL in a way that works for SSR and client-side renders.
 *
 * Priority:
 * 1) Runtime server env: BASE_API_URL
 * 2) Build-time client env: VITE_BASE_API_URL
 * 3) Production client fallback: current origin
 * 4) Development fallback: localhost:8080
 */
export function resolveBaseApiUrl(): string {
  const runtimeUrl = readRuntimeBaseApiUrl();
  if (runtimeUrl) return runtimeUrl;

  const buildTimeUrl = readBuildTimeBaseApiUrl();
  if (buildTimeUrl) return buildTimeUrl;

  if (!isDevMode()) {
    const origin = readWindowOrigin();
    if (origin) return origin;
  }

  return 'http://localhost:8080';
}

export const BASE_API_URL = resolveBaseApiUrl();
export const BASE_API_URL_WITH_SLASH = ensureTrailingSlash(BASE_API_URL);

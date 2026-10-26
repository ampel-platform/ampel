type EnvRecord = Record<string, string | undefined>;

const DEFAULT_BACKEND_REQUEST_TIMEOUT_MS = 3_000;

function readNodeEnv(): EnvRecord | undefined {
  if (typeof globalThis === 'undefined') return undefined;
  const maybeProcess = globalThis as { process?: { env?: EnvRecord } };
  return maybeProcess.process?.env;
}

function readBackendRequestTimeoutMs(): number {
  const value = readNodeEnv()?.BACKEND_REQUEST_TIMEOUT_MS;
  const parsed = Number(value);

  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  return DEFAULT_BACKEND_REQUEST_TIMEOUT_MS;
}

export function isBackendUnavailableError(err: unknown): boolean {
  const errorName = err && typeof err === 'object' && 'name' in err ? String(err.name) : undefined;

  return err instanceof TypeError || errorName === 'AbortError' || errorName === 'TimeoutError';
}

export async function fetchBackend(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), readBackendRequestTimeoutMs());

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

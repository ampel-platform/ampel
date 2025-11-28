import { ApiResultCollection, type ApiResultCollection as ApiT } from './types/types-api';

const PATH = 'ampelresults';
const BASE_URL =
  (typeof globalThis !== 'undefined'
    ? (globalThis as { process?: { env?: Record<string, string> } }).process?.env?.BASE_API_URL
    : undefined) ??
  import.meta.env.VITE_BASE_API_URL ??
  'http://localhost:8080';
const BASE_URL_WITH_SLASH = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

type ErrorWithStatus = Error & { status?: number; headers?: Headers };
export type AmpelResultResponse = ApiT | ErrorWithStatus;

const withStatus = (res: Response): ErrorWithStatus => {
  const error = new Error(`HTTP Error: ${res.status} ${res.statusText}`) as ErrorWithStatus;
  error.status = res.status;
  error.headers = res.headers;
  return error;
};

export const AmpelResultRepository = {
  async getByMedicalCaseId(caseId: string): Promise<AmpelResultResponse> {
    if (!caseId) {
      const error = new Error('case_id fehlt') as ErrorWithStatus;
      error.status = 400;
      return error;
    }

    try {
      const requestUrl = new URL(
        `v1/medicalcases/${encodeURIComponent(caseId)}/${PATH}`,
        BASE_URL_WITH_SLASH,
      );
      const res = await fetch(requestUrl, {
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        return withStatus(res);
      }

      const json = await res.json();
      return ApiResultCollection.parse(json);
    } catch (err) {
      if (err instanceof Response) return withStatus(err);

      if (err instanceof TypeError) {
        const error = new Error(
          `Netzwerkfehler beim Abruf von ${BASE_URL}: ${err.message}`,
        ) as ErrorWithStatus;
        error.status = 503;
        return error;
      }

      if (err instanceof Error) {
        if (err.status === undefined) (err as ErrorWithStatus).status = 500;
        return err;
      }

      const unknown = new Error(String(err)) as ErrorWithStatus;
      unknown.status = 500;
      return unknown;
    }
  },
};

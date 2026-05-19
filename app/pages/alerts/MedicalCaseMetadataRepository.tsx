import { MedicalCaseMetadataApiResult } from './types/types-api';

const PATH = 'meta';
const BASE_URL =
  (typeof globalThis !== 'undefined'
    ? (globalThis as { process?: { env?: Record<string, string> } }).process?.env?.BASE_API_URL
    : undefined) ??
  import.meta.env.VITE_BASE_API_URL ??
  'http://localhost:8080';
const BASE_URL_WITH_SLASH = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

export const MedicalCaseMetadataRepository = {
  async getByMedicalCaseId(caseId: string): Promise<MedicalCaseMetadataApiResult> {
    try {
      const withStatus = (res: Response): Error & { status: number; headers: Headers } => {
        const error = new Error(`HTTP Error: ${res.status} ${res.statusText}`) as Error & {
          status: number;
          headers: Headers;
        };
        error.status = res.status;
        error.headers = res.headers;
        return error;
      };

      if (!caseId) {
        throw new Response('case_id fehlt', { status: 400, statusText: 'Bad Request' });
      }

      const requestUrl = new URL(
        `v1/medicalcases/${encodeURIComponent(caseId)}/${PATH}`,
        BASE_URL_WITH_SLASH,
      );
      const res = await fetch(requestUrl, {
        headers: { Accept: 'application/json' },
      });

      if (res.status === 404)
        throw new Response('Der Patient wurde nicht gefunden', { status: 404 });
      if (!res.ok) {
        throw withStatus(res);
      }
      const json = await res.json();

      return MedicalCaseMetadataApiResult.parse(json);
    } catch (err) {
      if (err instanceof Response) throw err;

      if (err instanceof TypeError) {
        throw new Error(`Netzwerkfehler beim Abruf von ${BASE_URL}: ${err.message}`);
      }

      if (err instanceof Error) {
        throw err;
      }

      throw new Error(String(err));
    }
  },
};

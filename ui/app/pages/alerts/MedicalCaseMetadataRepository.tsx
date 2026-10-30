import { fetchBackend, isBackendUnavailableError } from '../../backendRequest';
import { BASE_API_URL, BASE_API_URL_WITH_SLASH } from '../../baseApiUrl';
import { MedicalCaseMetadataApiResult } from './types/types-api';

type ErrorWithStatus = Error & { status?: number; headers?: Headers };

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
        `medicalcases/${encodeURIComponent(caseId)}/metainformation/patient`,
        BASE_API_URL_WITH_SLASH,
      );
      const res = await fetchBackend(requestUrl, {
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

      if (isBackendUnavailableError(err)) {
        const error = new Error(
          `Netzwerkfehler beim Abruf von ${BASE_API_URL}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        ) as ErrorWithStatus;
        error.status = 503;
        throw error;
      }

      if (err instanceof Error) {
        if ((err as ErrorWithStatus).status === undefined) {
          (err as ErrorWithStatus).status = 500;
        }
        throw err;
      }

      const unknown = new Error(String(err)) as ErrorWithStatus;
      unknown.status = 500;
      throw unknown;
    }
  },
};

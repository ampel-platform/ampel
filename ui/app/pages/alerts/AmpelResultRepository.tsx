import { fetchBackend, isBackendUnavailableError } from '../../backendRequest';
import { BASE_API_URL, BASE_API_URL_WITH_SLASH } from '../../baseApiUrl';
import { ApiResultCollection, type ApiResultCollection as ApiT } from './types/types-api';

type ErrorWithStatus = Error & { status?: number; headers?: Headers };
export type AmpelResultResponse = ApiT | ErrorWithStatus;

export const AmpelResultRepository = {
  async getByMedicalCaseId(caseId: string): Promise<AmpelResultResponse> {
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
        `medicalcases/${encodeURIComponent(caseId)}/scores/history`,
        BASE_API_URL_WITH_SLASH,
      );
      const res = await fetchBackend(requestUrl, {
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        return withStatus(res);
      }

      const json = await res.json();
      return ApiResultCollection.parse(json);
    } catch (err) {
      if (err instanceof Response) throw err;

      if (isBackendUnavailableError(err)) {
        const error = new Error(
          `Netzwerkfehler beim Abruf von ${BASE_API_URL}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        ) as ErrorWithStatus;
        error.status = 503;
        return error;
      }

      if (err instanceof Error) {
        if ((err as ErrorWithStatus).status === undefined) {
          (err as ErrorWithStatus).status = 500;
        }
        throw err;
      }

      const unknown = new Error(String(err)) as ErrorWithStatus;
      unknown.status = 500;
      return unknown;
    }
  },
};

// import { getBaseUrl } from '../../utils/env.client';
import { ApiResultCollection, type ApiResultCollection as ApiT } from './types/types-api';

const PATH = 'ampelresults';

declare global {
  interface Window {
    ENV?: { BASE_API_URL?: string };
  }
}

const BASE_URL =
  // eslint-disable-next-line no-undef
  (typeof window !== 'undefined' ? window.ENV?.BASE_API_URL : undefined) ??
  import.meta.env.VITE_BASE_API_URL ??
  'http://backend.ampel.internal';

export const AmpelResultRepository = {
  async getByMedicalCaseId(caseId: string): Promise<ApiT> {
    try {
      if (!caseId) {
        throw new Response('case_id fehlt', { status: 400, statusText: 'Bad Request' });
      }
      const res = await fetch(`${BASE_URL}/v1/medicalcases/${encodeURIComponent(caseId)}/${PATH}`, {
        headers: { Accept: 'application/json' },
      });

      if (res.status === 404)
        throw new Response('Der Medizinsche Fall wurde nicht gefunden', { status: 404 });
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }
      const json = await res.json();

      return ApiResultCollection.parse(json);
    } catch (error) {
      throw new Error(`Der Server ist nicht erreichbar: ${error}`);
    }
  },
};

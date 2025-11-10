import { BASE_API_URL } from '../../config.server';
import { ApiResultCollection, type ApiResultCollection as ApiT } from './types/types-api';

const PATH = 'ampelresults';
const BASE_URL = BASE_API_URL ?? import.meta.env.VITE_BASE_API_URL ?? 'http://localhost:8080';

export const AmpelResultRepository = {
  async getByMedicalCaseId(caseId: string): Promise<ApiT> {
    try {
      if (!caseId) {
        throw new Response('case_id fehlt', { status: 400, statusText: 'Bad Request' });
      }

      const res = await fetch(`${BASE_URL}/v1/medicalcases/${encodeURIComponent(caseId)}/${PATH}`, {
        headers: { Accept: 'application/json' },
      });

      if (res.status === 404) {
        //throw new Response('Der Medizinsche Fall wurde nicht gefunden', { status: 404 });
        return {
          medicalCaseId: caseId,
          scoringSystems: [],
        };
      }
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      return ApiResultCollection.parse(json);
    } catch (err) {
      if (err instanceof Response) throw err;

      if (err instanceof TypeError) {
        throw new Error(`Netzwerkfehler beim Abruf von ${BASE_URL}: ${err.message}`);
      }

      if (err instanceof Error) throw err;

      throw new Error(String(err));
    }
  },
};

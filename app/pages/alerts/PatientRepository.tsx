import { PatientApiResult } from './types/types-api';

const PATH = 'patient';
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

export const PatientResultRepository = {
  async getByMedicalCaseId(caseId: string): Promise<PatientApiResult> {
    try {
      if (!caseId) {
        throw new Response('case_id fehlt', { status: 400, statusText: 'Bad Request' });
      }
      const res = await fetch(`${BASE_URL}/v1/medicalcases/${encodeURIComponent(caseId)}/${PATH}`, {
        headers: { Accept: 'application/json' },
      });

      if (res.status === 404)
        throw new Response('Der Patient wurde nicht gefunden', { status: 404 });
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }
      const json = await res.json();

      return PatientApiResult.parse(json);
    } catch (error) {
      throw new Error(`Der Server ist nicht erreichbar: ${error}`);
    }
  },
};

import { ApiResultCollection, type ApiResultCollection as ApiT } from './types/types-api';

const BASE_URL = 'http://backend.ampel.internal';
const PATH = 'ampelresults';

export const AmpelResultRepository = {
  async getByMedicalCaseId(caseId: string): Promise<ApiT> {
    try {
    if (!caseId) {
      throw new Response( 'case_id fehlt' , { status: 400, statusText: 'Bad Request' });
    }
      const res = await fetch(`${BASE_URL}/v1/medicalcases/${encodeURIComponent(caseId)}/${PATH}`, {
        headers: { Accept: 'application/json' },
      });

    if (res.status === 404) throw new Response('Der Medizinsche Fall wurde nicht gefunden', { status: 404 });
    if (!res.ok) 
    {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();

    return ApiResultCollection.parse(json);
    } catch (error) {
      throw new Error(`Der Server ist nicht erreichbar: ${error}`);
    }
  },
};
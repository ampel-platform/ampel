import { ApiResultCollection, type ApiResultCollection as ApiT } from './types/types-api';

const BASE_URL = 'http://backend.ampel.internal';
const PATH = 'ampelresults';

export const AmpelResultRepository = {
  async getByMedicalCaseId(caseId: string): Promise<ApiT> {
    const res = await fetch(`${BASE_URL}/v1/medicalcases/${encodeURIComponent(caseId)}/${PATH}`, {
      headers: { Accept: 'application/json' },
    });
    if (res.status === 404) throw new Response('Not Found', { status: 404 });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const json = await res.json();
    return ApiResultCollection.parse(json);
  },
};

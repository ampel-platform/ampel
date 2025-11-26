import { BASE_API_URL } from '../config.server';
import { AmpelKisStatus } from '../pages/alerts/types/types';

const PATH = 'kis-status';
const BASE_URL = BASE_API_URL ?? import.meta.env.VITE_BASE_API_URL ?? 'http://localhost:8080';
const BASE_URL_WITH_SLASH = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

export const AmpelKisStatusRepository = {
  async getByMedicalCaseId(caseId: string): Promise<AmpelKisStatus> {
    try {
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

      if (res.status === 404) {
        throw new Response('Ampel-Status wurde nicht gefunden', { status: 404 });
      }
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      return parseAmpelKisStatus(json);
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

function parseAmpelKisStatus(payload: unknown): AmpelKisStatus {
  if (typeof payload === 'number' && isValidEnum(payload)) return payload;
  if (typeof payload === 'string') {
    const v = fromString(payload);
    if (v !== null) return v;
  }
  if (payload && typeof payload === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const v = (payload as any).status;
    if (typeof v === 'number' && isValidEnum(v)) return v;
    if (typeof v === 'string') {
      const s = fromString(v);
      if (s !== null) return s;
    }
  }
  throw new Error('Unerwartetes JSON für AmpelKisStatus');
}

function isValidEnum(n: number): n is AmpelKisStatus {
  return (
    n === AmpelKisStatus.GREEN ||
    n === AmpelKisStatus.YELLOW ||
    n === AmpelKisStatus.RED ||
    n === AmpelKisStatus.NONE
  );
}

function fromString(s: string): AmpelKisStatus | null {
  switch (s.toUpperCase()) {
    case 'GREEN':
      return AmpelKisStatus.GREEN;
    case 'YELLOW':
      return AmpelKisStatus.YELLOW;
    case 'RED':
      return AmpelKisStatus.RED;
    case 'NONE':
      return AmpelKisStatus.NONE;
    default:
      return null;
  }
}

import { AmpelResult } from './types';

const BASE_URL = '/v1/medicalcases';

export const AmpelResultRepository = {
  /**
   * Fetches the AmpelResult for a given medical case ID.
   *
   * @param id - The unique identifier of the medical case.
   * @returns A promise that resolves to the AmpelResult of the specified medical case.
   * @throws Will throw an error if the network request fails or the response is not successful.
   */

  // case und patient ID? oder wirklch nur case ID? Möglichkeit das zu bekommen: wird in den link pfad mit eingefügt von sap?
  async getByMedicalCaseId(id: string): Promise<AmpelResult> {
            throw new Response('Not Found', { status: 404 });

    // try {
    //   const response = await fetch(`${BASE_URL}/${id}/ampelresults`);

    //   if (!response.ok) {
    //     throw new Error(
    //       `Fehler beim Abrufen der AMPEL-Ergebnisse (Fall ${id}): ${response.statusText}`,
    //     );
    //   }

    //   const data: AmpelResult = await response.json();
    //   return data;
    // } catch (error: unknown) {
    //   if (error instanceof Error) {
    //     throw new Error(`Fehler beim Abrufen der AMPEL-Ergebnisse: ${error.message}`);
    //   } else {
    //     throw new Error('Unbekannter Fehler beim Abrufen der AMPEL-Ergebnisse');
    //   }
    // }
  },
};

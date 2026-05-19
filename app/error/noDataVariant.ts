export type NoDataVariant = 'noData' | 'patient';

export const DEFAULT_NO_DATA_VARIANT: NoDataVariant = 'noData';

export function getNoDataErrorHeading(variant: NoDataVariant): string {
  return variant === 'patient'
    ? 'Keine Patientendaten zur Fallnummer vorhanden'
    : 'Keine CDSS-Daten zur Fallnummer vorhanden';
}

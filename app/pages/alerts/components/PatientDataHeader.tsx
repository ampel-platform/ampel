import Logo from '../../../../assets/UKL_Logo_Vektor.svg';
import { PatientMetaData } from '../types/types';

type PatientMetaDataHeaderProps = PatientMetaData;

/**
 * A component to display patient metadata (name, patient ID, case ID, sex, birthdate)
 * in a consistent and visually appealing way.
 * @param {{ name: string; patientId: string; caseId: string; sex: "m nnlich" | "weiblich"; birthdate: Date }} props
 * @returns {React.ReactNode }
 */
export function PatientMetaDataHeader({
  name,
  patientId,
  caseId,
  sex,
  birthdate,
  // eslint-disable-next-line no-undef
}: PatientMetaDataHeaderProps): React.ReactNode {
  return (
    <div className='flex flex-col gap-y-2'>
      <span className='top-0 flex flex-row justify-between'>
        <span className='text-3xl font-medium text-gray-700'>{name}</span>
        <img src={Logo} width={200} alt='AMPEL Logo' className='pr-10' />
      </span>
      <div className='grid w-full grid-cols-4'>
        <span className='flex flex-row gap-x-2'>
          <span className='text-gray-600'>Patientennummer</span>
          <span className='text-violet-800'>{patientId}</span>
        </span>
        <span className='flex flex-row gap-x-2'>
          <span className='text-gray-600'>Fallnummer</span>
          <span className='text-violet-800'>{caseId}</span>
        </span>
        <span className='flex flex-row gap-x-2'>
          <span className='text-gray-600'>Geschlecht</span>
          <span className='text-violet-800'>{sex}</span>
        </span>
        <span className='flex flex-row gap-x-2'>
          <span className='text-gray-600'>Geburtsdatum</span>
          <span className='text-violet-800'>
            {birthdate.toLocaleDateString('de-DE', { hour12: false, timeZone: 'Europe/Berlin' })}
          </span>
        </span>
      </div>
    </div>
  );
}

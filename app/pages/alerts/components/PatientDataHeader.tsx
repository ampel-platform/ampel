import { BookOpenText, Mail, Phone, Signature } from 'lucide-react';
import React from 'react';
import { preload } from 'react-dom';

import ClinicalLogo from '../../../../assets/clinical-logo.svg';
import { getPatientHeaderConfig, type PatientHeaderConfig } from '../../../patientHeaderConfig';
import { SexUI } from '../types/types';

preload(ClinicalLogo, { as: 'image' });

interface PatientMetaDataHeaderProps {
  medicalCaseId: string;
  patientId?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  dateOfBirth?: Date | string | null;
  sex?: SexUI | null;
  headerConfig?: PatientHeaderConfig;
}

function formatDob(d: Date | string | null | undefined): string {
  if (!d) return 'kein Geburtsdatum';
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return 'kein Geburtsdatum';
  return date.toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' });
}

function formatHeaderValue(value: string): string {
  return value.trim() ? value : '-';
}

/**
 * A component to display patient metadata (firstname, lastname, patient ID, case ID, sex, birthdate)
 * in a consistent and visually appealing way.
 * @param {{ fistname: string; lastname: string; patientId: string; medicalCaseId: string; sex: "mänlich" | "weiblich" | "unbekannt"; dateOfBirth: Date }} props
 * @returns {React.ReactNode }
 */
export function PatientMetaDataHeader({
  firstname,
  lastname,
  patientId,
  medicalCaseId,
  sex,
  dateOfBirth,
  headerConfig,
}: PatientMetaDataHeaderProps): React.ReactNode {
  const resolvedHeaderConfig = headerConfig ?? getPatientHeaderConfig();
  const safeFirstname = firstname || 'Unbekannt';
  const safeLastname = lastname || 'Unbekannt';
  const safePatientId = patientId || 'Unbekannt';
  const safeMedicalCaseId = medicalCaseId || 'Unbekannt';
  const dobText = formatDob(dateOfBirth);
  const sexLetter = ((sex ?? 'unbekannt') as string).charAt(0).toUpperCase();
  const { productLogoUrl, clinicLogoUrl, ticketLink, contactPhone, mtNumber, instructionsLink } =
    resolvedHeaderConfig;
  const contactPhoneText = formatHeaderValue(contactPhone);
  const mtNumberText = formatHeaderValue(mtNumber);
  const hasProductLogo = Boolean(productLogoUrl);
  const resolvedClinicLogoUrl = clinicLogoUrl || ClinicalLogo;

  const renderExternalLink = (href: string, label: string): React.ReactNode => {
    if (!href) {
      return <span className='whitespace-nowrap text-gray-500'>{label}</span>;
    }

    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer noopener'
        className='whitespace-nowrap underline decoration-blue-400 underline-offset-2 hover:text-blue-800'
      >
        {label}
      </a>
    );
  };

  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-[1fr_auto] md:items-end'>
      <div className='min-w-0'>
        <span className='break-words text-xl font-medium text-gray-700 sm:text-2xl md:text-3xl'>
          {safeFirstname} {safeLastname} (*{dobText} | {sexLetter})
        </span>

        <div className='mt-1 flex flex-wrap items-baseline gap-x-10 gap-y-1'>
          <span className='whitespace-nowrap'>
            <span className='mr-2 text-gray-600'>Patientennummer</span>
            <span className='text-violet-800'>{safePatientId}</span>
          </span>
          <span>
            <span className='mr-2 text-gray-600'>Fallnummer</span>
            <span className='text-violet-800'>{safeMedicalCaseId}</span>
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 grid-rows-[auto_auto] items-start justify-start gap-x-6 gap-y-1 md:grid-cols-[auto_auto] md:justify-end'>
        {hasProductLogo ? (
          <img
            src={productLogoUrl}
            alt='Header Logo'
            className='col-[1] row-[1] h-8 sm:h-9 md:h-12 lg:h-14'
          />
        ) : null}
        <img
          src={resolvedClinicLogoUrl}
          alt='Clinical Logo'
          className={`${hasProductLogo ? 'col-[2]' : 'col-[1]'} row-[1] mr-4 h-8 sm:h-9 md:h-12 lg:h-14`}
        />

        <span className='col-[1] row-[2] flex items-center gap-1 text-sm text-blue-600 sm:text-base'>
          <Mail className='h-4 w-4 text-gray-600' />
          {renderExternalLink(ticketLink, 'Störmeldung Medizintechnik')}
        </span>
        <span className='col-[1] row-[3] flex items-center gap-1 text-sm text-gray-600 sm:text-base'>
          <Phone className='h-4 w-4' />
          <span className='whitespace-nowrap'>allg. Fragen : {contactPhoneText}</span>
        </span>
        <span className='col-[2] row-[2] flex items-center gap-1 text-sm text-blue-600 sm:text-base'>
          <BookOpenText className='h-4 w-4 text-gray-600' />
          {renderExternalLink(instructionsLink, 'Gebrauchsanweisung')}
        </span>
        <span className='col-[2] row-[3] flex items-center gap-1 text-sm text-gray-600 sm:text-base'>
          <Signature className='h-4 w-4' />
          <span className='whitespace-nowrap'> MT-Nummer: {mtNumberText}</span>
        </span>
      </div>
    </div>
  );
}

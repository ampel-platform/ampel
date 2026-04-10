import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { PatientMetaDataHeader } from '../pages/alerts/components/PatientDataHeader';

afterEach(() => {
  cleanup();
});

describe('PatientMetaDataHeader', () => {
  it('renders no primary logo when none is configured', () => {
    render(
      <PatientMetaDataHeader
        firstname='Max'
        lastname='Mustermann'
        patientId='P-1'
        medicalCaseId='CASE-1'
        sex='männlich'
        dateOfBirth='1990-01-01T00:00:00Z'
        headerConfig={{
          productLogoUrl: '',
          clinicLogoUrl: '',
          ticketLink: '',
          contactPhone: '',
          mtNumber: '',
          instructionsLink: '',
        }}
      />,
    );

    expect(screen.queryByAltText('Header Logo')).toBeNull();
    expect(screen.getByAltText('Clinical Logo')).toBeInTheDocument();
  });

  it('renders the configured primary logo', () => {
    render(
      <PatientMetaDataHeader
        firstname='Max'
        lastname='Mustermann'
        patientId='P-1'
        medicalCaseId='CASE-1'
        sex='männlich'
        dateOfBirth='1990-01-01T00:00:00Z'
        headerConfig={{
          productLogoUrl: '/runtime-assets/brand-logo.svg',
          clinicLogoUrl: '/runtime-assets/clinical-logo.svg',
          ticketLink: '',
          contactPhone: '',
          mtNumber: '',
          instructionsLink: '',
        }}
      />,
    );

    const logo = screen.getByAltText('Header Logo');
    expect(logo).toHaveAttribute('src', '/runtime-assets/brand-logo.svg');
    expect(screen.getByAltText('Clinical Logo')).toHaveAttribute(
      'src',
      '/runtime-assets/clinical-logo.svg',
    );
  });
});

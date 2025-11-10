import React from 'react';

import LampeLogo from '../../assets/Lampe_Logo_Vektor.svg';
import UklLogo from '../../assets/UKL_Logo_Vektor.svg';

export const Timeout = (): React.ReactNode => (
  <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
    <title>LAMPE-CDSS</title>
    <meta charSet='utf-8' />
    <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <img src={UklLogo} width={300} alt='UKL Logo' />
      <br />
      <img src={LampeLogo} width={150} alt='Lampe Logo' />
      <h1>Das hat zu lange gedauert...</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Versuchen sie es ein anderes Mal erneut.
      </p>
      <br />
    </div>
  </div>
);

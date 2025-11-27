import React from 'react';
import { preload } from 'react-dom';

import LampeLogo from '../../assets/Lampe_Logo_Vektor.svg';
import UklLogo from '../../assets/UKL_Logo_Vektor.svg';

preload(LampeLogo, { as: 'image' });
preload(UklLogo, { as: 'image' });

const contactEmail = 'lampe@uniklinik-leipzig.de';
const contactPhone = '0341 - 97 11342';

export const NotFound = (): React.ReactNode => (
  <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
    <title>LAMPE-CDSS</title>
    <meta charSet='utf-8' />
    <img src={UklLogo} width={300} alt='UKL Logo' />
    <br />
    <img src={LampeLogo} width={150} alt='Lampe Logo' />
    <h1>Der Patient wurde nicht gefunden</h1>
    <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
      Bitte gleichen Sie die Fallnummer mit der Zustandsanzeige im KIS ab. Prüfen Sie, ob zu dieser
      Fallnummer ein Patient geführt wird und ein LAMPE-Ergebnis (grün, gelb oder rot) vorliegt.
    </p>
    <br />

    <details className='mt-4'>
      <summary className='cursor-pointer list-none text-sm underline hover:no-underline'>
        Kontakt aufnehmen, falls im KIS ein LAMPE-Ergebnis vorliegt.
      </summary>
      <div className='mt-3 space-y-1'>
        <p>
          Danke das sie uns darauf hinweisen das Problem vorliegt, indem Sie den Vorfall
          melden:{' '}
        </p>
        <p className='whitespace-nowrap'>{contactEmail}</p>
        <p className='whitespace-nowrap'>
          {contactPhone.replace('+49', '0341 -').replace(/\s/g, ' ')}
        </p>
      </div>
    </details>
  </div>
);

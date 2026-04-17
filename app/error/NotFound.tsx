import React from 'react';

import { ErrorLayout } from './ErrorLayout';
import { errorHeadingStyle } from './errorStyles';

type NotFoundVariant = 'cdss' | 'patient';

export const NotFound = ({ variant = 'cdss' }: { variant?: NotFoundVariant }): React.ReactNode => (
  <ErrorLayout>
    <title>AMPEL-CDSS</title>
    <meta charSet='utf-8' />
    <h1 style={errorHeadingStyle}>
      {variant === 'patient'
        ? 'Keine Patientendaten zur Fallnummer vorhanden'
        : 'Keine CDSS-Daten zur Fallnummer vorhanden'}
    </h1>
    <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
      Bitte gleichen Sie die Fallnummer mit der Zustandsanzeige im KIS ab. Prüfen Sie, ob zu dieser
      Fallnummer ein Patient geführt wird und ein AMPEL-Ergebnis (grün, gelb oder rot) vorliegt.
      Nehmen sie Kontakt mit uns auf, falls im KIS ein AMPEL-Ergebnis vorliegt.
    </p>
    <br />
  </ErrorLayout>
);

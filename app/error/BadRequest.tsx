import React from 'react';

import { ErrorLayout } from './ErrorLayout';
import { errorHeadingStyle } from './errorStyles';
import {
  DEFAULT_NO_DATA_VARIANT,
  getNoDataErrorHeading,
  type NoDataVariant,
} from './noDataVariant';

export const BadRequest = ({
  variant = DEFAULT_NO_DATA_VARIANT,
}: {
  variant?: NoDataVariant;
}): React.ReactNode => (
  <ErrorLayout>
    <title>LAMPE-CDSS</title>
    <meta charSet='utf-8' />
    <h1 style={errorHeadingStyle}>{getNoDataErrorHeading(variant)}</h1>
    <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
      Bitte gleichen Sie die Fallnummer mit der Zustandsanzeige im KIS ab. Prüfen Sie, ob zu dieser
      Fallnummer ein Patient geführt wird und ein LAMPE-Ergebnis (grün, gelb oder rot) vorliegt.
      Nehmen sie Kontakt mit uns auf, falls im KIS ein LAMPE-Ergebnis vorliegt.
    </p>
    <br />
  </ErrorLayout>
);

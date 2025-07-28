import React from 'react';

import { AlertType } from '../../types';

interface AlertPingProps {
  type: AlertType;
}

/**
 * A small visual indicator that shows the type of an alert.
 *
 * @param {{ type: AlertType }} props
 * @prop {AlertType} type - The type of the alert. Can be either a warning or a critical alert.
 * @returns {React.ReactNode }
 */

export function AlertPing({ type }: AlertPingProps): React.ReactNode {
  const color = type === AlertType.Warning ? 'bg-alert-warning' : 'bg-alert-critical';

  return (
    <span className='relative flex h-4 w-4'>
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color}`}
      ></span>
      <span className={`relative inline-flex h-4 w-4 rounded-full ${color}`}></span>
    </span>
  );
}

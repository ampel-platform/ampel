import React from 'react';

import { AlertType } from '../../types/types';

interface AlertPingProps {
  type: AlertType;
}

/**
 * A small visual indicator that shows the type of an alert.
 *
 * @param {{ type: AlertType }} props
 * @prop {AlertType} type - The type of the alert. Can be warning, critical, or green.
 * @returns {React.ReactNode }
 */

export function AlertPing({ type }: AlertPingProps): React.ReactNode {
  const color =
    type === AlertType.Warning
      ? 'bg-alert-warning'
      : type === AlertType.Critical
        ? 'bg-alert-critical'
        : 'bg-alert-success';

  return (
    <span className='relative flex h-4 w-4'>
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color}`}
      ></span>
      <span className={`relative inline-flex h-4 w-4 rounded-full ${color}`}></span>
    </span>
  );
}

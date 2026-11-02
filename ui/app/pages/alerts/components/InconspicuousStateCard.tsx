import type { ReactElement } from 'react';

import { AlertDetails, AlertType } from '../types/types';
import { formatDeBerlin } from './components/formatDate';

interface InconspicuousStateProps {
  title: string;
  type: AlertType;
  creationTime: Date;
  onClick: () => void;
  alertDetails?: AlertDetails;
  disabled?: boolean;
}

/**
 * A visual representation of an inconspicuous state.
 * The component displays a card with a title and the creation time.
 * It can be disabled to suppress click/keyboard interactions.
 * @param {{ title: string, description?: string, creationTime: Date }} props
 * @returns {React.ReactNode }
 */
export function InconspicuousStateCard({
  title,
  creationTime,
  onClick,
  disabled = false,
}: InconspicuousStateProps): ReactElement {
  return (
    <div
      className='flex flex-col rounded-md border border-solid border-gray-200'
      data-testid='inconspicuous-state-card'
      onClick={() => {
        if (!disabled) onClick();
      }}
      role={disabled ? undefined : 'button'}
      aria-disabled={disabled || undefined}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) onClick();
      }}
    >
      <div className='flex w-full flex-col gap-y-2 px-4 py-3'>
        <span className='line-clamp-1 text-lg font-medium text-gray-500'>{title}</span>
        <div className='flex flex-row justify-end gap-x-2 text-xs text-gray-400'>
          <span>festgestellt am:</span>
          <span className='font-mono'>{formatDeBerlin(creationTime)}</span>
        </div>
      </div>
    </div>
  );
}

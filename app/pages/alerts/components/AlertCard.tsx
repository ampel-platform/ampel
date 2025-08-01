import { AlertDetails, AlertType } from '../types';
import { AlertPing } from './components/AlertPing';

interface AlertCardProps {
  title: string;
  message?: string;
  creationTime: Date;
  type: AlertType;
  onClick: () => void;
  alertDetails?: AlertDetails;
}

/**
 * A visual representation of an alert.
 * The component displays a card with the alert title, an optional message, the creation time, and a colored circle representing the alert type.
 * The component is clickable and calls the given onClick prop when clicked.
 * @param {{ title: string, message?: string, creationTime: Date, type: AlertType, onClick: () => void }} props
 * @returns {React.ReactNode }
 */
export function AlertCard({
  title,
  message,
  creationTime,
  type,
  onClick,
  // eslint-disable-next-line no-undef
}: AlertCardProps): React.ReactNode {
  return (
    <div
      className='relative flex flex-col overflow-visible rounded-md border border-solid border-gray-200 hover:cursor-pointer'
      onClick={onClick}
      data-testid={type === AlertType.Warning ? 'warning-alert-card' : 'critical-alert-card'}
    >
      <div className='absolute -right-2 -top-2'>
        <AlertPing type={type} />
      </div>
      <div className='flex w-full flex-col gap-y-2 px-4 py-3'>
        <span className='line-clamp-1 text-lg font-medium text-violet-800'>{title}</span>
        {message && (
          <span className='line-clamp-3 text-gray-700'>
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </span>
        )}
        <div className='flex flex-row justify-end gap-x-2 text-xs text-gray-400'>
          <span>festgestellt am:</span>
          <span className='font-mono'>{creationTime.toLocaleString('de-DE', { hour12: false, timeZone: 'Europe/Berlin' })}</span>
        </div>
      </div>
    </div>
  );
}

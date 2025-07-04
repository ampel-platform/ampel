import { AlertType } from '../types';
import AlertPing from './components/AlertPing';

type AlertCardProps = {
  title: string;
  message?: string;
  creationTime: Date;
  type: AlertType;
  onClick: () => void;
};

/**
 * A visual representation of an alert.
 * The component displays a card with the alert title, an optional message, the creation time, and a colored circle representing the alert type.
 * The component is clickable and calls the given onClick prop when clicked.
 * @param {{ title: string, message?: string, creationTime: Date, type: AlertType, onClick: () => void }} props
 * @returns {JSX.Element}
 */
export default function AlertCard({ title, message, creationTime, type, onClick }: AlertCardProps) {
  return (
    <div
      className='relative flex flex-col overflow-visible rounded-md border border-solid border-gray-200 hover:cursor-pointer'
      onClick={onClick}
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
          <span className='font-mono'>{creationTime.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

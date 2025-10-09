import { AlertType } from '../../types/types';
import { AlertPing } from './AlertPing';

interface AlertHeaderProps {
  name: string;
  type: AlertType;
}

/**
 * A header component that displays an alert name with an associated visual indicator.
 *
 * @param {{ name: string; type: AlertType }} props
 * @prop {string} name - The name of the alert to be displayed.
 * @prop {AlertType} type - The type of the alert, used to determine the visual indicator.
 * @returns {React.ReactNode } The rendered alert header component.
 */
// eslint-disable-next-line no-undef
export function AlertHeader({ name, type }: AlertHeaderProps): React.ReactNode {
  return (
    <div className='flex flex-row items-center gap-x-4'>
      <AlertPing type={type} />
      <span className='text-xl font-medium text-violet-800'>
        {name} - {type == 1 ? 'Kritisch' : 'Warnung'}
      </span>
    </div>
  );
}

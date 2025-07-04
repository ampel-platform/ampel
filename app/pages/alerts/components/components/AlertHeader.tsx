import { AlertType } from '../../types';
import AlertPing from './AlertPing';

type AlertHeaderProps = {
  name: string;
  type: AlertType;
};

/**
 * A header component that displays an alert name with an associated visual indicator.
 *
 * @param {{ name: string; type: AlertType }} props
 * @prop {string} name - The name of the alert to be displayed.
 * @prop {AlertType} type - The type of the alert, used to determine the visual indicator.
 * @returns {JSX.Element} The rendered alert header component.
 */
export default function AlertHeader({ name, type }: AlertHeaderProps): JSX.Element {
  return (
    <div className='flex flex-row items-center gap-x-4'>
      <AlertPing type={type} />
      <span className='text-xl font-medium text-violet-800'>{name}</span>
    </div>
  );
}

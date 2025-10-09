import { AlertDetails } from '../types/types';
import { AlertHeader } from './components/AlertHeader';
import { AlertHistory } from './components/AlertHistory';
import { AlertLinks } from './components/AlertLinks';
import { HintMessage } from './components/HintMessage';
import { OverlayBackNavigation } from './components/OverlayBackNavigation';

interface OverlayProps {
  data: AlertDetails;
  onClose: () => void;
}

/**
 * A component that displays a detailed view of an alert.
 * The component renders an overlay containing the alert name, type, hint message, links and a history of the alert status.
 * The overlay is closed when the user clicks the back navigation button.
 * @param {{ data: AlertDetails, onClose: () => void }} props
 * @returns {React.ReactNode }
 */
// eslint-disable-next-line no-undef
export function AlertDetailOverlay({ data, onClose }: OverlayProps): React.ReactNode {
  return (
    data && (
      <div className='flex h-full flex-col gap-y-4 bg-white'>
        <div className='max-w-[1000px]'>
          <OverlayBackNavigation onClick={onClose} />
          <div className='px-6'>
            <div className='flex flex-col gap-y-8'>
              <AlertHeader name={data.ruleset} type={data.ampelStatus} />
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-x-12'>
                <div className='lg:col-span-3'>
                  <HintMessage message={data.message} />
                </div>
                <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between'>
                  <AlertLinks links={data.links} />
                </div>
              </div>
              <AlertHistory history={data.rulesetHistory} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

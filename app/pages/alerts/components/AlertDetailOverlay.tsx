
import StatusLegend from './components/StatusLegend';
import AlertLinks from './components/AlertLinks';
import AlertHeader from './components/AlertHeader';
import AlertHistory from './components/AlertHistory';
import OverlayBackNavigation from './components/OverlayBackNavigation';
import HintMessage from './components/HintMessage';
import { AlertDetails } from '../types';

type OverlayProps = {
  data: AlertDetails;
  onClose: () => void;
};



/**
 * A component that displays a detailed view of an alert.
 * The component renders an overlay containing the alert name, type, hint message, links and a history of the alert status.
 * The overlay is closed when the user clicks the back navigation button.
 * @param {{ data: AlertDetails, onClose: () => void }} props
 * @returns {JSX.Element}
 */
export default function AlertDetailOverlay({ data, onClose }: OverlayProps) {
  return (
    data && (
      <div className='flex h-full flex-col gap-y-4 bg-white'>
        <OverlayBackNavigation onClick={onClose} />
        <div className='px-6'>
          <div className='flex flex-col gap-y-8'>
            <AlertHeader name={data.ruleset} type={data.ampelStatus} />
            <div className='grid grid-cols-2 gap-x-12'>
              <HintMessage message={data.message} />
              <div className='flex items-center justify-between gap-4'>
                <AlertLinks links={data.links} />
                <StatusLegend />
              </div>
            </div>
            <AlertHistory history={data.rulesetHistory} />
          </div>
        </div>
      </div>
    )
  );
}





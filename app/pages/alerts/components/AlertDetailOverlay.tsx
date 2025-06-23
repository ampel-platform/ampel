import { useState } from 'react';

import { AlertDetails, AlertType, AmpelStatus, Link, RulesetHistory } from '../types';
import AlertChart from './AlertChart';
import AlertPing from './AlertPing';
import AlertTable from './AlertTable';
import StatusLegend from './StatusLegend';
import { Switcher } from './Switcher';

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




/**
 * A back navigation component that displays a link with an arrow pointing to the left.
 * The component is used in the alert detail overlay to allow the user to navigate back to the alert overview.
 * The component calls the given onClick handler when clicked.
 * @param {{ onClick: () => void }} props
 * @returns {JSX.Element}
 */
function OverlayBackNavigation({ onClick }: { onClick: () => void }) {
  return (
    <div className='flex flex-row'>
      <a
        href='#'
        className='flex flex-row items-center gap-x-2 text-gray-600 hover:text-violet-800'
        onClick={onClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='size-4'
        >
          <path
            fillRule='evenodd'
            d='M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z'
            clipRule='evenodd'
          />
        </svg>
        <span>zurück zur Alarmübersicht</span>
      </a>
    </div>
  );
}

/**
 * A header component that displays an alert name with an associated visual indicator.
 * 
 * @param {{ name: string; type: AlertType }} props
 * @param {string} props.name - The name of the alert to be displayed.
 * @param {AlertType} props.type - The type of the alert, used to determine the visual indicator.
 * @returns {JSX.Element} The rendered alert header component.
 */

function AlertHeader({ name, type }: { name: string; type: AlertType }) {
  return (
    <div className='flex flex-row items-center gap-x-4'>
      <AlertPing type={type} />
      <span className='text-xl font-medium text-violet-800'>{name}</span>
    </div>
  );
}

/**
 * A component to display a hint message with an optional HTML content.
 * The hint message is rendered as a flex column with a font-medium label
 * and a text-gray-600 content. The content is rendered as HTML using the
 * `dangerouslySetInnerHTML` property.
 * If no message is provided, the component does not render anything.
 * @param {{ message?: string }} props
 * @param {string} [props.message] - The hint message to be rendered.
 * @returns {JSX.Element} The rendered hint message component.
 */
function HintMessage({ message }: { message?: string }) {
  return (
    message && (
      <div className='flex flex-col gap-y-4'>
        <span className='font-medium text-gray-600'>Hinweis</span>
        {message && (
          <span className='text-gray-600'>
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </span>
        )}
      </div>
    )
  );
}

/**
 * A component to display a list of links as a flex column with a label
 * and a flex row of links. Each link is rendered as an anchor tag with
 * a rounded border and a hover effect. The links are passed as a prop
 * with the shape of an array of objects with a `displayText` property
 * and an `href` property.
 * @param {{ links: Link[] }} props
 * @param {Link[]} props.links - The list of links to be rendered.
 * @returns {JSX.Element} The rendered link list component.
 */
function AlertLinks({ links }: { links: Link[] }) {
  const additionalLinks = links.map((l) => {
    return (
      <a
        className='rounded-md border border-solid border-gray-200 px-4 py-3 text-violet-800 hover:bg-violet-100'
        href={l.href}
        target='_blank'
      >
        <div className='flex flex-row items-center gap-x-2'>
          <span>{l.displayText}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='size-4'
          >
            <path d='M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z' />
            <path d='M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z' />
          </svg>
        </div>
      </a>
    );
  });

  return (
    <div className='flex flex-col gap-y-4'>
      <span className='font-medium text-gray-600'>Weiterführende Links</span>
      <div className='flex flex-row gap-x-2'>{additionalLinks}</div>
    </div>
  );
}


/**
 * A component to display a history of alerts for a given ruleset.
 *
 * The component takes a RulesetHistory object as a prop and renders a
 * chart or a table, depending on the state of the Switcher component.
 *
 * @param {{ history: RulesetHistory }} props
 * @returns {JSX.Element} The rendered alert history component.
 */
function AlertHistory({ history }: { history: RulesetHistory }) {
  const convertAmpelStatusToFillColor = (status: AmpelStatus): string => {
    switch (status) {
      case AmpelStatus.RED:
        return 'rgba(251, 207, 232, 0.7)';
      case AmpelStatus.YELLOW:
        return 'rgba(254, 243, 199, 0.7)';
      case AmpelStatus.GREEN:
        return 'rgba(243, 244, 246, 0.7)';
    }
  };

  const transformedData = history.data
    .sort((a, b) => {
      if (a.date.getTime() === b.date.getTime()) {
        return 0;
      } else if (a.date.getTime() < b.date.getTime()) {
        return -1;
      }
      return 1;
    })
    .map((h) => {
      return {
        date: h.date.toLocaleString(),
        analyteValue: h.analyteValue,
        ampelStatus: h.ampelStatus,
        ampelStatusFillColor: convertAmpelStatusToFillColor(h.ampelStatus),
      };
    });
  const [enabledChart, setEnabledChart] = useState(true);
  return (
    <>
      <Switcher
        label={enabledChart ? 'Als Tabelle anzeigen' : 'Als Diagram anzeigen'}
        onChange={(newState) => {
          setEnabledChart(newState);
        }}
        initialState={enabledChart}
      />
      {enabledChart ? (
        <AlertChart transformedData={transformedData} />
      ) : (
        <AlertTable transformedData={transformedData} />
      )}
    </>
  );
}
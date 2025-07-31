interface OverlayBackNavigationProps {
  onClick: () => void;
}

/**
 * A back navigation component that displays a link with an arrow pointing to the left.
 * Used in the alert detail overlay to navigate back to the alert overview.
 *
 * @param {{ onClick: () => void }} props
 * @prop {() => void} onClick - The click handler to navigate back.
 * @returns {React.ReactNode } The rendered back navigation component.
 */
// eslint-disable-next-line no-undef
export function OverlayBackNavigation({ onClick }: OverlayBackNavigationProps): React.ReactNode {
  return (
    <div className='flex flex-row'>
      <a
        href='#'
        className='flex flex-row items-center gap-x-2 text-gray-600 hover:text-violet-800'
        data-testid='overlay-back-navigation'
        onClick={(e) => {
          e.preventDefault(); // verhindert ungewolltes Scrollen o. Ä.
          onClick();
        }}
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

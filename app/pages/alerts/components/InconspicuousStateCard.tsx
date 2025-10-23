import { formatDeBerlin } from './components/formatDate';

interface InconspicuousStateProps {
  title: string;
  creationTime: Date;
}

/**
 * A visual representation of an inconspicuous state.
 * The component displays a card with a title, an optional description, and the creation time.
 * The component is not clickable and does not call any onClick prop when clicked.
 * @param {{ title: string, description?: string, creationTime: Date }} props
 * @returns {React.ReactNode }
 */
export function InconspicuousStateCard({
  title,
  creationTime,
  // eslint-disable-next-line no-undef
}: InconspicuousStateProps): React.ReactNode {
  return (
    <div
      className='flex flex-col rounded-md border border-solid border-gray-200'
      data-testid='inconspicuous-state-card'
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

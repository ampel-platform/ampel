type HintMessageProps = {
  message?: string;
};

/**
 * A component to display a hint message with optional HTML content.
 * The hint message is rendered as a flex column with a font-medium label
 * and a gray-colored content. If no message is provided, nothing is rendered.
 *
 * @param {{ message?: string }} props
 * @prop {string} [message] - The hint message to be rendered as HTML.
 * @returns {JSX.Element} The rendered hint message component.
 */
export default function HintMessage({ message }: HintMessageProps): JSX.Element | null {
  if (!message) return null;

  return (
    <div className='flex flex-col gap-1'>
      <span className='text-sm font-medium text-muted-foreground'>Hinweis</span>
      <div
        className='text-sm text-gray-600'
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
}

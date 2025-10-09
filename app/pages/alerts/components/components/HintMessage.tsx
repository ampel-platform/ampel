interface HintMessageProps {
  message?: string;
}

/**
 * A component to display a hint message with optional HTML content.
 * The hint message is rendered as a flex column with a font-medium label
 * and a gray-colored content. If no message is provided, nothing is rendered.
 *
 * @param {{ message?: string }} props
 * @prop {string} [message] - The hint message to be rendered as HTML.
 * @returns {React.ReactNode } The rendered hint message component.
 */
// eslint-disable-next-line no-undef
export function HintMessage({ message }: HintMessageProps): React.ReactNode | null {
  if (!message) return null;

  return (
    <div className='rounded-xl bg-gray-100 p-1'>
      <div className='text-m font-bold' dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}

import { Link } from '../../types';

interface AlertLinksProps {
  links: Link[];
}

/**
 * A component to display a list of links as a flex column with a label
 * and a flex row of links. Each link is rendered as an anchor tag with
 * a rounded border and a hover effect.
 *
 * @param {{ links: Link[] }} props
 * @prop {Link[]} links - The list of links to be rendered.
 * @returns {React.ReactNode } The rendered link list component.
 */
// eslint-disable-next-line no-undef
export function AlertLinks({ links }: AlertLinksProps): React.ReactNode {
  if (!links.length) return <></>;

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-muted-foreground text-sm'>Weiterführende Links</span>
      <div className='flex flex-wrap gap-2'>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-full border border-violet-300 bg-white px-3 py-1 text-sm text-violet-800 transition-colors hover:bg-violet-100'
          >
            {link.displayText}
          </a>
        ))}
      </div>
    </div>
  );
}

import type { ReactElement } from 'react';

import { Link } from '../../types/types';

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
export function AlertLinks({ links }: AlertLinksProps): ReactElement | null {
  if (!links.length) return null;

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-muted-foreground text-sm'>Weiterführende Links</span>
      <div className='flex flex-wrap gap-2'>
        {links.map((link) => {
          const isDisabled =
            link.disabled ?? (link.displayText === 'SOP' || link.displayText === 'Labor');
          const key = `${link.displayText}-${link.href}`;

          if (isDisabled) {
            return (
              <span
                key={key}
                aria-disabled='true'
                className='cursor-not-allowed rounded-full border border-gray-300 bg-gray-200 px-3 py-1 text-sm text-gray-400'
              >
                {link.displayText}
              </span>
            );
          }

          return (
            <a
              key={key}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-full border border-violet-300 bg-white px-3 py-1 text-sm text-violet-800 transition-colors hover:bg-violet-100'
            >
              {link.displayText}
            </a>
          );
        })}
      </div>
    </div>
  );
}

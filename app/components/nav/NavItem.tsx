import React, { ReactNode } from 'react';

interface NavItemProps {
  displayName: string;
  icon: ReactNode;
  linkTarget?: string;
  active?: boolean;
}

/**
 * Renders a navigation item with an icon and display name.
 * The component can optionally highlight itself if marked as active.
 *
 * @param {NavItemProps} props - The properties for the NavItem component.
 * @param {string} props.displayName - The display name of the navigation item.
 * @param {ReactNode} props.icon - The icon to display alongside the navigation item.
 * @param {string} [props.linkTarget='#'] - The target URL for the navigation item link.
 * @param {boolean} [props.active=false] - Whether the navigation item should be displayed as active.
 *
 * @returns {React.ReactNode } The rendered navigation item component.
 */

export function NavItem({
  displayName,
  icon,
  linkTarget = '#',
  active = false,
}: NavItemProps): React.ReactNode {
  const additionalActiveClasses = active === true ? 'bg-gray-50 text-violet-800' : '';

  return (
    <a
      className={`flex flex-row gap-x-4 px-4 py-3 hover:rounded-md hover:bg-gray-50 hover:text-violet-800 ${additionalActiveClasses}`}
      href={linkTarget}
    >
      {icon}
      <span>{displayName}</span>
    </a>
  );
}

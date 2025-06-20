import React, { ReactNode } from 'react';

type Props = {
  displayName: string;
  icon: ReactNode;
  linkTarget?: string;
  active?: boolean;
};

export default function NavItem({ displayName, icon, linkTarget = '#', active = false }: Props) {
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

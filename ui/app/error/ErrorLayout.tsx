import React from 'react';

interface ErrorLayoutProps {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
}

export function ErrorLayout({
  children,
  className,
  cardClassName,
}: ErrorLayoutProps): React.ReactNode {
  const shellClassName = [
    'relative min-h-screen flex items-start justify-center overflow-hidden mt-16',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const cardClasses = ['max-w-[760px] w-[90vw] text-center py-12 px-7 sm:p-0', cardClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={shellClassName}>
      <div className={cardClasses}>{children}</div>
    </div>
  );
}

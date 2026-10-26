import React from 'react';

import { AlertDetails, AlertType } from '../types/types';

interface AlertCardProps {
  title: string;
  message?: string;
  creationTime: Date;
  type: AlertType;
  onClick: () => void;
  alertDetails?: AlertDetails;
  disabled?: boolean;
}

export function AlertCard({
  title,
  creationTime,
  type,
  onClick,
  disabled = false,
}: AlertCardProps): React.ReactNode {
  const bgClasses =
    type === AlertType.Critical
      ? 'bg-rose-400/90 ring-rose-600/30'
      : type === AlertType.Warning
        ? 'bg-amber-300/90 ring-amber-500/30'
        : 'bg-emerald-300/90 ring-emerald-500/30';

  const formatRelative = (d: Date): string => {
    const pad = (n: number): string => String(n).padStart(2, '0');
    const now = new Date();
    const startOfDay = (x: Date): Date => new Date(x.getFullYear(), x.getMonth(), x.getDate());
    const diffDays = Math.floor((startOfDay(now).getTime() - startOfDay(d).getTime()) / 86400000);

    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());

    if (diffDays === 0) return `Heute, ${hh}:${mm} Uhr`;
    if (diffDays === 1) return `Gestern, ${hh}:${mm} Uhr`;
    if (diffDays === 2) return `Vorgestern, ${hh}:${mm} Uhr`;

    const dd = pad(d.getDate());
    const mo = pad(d.getMonth() + 1);
    const yyyy = d.getFullYear();
    return `${dd}.${mo}.${yyyy}, ${hh}:${mm} Uhr`;
  };

  return (
    <div
      className={`group relative flex w-full select-none flex-col overflow-hidden rounded-xl ring-1 ${bgClasses} shadow-sm transition-shadow ${disabled ? 'cursor-default' : 'hover:shadow-md'}`}
      style={{ height: '160px' }}
      onClick={() => {
        if (!disabled) onClick();
      }}
      data-testid={type === AlertType.Warning ? 'warning-alert-card' : 'critical-alert-card'}
      role={disabled ? undefined : 'button'}
      tabIndex={disabled ? undefined : 0}
      aria-disabled={disabled || undefined}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) onClick();
      }}
    >
      <div className='px-4 pt-3'>
        <h3 className='line-clamp-2 text-2xl font-semibold leading-snug text-gray-900'>{title}</h3>
      </div>

      <div className='mt-auto flex items-center justify-between px-4 pb-3 pt-2 text-xs text-gray-900/70'>
        <div className='flex items-center gap-2'>
          <span className='font-mono'>{formatRelative(creationTime)}</span>
        </div>
      </div>
    </div>
  );
}

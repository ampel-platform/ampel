'use client';

import { AlertType } from '../types';
import AlertPing from './AlertPing';

type Props = {
  title: string;
  message?: string;
  creationTime: Date;
  type: AlertType;
  onClick: () => any;
};

export default function AlertCard({ title, message, creationTime, type, onClick }: Props) {
  return (
    <div
      className='relative flex flex-col overflow-visible rounded-md border border-solid border-gray-200 hover:cursor-pointer'
      onClick={onClick}
    >
      <div className='absolute -right-2 -top-2'>
        <AlertPing type={type} />
      </div>
      <div className='flex w-full flex-col gap-y-2 px-4 py-3'>
        <span className='line-clamp-1 text-lg font-medium text-violet-800'>{title}</span>
        {message && (
          <span className='line-clamp-3 text-gray-700'>
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </span>
        )}
        <div className='flex flex-row justify-end gap-x-2 text-xs text-gray-400'>
          <span>festgestellt am:</span>
          <span className='font-mono'>{creationTime.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

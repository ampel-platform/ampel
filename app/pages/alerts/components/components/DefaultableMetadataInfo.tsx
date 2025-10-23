import React from 'react';

interface DefaultableMetadataInfoProps {
  title: string;
  valueSupplier: () => string | null | undefined;
  fallbackValue?: string;
}

export function DefaultableMetadataInfo({
  title,
  valueSupplier,
  fallbackValue,
}: DefaultableMetadataInfoProps): React.ReactNode {
  return (
    <div className='flex w-full flex-col items-start text-base font-normal'>
      <span className='font-light text-gray-600'>{title}</span>
      <span className='text-lg text-violet-800'>{valueSupplier() || fallbackValue || ''}</span>
    </div>
  );
}

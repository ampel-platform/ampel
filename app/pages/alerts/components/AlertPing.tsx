import { AlertType } from '../types';

type Props = {
  type: AlertType;
};

export default function AlertPing({ type }: Props) {
  const color = type === AlertType.Warning ? 'bg-amber-200' : 'bg-rose-300';

  return (
    <span className='relative flex h-4 w-4'>
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color}`}
      ></span>
      <span className={`relative inline-flex h-4 w-4 rounded-full ${color}`}></span>
    </span>
  );
}

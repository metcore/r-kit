import clsx from 'clsx';
import { useInputGroup } from '../input-group';
import { Kbd, type KbdProps } from '../kbd';

export function InputGroupKbd({ ...props }: KbdProps) {
  const inGroup = useInputGroup() !== null;

  return (
    <Kbd
      {...props}
      className={clsx(
        inGroup && [
          'mr-2',
          'self-center',
          'shrink-0',
          'rounded-md',
          'border border-gray-200',
          'bg-gray-50',
          'text-gray-500',
        ]
      )}
      {...props}
    />
  );
}

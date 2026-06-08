import { cn } from '../../../lib/utils';
import { ButtonIcon } from '../../button-icon/button-icon';
import { Text } from '../../text';
import type { ButtonDropdownProps } from '../type';
import { useEffect, useRef, type ReactNode } from 'react';

const ButtonDropdown = ({ onClick, active }: ButtonDropdownProps) => {
  return (
    <ButtonIcon
      icon={active == true ? 'arrow-up' : 'arrow-down'}
      onClick={onClick}
      size="sm"
      color="gray"
      variant="tertiary"
    />
  );
};

const ItemDropdown = ({
  active,
  value,
  onClick,
}: {
  active: boolean;
  value: string;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (active && ref.current) {
      ref.current.scrollIntoView({
        block: 'nearest',
        behavior: 'auto',
      });
    }
  }, [active]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        'w-full min-w-23.5 cursor-pointer rounded-md border px-1.5 py-1 text-sm transition-colors outline-none',
        active
          ? 'border-primary-300 bg-primary-50'
          : 'border-transparent hover:bg-gray-50'
      )}
    >
      <Text value={value} weight="medium" />
    </button>
  );
};

const DropdownWrapper = ({
  children,
  onClose,
}: {
  onClose: (open: boolean) => void;
  children: ReactNode;
}) => {
  return (
    <div className="relative" onClick={() => onClose(false)}>
      <div className="absolute top-5 left-1/2 z-20 max-h-48 -translate-x-1/2 space-y-1 overflow-y-auto rounded-lg bg-white px-2 py-1 shadow-md">
        {children}
      </div>
    </div>
  );
};

export { ButtonDropdown, ItemDropdown, DropdownWrapper };

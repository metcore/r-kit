import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Icon } from '../icons';
import { Text } from '../text';
import type { ButtonDropdownProps } from './type';

const ButtonDropdown = ({
  onClick,
  active,
  size = 'md',
}: ButtonDropdownProps) => {
  const size_map = {
    sm: 11,
    md: 12,
    lg: 18,
  };
  return (
    <Button
      size={'icon'}
      onClick={onClick}
      color="gray"
      className={cn(
        'bg-transparent transition-colors outline-none *:duration-300 hover:bg-gray-50 focus:outline-none'
      )}
    >
      <Icon
        name="arrow-down"
        size={size_map[size]}
        className={cn(
          'text-primary-1000',
          active == true ? 'rotate-180' : 'rotate-0'
        )}
      />
    </Button>
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
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full min-w-23.5 cursor-pointer rounded-md border px-1.5 py-1 text-sm transition-colors outline-none',
        active
          ? 'bg-primary-50 border-primary-300'
          : 'border-transparent hover:bg-gray-50'
      )}
    >
      <Text value={value} weight="medium" />
    </button>
  );
};

export { ButtonDropdown, ItemDropdown };

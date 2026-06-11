import clsx from 'clsx';
import { DropdownItem } from '../../dropdown';
import { Text } from '../../text/text';
import { Icon, type IconNameProps } from '../../icons';

interface Props {
  onClick: () => void;
  active: boolean;
  label: string;
  className?: string;
  icon?: IconNameProps;
  disabled?: boolean;
}

export default function SelectItem({
  active,
  label,
  onClick,
  className,
  icon,
  disabled = false,
}: Props) {
  return (
    <DropdownItem
      disabled={disabled}
      className={clsx(
        'hover:border-primary-300 hover:bg-primary-50 cursor-pointer rounded-md border border-transparent py-1',
        active && 'bg-primary-50 border-primary-300',
        disabled && 'opacity-50 hover:border-transparent hover:bg-transparent',
        className
      )}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={20} className="text-gray-900" />}
      <Text weight="medium" className="text-gray-900">
        {label}
      </Text>
    </DropdownItem>
  );
}

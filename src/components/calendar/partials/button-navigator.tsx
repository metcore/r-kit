import { cn } from '../../../lib/utils';
import { ButtonIcon } from '../../button-icon/button-icon';
import { type IconNameProps } from '../../icons';

const ButtonNavigator = ({
  onClick,
  icon,
  className,
  disabled = false,
}: {
  onClick: () => void;
  icon: IconNameProps;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <ButtonIcon
      onClick={onClick}
      icon={icon}
      color="gray"
      disabled={disabled}
      size="xs"
      className={cn(className)}
    />
  );
};

export { ButtonNavigator };

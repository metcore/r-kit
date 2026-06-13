import { cn } from '../../../lib/utils';
import { ButtonIcon } from '../../button-icon/button-icon';
import { type IconNameProps } from '../../icons';

const ButtonNavigator = ({
  onClick,
  icon,
  className,
}: {
  onClick: () => void;
  icon: IconNameProps;
  className?: string;
}) => {
  return (
    <ButtonIcon
      onClick={onClick}
      icon={icon}
      color="gray"
      size="xs"
      className={cn('bg-gray-500 hover:bg-gray-600', className)}
    />
  );
};

export { ButtonNavigator };

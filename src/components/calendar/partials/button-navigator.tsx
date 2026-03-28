import { cn } from '../../../lib/utils';
import { Button } from '../../button';
import { Icon, type IconNameProps } from '../../icons';

const ButtonNavigator = ({
  onClick,
  icon,
  className,
  size = 'md',
}: {
  onClick: () => void;
  icon: IconNameProps;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const size_map = {
    sm: 16,
    md: 20,
    lg: 25,
  };

  return (
    <Button
      onClick={onClick}
      size={'icon'}
      color="gray"
      className={cn('bg-gray-500 hover:bg-gray-600', className)}
    >
      <Icon name={icon} className="text-white" size={size_map[size]} />
    </Button>
  );
};

export { ButtonNavigator };

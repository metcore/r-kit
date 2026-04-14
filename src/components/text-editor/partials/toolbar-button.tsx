import { Button } from '../../button';
import { Icon, type IconNameProps } from '../../icons';
import type { ToolbarButtonProps } from '../type';

export default function ToolbarButton({
  icon,
  iconSize = 19,
  active = false,
  disabled = false,
  title,
  onClick,
  children,
  className,
}: ToolbarButtonProps) {
  return (
    <Button
      title={title}
      size="icon"
      variant={active ? 'default' : 'tertiary'}
      color={active ? 'primary' : 'gray'}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children ?? <Icon name={icon as IconNameProps} size={iconSize} />}
    </Button>
  );
}

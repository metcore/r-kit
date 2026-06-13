import clsx from 'clsx';
import { Button } from '../../button';
import { Icon, type IconNameProps } from '../../icons';
import type { ToolbarButtonProps } from '../type';
import { ButtonIcon } from '../../button-icon';

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
  if (children !== undefined) {
    return (
      <Button
        title={title}
        size="xxs"
        variant={active ? 'default' : 'tertiary'}
        color={active ? 'primary' : 'gray'}
        disabled={disabled}
        onClick={onClick}
        className={clsx(className, 'cursor-pointer')}
        type="button"
      >
        {children ?? (
          <Icon
            name={icon as IconNameProps}
            size={iconSize}
            className={!active ? 'text-gray-900' : 'text-white'}
          />
        )}
      </Button>
    );
  }

  return (
    <ButtonIcon
      title={title}
      variant={active ? 'default' : 'tertiary'}
      color={active ? 'primary' : 'gray'}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        className,
        'cursor-pointer',
        !active ? 'text-gray-900' : 'text-white'
      )}
      type="button"
      icon={icon as IconNameProps}
    />
  );
}

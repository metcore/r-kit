import { cn } from '../../lib/utils';
import { Button, type ButtonProps } from '../button/button';
import { Icon, type IconNameProps } from '../icons';

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

type ButtonIconSize = 'sm' | 'md' | 'lg';

export type ButtonIconProps = DistributiveOmit<
  ButtonProps,
  'children' | 'size'
> & {
  'icon': IconNameProps;
  'size'?: ButtonIconSize;
  'aria-label'?: string;
};

const boxBySize: Record<ButtonIconSize, string> = {
  sm: 'h-8 w-8 p-0',
  md: 'h-9 w-9 p-0',
  lg: 'h-10 w-10 p-0',
};

const glyphBySize: Record<ButtonIconSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

export const ButtonIcon = ({
  icon,
  size = 'md',
  loading = false,
  className,
  ...rest
}: ButtonIconProps) => {
  return (
    <Button
      {...(rest as ButtonProps)}
      size={size}
      loading={loading}
      className={cn(boxBySize[size], className)}
    >
      {!loading && <Icon name={icon} size={glyphBySize[size]} />}
    </Button>
  );
};

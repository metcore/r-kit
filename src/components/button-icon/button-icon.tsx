import { cn } from '../../lib/utils';
import { Button, type ButtonProps } from '../button/button';
import { Icon, type IconNameProps } from '../icons';
import { Indicator, type IndicatorProps } from '../indicator';

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

type ButtonIconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

export type ButtonIconProps = DistributiveOmit<
  ButtonProps,
  'children' | 'size'
> & {
  'indicatorProps'?: Omit<IndicatorProps, 'children'>;
  'icon': IconNameProps;
  'size'?: ButtonIconSize;
  'rounded'?: boolean;
  'aria-label'?: string;
  'iconSize'?: number;
};

const boxBySize: Record<ButtonIconSize, string> = {
  xxs: 'h-4 w-4 p-0',
  xs: 'h-6 w-6 p-0',
  sm: 'h-8 w-8 p-0',
  md: 'h-9 w-9 p-0',
  lg: 'h-10 w-10 p-0',
};

const glyphBySize: Record<ButtonIconSize, number> = {
  xxs: 8,
  xs: 10,
  sm: 14,
  md: 20,
  lg: 22,
};

export const ButtonIcon = ({
  icon,
  size = 'md',
  rounded = false,
  loading = false,
  className,
  iconSize,
  indicatorProps,
  type = 'button',
  ...rest
}: ButtonIconProps) => {
  const iconElement = <Icon name={icon} size={iconSize ?? glyphBySize[size]} />;

  return (
    <Button
      {...(rest as ButtonProps)}
      size={size}
      loading={loading}
      className={cn(boxBySize[size], rounded && 'rounded-full', className)}
      type={type}
    >
      {!loading &&
        (indicatorProps ? (
          <Indicator {...indicatorProps}> {iconElement}</Indicator>
        ) : (
          iconElement
        ))}
    </Button>
  );
};

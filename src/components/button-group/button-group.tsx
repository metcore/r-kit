import { createContext, useContext } from 'react';
import { Button, type ButtonProps } from '../button/button';
import type { ButtonGroupProps } from './type';
import clsx from 'clsx';

type ButtonGroupContextType = {
  size?: ButtonProps['size'];
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  direction?: 'horizontal' | 'vertical';
};

const ButtonGroupContext = createContext<ButtonGroupContextType | null>(null);

const ButtonGroup = ({
  children,
  size,
  direction = 'horizontal',
  color = 'primary',
  variant = 'default',
}: ButtonGroupProps) => {
  return (
    <ButtonGroupContext.Provider value={{ size, color, variant, direction }}>
      <div
        className={clsx(
          'flex *:rounded-none',
          direction === 'horizontal'
            ? 'flex-row items-center *:first:rounded-tl-lg *:first:rounded-bl-lg *:last:rounded-tr-lg *:last:rounded-br-lg'
            : 'flex-col items-stretch *:first:rounded-tl-lg *:first:rounded-tr-lg *:last:rounded-br-lg *:last:rounded-bl-lg'
        )}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
};

const ButtonGroupItem = ({
  children,
  color,
  ...props
}: Omit<ButtonProps, 'size' | 'variant'>) => {
  const context = useContext(ButtonGroupContext);

  const finalColor = color ?? context?.color;
  const variant = context?.variant;
  const direction = context?.direction;

  const isDefault = variant === 'default';
  const isTertiary = variant === 'tertiary';
  const isVertical = direction === 'vertical';

  const isHorizontal = direction === 'horizontal';

  const borderDirectionClass = clsx(
    isHorizontal && 'border-l-0 first:border-l',
    isVertical && 'border-t-0 first:border-t'
  );

  const BORDER_COLOR_MAP: Record<NonNullable<ButtonProps['color']>, string> = {
    info: 'border-info-500',
    gray: 'border-gray-400',
    primary: 'border-primary-1000',
    success: 'border-success-500',
    danger: 'border-danger-500',
    warning: 'border-warning-500',
    orange: 'border-orange-500',
    purple: 'border-purple-500',
    secondary: 'border-primary-1000',
  };

  return (
    <Button
      size={context?.size}
      color={color ?? context?.color}
      variant={context?.variant}
      className={clsx(
        isDefault && 'last:border-r-none border-r border-white', //prettier-ignore
        isTertiary && 'brder-0', //prettier-ignore

        variant === 'outline' && [
          borderDirectionClass,
          finalColor && BORDER_COLOR_MAP[finalColor],
        ]
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export { ButtonGroup, ButtonGroupItem };

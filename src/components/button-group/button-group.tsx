import { createContext, useContext } from 'react';
import clsx from 'clsx';

import {
  Button,
  type ButtonProps,
  type ButtonAsButtonProps,
  type ButtonAsAnchorProps,
} from '../button/button';

type ButtonGroupContextType = {
  size?: ButtonProps['size'];
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  direction?: 'horizontal' | 'vertical';
};

const ButtonGroupContext = createContext<ButtonGroupContextType | null>(null);

export interface ButtonGroupProps {
  children: React.ReactNode;
  size?: ButtonProps['size'];
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  direction?: 'horizontal' | 'vertical';
}

export type ButtonGroupItemProps =
  | Omit<ButtonAsButtonProps, 'size' | 'variant'>
  | Omit<ButtonAsAnchorProps, 'size' | 'variant'>;

export const ButtonGroup = ({
  children,
  size,
  direction = 'horizontal',
  color = 'primary',
  variant = 'default',
}: ButtonGroupProps) => {
  return (
    <ButtonGroupContext.Provider
      value={{
        size,
        color,
        variant,
        direction,
      }}
    >
      <div
        className={clsx(
          'flex *:rounded-none',
          direction === 'horizontal'
            ? [
                'flex-row items-center',
                '*:first:rounded-l-lg',
                '*:last:rounded-r-lg',
              ]
            : [
                'flex-col items-stretch',
                '*:first:rounded-t-lg',
                '*:last:rounded-b-lg',
              ]
        )}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
};

export const ButtonGroupItem = ({
  color,
  className,
  ...props
}: ButtonGroupItemProps) => {
  const context = useContext(ButtonGroupContext);

  const finalColor = color ?? context?.color;

  const isHorizontal = context?.direction === 'horizontal';

  const isVertical = context?.direction === 'vertical';

  const isDefault = context?.variant === 'default';

  const isTertiary = context?.variant === 'tertiary';

  const BORDER_COLOR_MAP: Record<NonNullable<ButtonProps['color']>, string> = {
    primary: 'border-primary-1000',
    secondary: 'border-primary-1000',
    success: 'border-success-500',
    danger: 'border-danger-500',
    warning: 'border-warning-500',
    info: 'border-info-500',
    orange: 'border-orange-500',
    purple: 'border-purple-500',
    gray: 'border-gray-400',
  };

  const borderDirectionClass = clsx(
    isHorizontal && 'border-l-0 first:border-l',
    isVertical && 'border-t-0 first:border-t'
  );

  return (
    <Button
      {...props}
      size={context?.size}
      color={finalColor}
      variant={context?.variant}
      className={clsx(
        className,
        isDefault &&
          clsx(
            isHorizontal && 'border-r border-white last:border-r-0',

            isVertical && 'border-b border-white last:border-b-0'
          ),
        isTertiary && 'border-0',
        context?.variant === 'outline' && [
          borderDirectionClass,
          finalColor && BORDER_COLOR_MAP[finalColor],
        ]
      )}
    />
  );
};

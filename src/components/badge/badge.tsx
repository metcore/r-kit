import type { CSSProperties, HTMLAttributes } from 'react';
import { badgeVariants, type BadgeVariantProps } from './badge-variants';
import { cn, hexToRgba } from '../../lib/utils';

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, BadgeVariantProps {
  hexColor?: string;
}

export const Badge = ({
  children,
  className,
  size,
  color,
  variant,
  hexColor,
  ...props
}: BadgeProps) => {
  const customStyle: CSSProperties =
    hexColor != null
      ? {
          backgroundColor:
            variant === 'dot' ? hexColor : hexToRgba(hexColor, 0.1),

          color: hexColor,
        }
      : {};

  return (
    <div
      {...props}
      style={customStyle}
      className={cn(
        badgeVariants({
          size,
          color: hexColor != null && hexColor.length > 0 ? undefined : color,
          variant,
        }),
        className
      )}
    >
      {variant !== 'dot' && children}
    </div>
  );
};

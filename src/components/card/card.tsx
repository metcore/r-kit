import * as React from 'react';
import { cn } from '../../lib/utils';

import { cardVariants, dividerColors, paddingBySize } from './card-variants';
import type { CardVariantProps } from './card-variants';
import type { BaseColor } from '../base/type/base-color';

interface CardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>, CardVariantProps {
  color?: BaseColor;
}

export const Card = ({
  variant,
  color,
  size,
  className,
  children,
  ...props
}: CardProps) => {
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as never, { variant, color, size });
    }
    return child;
  });

  return (
    <div
      className={cn(cardVariants({ variant, color, size }), className)}
      {...props}
    >
      {enhancedChildren}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
  noPadding?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
}

export const CardHeader = ({
  divider = false,
  noPadding = false,
  size = 'md',
  color = 'secondary',
  variant = 'outline',
  className,
  children,
  ...props
}: CardHeaderProps) => {
  return (
    <div
      className={cn(
        !noPadding && paddingBySize[size],
        divider && 'border-b',
        divider && variant === 'outline'
          ? dividerColors[color]
          : 'border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const CardBody = ({
  size = 'md',
  className,
  children,
  ...props
}: CardBodyProps) => {
  return (
    <div
      className={cn(paddingBySize[size], className, 'rounded-md')}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  image: string;
  alt?: string;
}

export const CardMedia = ({
  className,
  image,
  alt,
  ...props
}: CardMediaProps) => {
  return (
    <div className={cn('overflow-hidden', className)} {...props}>
      <img src={image} alt={alt} />
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  divider?: boolean;
  variant?: 'outline' | 'filled';
}

export const CardFooter = ({
  divider = false,
  size = 'md',
  color = 'secondary',
  variant = 'outline',
  className,
  children,
  ...props
}: CardFooterProps) => {
  return (
    <div
      className={cn(
        paddingBySize[size],
        divider && 'border-t',
        divider && variant === 'outline'
          ? dividerColors[color]
          : 'border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

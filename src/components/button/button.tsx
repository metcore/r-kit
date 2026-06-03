import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '../../lib/utils';
import { buttonVariants, type ButtonVariantProps } from './button-variants';

import { RoundedSpinner } from '../loading';
import { BaseButton } from './base-button';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'orange'
  | 'purple'
  | 'gray';

interface ButtonBaseProps extends ButtonVariantProps {
  active?: boolean;
  color?: ButtonColor;
  block?: boolean;
  asChild?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

export type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

function isAnchorButton(props: ButtonProps): props is ButtonAsAnchorProps {
  return 'href' in props;
}

type SpinnerSize = NonNullable<ButtonVariantProps['size']>;

const spinnerSize: Record<SpinnerSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
};

export const Button = (props: ButtonProps) => {
  const {
    variant,
    size = 'md',
    color,
    className,
    block = false,
    active = false,
    loading = false,
  } = props;

  const spinner = loading ? (
    <RoundedSpinner size={spinnerSize[size ?? 'md']} />
  ) : null;

  const classes = cn(
    buttonVariants({
      variant,
      size,
      color,
      block,
      active,
    }),
    className,
    'gap-2'
  );

  if (isAnchorButton(props)) {
    const { href, disabled, children, ...anchorProps } = props;

    return (
      <BaseButton
        {...anchorProps}
        href={href}
        disabled={disabled}
        className={classes}
      >
        {spinner}
        {children}
      </BaseButton>
    );
  }

  const { asChild = false, children, ...buttonProps } = props;

  if (asChild) {
    return (
      <Slot {...buttonProps} className={classes}>
        {spinner}
        {children}
      </Slot>
    );
  }

  return (
    <BaseButton {...buttonProps} className={classes}>
      {spinner}
      {children}
    </BaseButton>
  );
};

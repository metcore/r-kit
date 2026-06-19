import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '../../lib/utils';
import { buttonVariants, type ButtonVariantProps } from './button-variants';

import { RoundedSpinner } from '../loading';
import { BaseButton } from './base-button';
import { useInputGroup } from '../input-group/';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

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
  type?: 'button' | 'submit';
  tooltip?: string;
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
  xxs: 8,
  xs: 10,
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
    type = 'button',
    tooltip,
  } = props;

  const group = useInputGroup();
  const inGroup = group !== null;

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
    'gap-2',
    inGroup && 'h-full rounded-none border-0'
  );

  let buttonElement: React.ReactNode;

  // anchor button
  if (isAnchorButton(props)) {
    const { href, disabled, children, ...anchorProps } = props;

    buttonElement = (
      <BaseButton
        {...anchorProps}
        href={href}
        disabled={disabled}
        className={classes}
        type={type}
      >
        {spinner}
        {children}
      </BaseButton>
    );
  } else {
    const { asChild = false, children, ...buttonProps } = props;

    // slot mode
    if (asChild) {
      buttonElement = (
        <Slot {...buttonProps} className={classes}>
          {children}
        </Slot>
      );
    } else {
      buttonElement = (
        <BaseButton {...buttonProps} className={classes}>
          {spinner}
          {children}
        </BaseButton>
      );
    }
  }

  if (tooltip == undefined) {
    return buttonElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>

      <TooltipContent side="bottom" className="text-center">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};

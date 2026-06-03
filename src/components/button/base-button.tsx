import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  forwardRef,
} from 'react';

import { cn } from '../../lib/utils';
import { baseButtonVariants } from './base-button-variants';

type BaseButtonCommonProps = {
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  className?: string;
};

type BaseButtonAsButtonProps = BaseButtonCommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type BaseButtonAsAnchorProps = BaseButtonCommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type BaseButtonProps = BaseButtonAsButtonProps | BaseButtonAsAnchorProps;

function isAnchor(props: BaseButtonProps): props is BaseButtonAsAnchorProps {
  return 'href' in props;
}

export const BaseButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BaseButtonProps
>((props, ref) => {
  const { disabled = false, loading = false, className } = props;

  const classes = cn(
    baseButtonVariants({
      disabled,
      loading,
    }),
    className
  );

  if (isAnchor(props)) {
    const {
      href,
      target,
      active,
      rel,
      children,
      disabled: disabled,
      ...anchorProps
    } = props;

    return (
      <a
        {...anchorProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        data-active={active}
        href={disabled == true ? undefined : href}
        aria-disabled={disabled}
        tabIndex={disabled == true ? -1 : undefined}
        target={target}
        rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
        className={classes}
      >
        {children}
      </a>
    );
  }

  const { children, active, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      ref={ref as React.Ref<HTMLButtonElement>}
      disabled={disabled}
      className={classes}
      data-active={active}
    >
      {children}
    </button>
  );
});

BaseButton.displayName = 'BaseButton';

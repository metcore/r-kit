import * as React from 'react';
import { cn, fieldHasError } from '../../lib/utils';
import { FormField } from '../form';
import { createContext, useContext } from 'react';
import type { InputSize } from '../input/input';

export type InputGroupVariant = 'outline' | 'ghost';

export type InputGroupContextValue = {
  size: InputSize;
  variant: InputGroupVariant;
  disabled: boolean;
  hasError: boolean;
};

const InputGroupContext = createContext<InputGroupContextValue | null>(null);

const InputGroupControlContext = createContext<boolean>(false);

export const useInputGroup = () => useContext(InputGroupContext);
export const useInputGroupControl = () => useContext(InputGroupControlContext);

const groupMinHeight: Record<InputSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-9 text-sm',
  lg: 'h-10 text-base',
};

const variantStyles: Record<
  InputGroupVariant,
  {
    container: string;
    default: string;
    error: string;
    divider: string;
    disabled: string;
  }
> = {
  outline: {
    container: 'border bg-white',
    default: 'border-gray-200 focus-within:border-primary-300',
    error: 'border-danger-500 focus-within:border-danger-500',
    divider:
      '[&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-gray-200',
    disabled: 'bg-gray-300',
  },
  ghost: {
    container: 'border border-transparent bg-transparent',
    default: 'focus-within:bg-gray-50',
    error: 'border-danger-500',
    divider: '',
    disabled: '',
  },
};
export interface InputGroupProps extends Omit<
  React.ComponentProps<'div'>,
  'size'
> {
  size?: InputSize;
  variant?: InputGroupVariant;
  label?: string;
  hint?: string;
  description?: string;
  tooltip?: string;
  required?: boolean;
  errorMessages?: string | string[];
  isError?: boolean;
  disabled?: boolean;
}

export function InputGroup({
  className,
  size = 'md',
  variant = 'outline',
  label,
  hint,
  description,
  tooltip,
  required,
  errorMessages,
  isError,
  disabled = false,
  children,
  ...props
}: InputGroupProps) {
  const hasError = fieldHasError(errorMessages) ?? isError ?? false;
  const styles = variantStyles[variant];

  const contextValue = React.useMemo<InputGroupContextValue>(
    () => ({ size, variant, disabled, hasError }),
    [size, variant, disabled, hasError]
  );

  return (
    <FormField
      label={label}
      hint={hint}
      description={description}
      errorMessages={errorMessages}
      required={required}
      tooltip={tooltip}
      size={size}
    >
      <InputGroupContext.Provider value={contextValue}>
        <div
          data-slot="input-group"
          data-variant={variant}
          data-disabled={disabled || undefined}
          aria-disabled={disabled || undefined}
          className={cn(
            'flex w-full items-stretch overflow-hidden rounded-lg transition-colors',
            groupMinHeight[size],
            styles.container,
            hasError ? styles.error : styles.default,
            styles.divider,
            disabled && cn('pointer-events-none opacity-60', styles.disabled),
            className
          )}
          {...props}
        >
          {children}
        </div>
      </InputGroupContext.Provider>
    </FormField>
  );
}

export function InputGroupControl({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <InputGroupControlContext.Provider value={true}>
      <div
        data-slot="input-group-control"
        className={cn('flex min-w-0 flex-1 items-stretch', className)}
        {...props}
      >
        {children}
      </div>
    </InputGroupControlContext.Provider>
  );
}

export function InputGroupText({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group-text"
      className={cn(
        'flex shrink-0 items-center justify-center gap-1.5 px-3 text-sm text-gray-600',
        className
      )}
      {...props}
    />
  );
}

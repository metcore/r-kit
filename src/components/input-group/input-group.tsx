import * as React from 'react';
import { cn, fieldHasError } from '../../lib/utils';
import { FormField } from '../form';
import { createContext, useContext } from 'react';
const groupHeight: Record<InputGroupSize, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
};

export type InputGroupSize = 'sm' | 'md' | 'lg';

export type InputGroupContextValue = {
  size: InputGroupSize;
};

const InputGroupContext = createContext<InputGroupContextValue | null>(null);

export const useInputGroup = () => useContext(InputGroupContext);

export interface InputGroupProps extends Omit<
  React.ComponentProps<'div'>,
  'size'
> {
  size?: InputGroupSize;
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
  const hasError = fieldHasError(errorMessages) ?? isError;

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
      <InputGroupContext.Provider value={{ size }}>
        <div
          data-slot="input-group"
          data-disabled={disabled || undefined}
          aria-disabled={disabled || undefined}
          className={cn(
            'flex w-full items-stretch overflow-hidden rounded-lg border bg-white transition-colors',
            groupHeight[size],
            hasError
              ? 'border-danger-500 focus-within:border-danger-500'
              : 'focus-within:border-primary-300 border-gray-200',
            disabled && 'pointer-events-none bg-gray-100 opacity-60',
            // divider antar-segmen
            '[&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-gray-200',
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

import * as React from 'react';
import { cn, fieldHasError } from '../../lib/utils';
import { inputVariants, type InputVariantProps } from './input-variants';
import { FormField } from '../form';
import { Icon, type IconNameProps } from '../icons';
import { useInputGroup } from '../input-group';

export type InputSize = NonNullable<InputVariantProps['size']>;
export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>, InputVariantProps {
  /**
   * @deprecated Jangan make ini, gunakan input group
   */
  leftAddon?: React.ReactNode;
  /**
   * @deprecated Jangan make ini, gunakan input group
   */
  rightAddon?: React.ReactNode;
  label?: string;
  hint?: string;
  errorMessages?: string | string[];
  inputSize?: number;
  description?: string;
  /**
   * @deprecated Jangan make ini, gunakan input group
   */
  leftAddonClassName?: string;
  /**
   * @deprecated Jangan make ini, gunakan input group
   */
  rightAddonClassName?: string;
  isError?: boolean;
  /**
   * @deprecated Jangan make ini, gunakan input group
   */
  mergedAddon?: boolean;
  onContainerResize?: (width: number) => void;
  icon?: IconNameProps;
  autoWidth?: boolean;
  tooltip?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      leftAddon,
      rightAddon,
      type = 'text',
      label,
      hint,
      errorMessages,
      size,
      inputSize,
      description,
      leftAddonClassName,
      rightAddonClassName,
      mergedAddon,
      isError,
      tooltip,
      onContainerResize,
      icon,
      autoWidth = false,
      // Dikeluarkan dari ...props supaya bisa di-set EKSPLISIT setelah spread.
      // Kalau dibiarkan di dalam {...props}, urutan spread bisa menimpa nilai
      // yang sudah dihitung (id/style) atau memblok propagasi (disabled).
      id,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    const group = useInputGroup();
    const inGroup = group !== null;

    // Precedence: prop di komponen > nilai dari InputGroup > default CVA ('md').
    const resolvedSize = size ?? group?.size;
    const isDisabled = disabled ?? group?.disabled ?? false;
    const hasError =
      fieldHasError(errorMessages) ?? isError ?? group?.hasError ?? false;

    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const fieldRef = React.useRef<HTMLDivElement | null>(null);

    // Sebelumnya: String(value ?? placeholder ?? undefined) -> kalau dua-duanya
    // kosong hasilnya string "undefined" (length 9), jadi autoWidth = 9ch padahal
    // input kosong. Sekarang fallback ke string kosong.
    const measureValue =
      props.value != null
        ? String(props.value)
        : props.placeholder != null
          ? String(props.placeholder)
          : '';
    const textLength = measureValue.length;

    React.useEffect(() => {
      if (!fieldRef.current || !onContainerResize) return;

      const ro = new ResizeObserver(([entry]) => {
        onContainerResize(entry.contentRect.width);
      });

      ro.observe(fieldRef.current);
      return () => ro.disconnect();
    }, [onContainerResize]);

    const mergedStyle: React.CSSProperties | undefined =
      autoWidth && measureValue
        ? { width: `${textLength}ch`, ...style }
        : style;

    const field = (
      <div
        className={cn(
          'flex items-stretch',
          inGroup
            ? 'min-w-0 flex-1 bg-transparent'
            : cn(
                'w-full overflow-hidden rounded-lg border bg-white',
                hasError
                  ? 'border-danger-500 focus-within:border-danger-500'
                  : 'focus-within:border-primary-300 border-gray-200'
              )
        )}
      >
        {icon && (
          <div className="flex items-center border-r border-gray-200 px-3 py-2">
            <Icon name={icon} size={22} className="text-gray-600" />
          </div>
        )}
        {Boolean(leftAddon) && (
          <div
            className={cn(
              leftAddonClassName,
              'flex items-center justify-center border-r border-gray-200 px-3',
              Boolean(mergedAddon) && 'border-r-0',
              hasError
                ? 'text-danger-500 border-danger-500'
                : 'border-gray-200 text-gray-600'
            )}
          >
            {leftAddon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          size={inputSize}
          {...props}
          id={inputId}
          disabled={isDisabled}
          required={false}
          style={mergedStyle}
          className={cn(
            inputVariants({ size: resolvedSize }),
            'font-metropolis w-full min-w-0! rounded-none border-none focus-visible:outline-none',
            Boolean(leftAddon) && 'pl-2',
            Boolean(rightAddon) && 'pr-2',
            Boolean(mergedAddon) && 'shadow-none',
            isDisabled && 'cursor-not-allowed bg-gray-100',
            className
          )}
        />

        {Boolean(rightAddon) && (
          <div
            className={cn(
              rightAddonClassName,
              'flex items-center justify-center border-l border-gray-200 px-3',
              hasError ? 'text-danger-500' : 'text-gray-600',
              Boolean(mergedAddon) && 'border-l-0'
            )}
          >
            {rightAddon}
          </div>
        )}
      </div>
    );

    if (inGroup) {
      return field;
    }

    return (
      <FormField
        ref={fieldRef}
        label={label}
        hint={hint}
        description={description}
        errorMessages={errorMessages}
        className={className}
        required={props.required}
        size={resolvedSize}
        style={autoWidth && measureValue ? { width: 'fit-content' } : undefined}
        htmlFor={inputId}
        tooltip={tooltip}
      >
        {field}
      </FormField>
    );
  }
);

Input.displayName = 'Input';

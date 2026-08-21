import * as React from 'react';
import { cn, fieldHasError } from '../../lib/utils';
import { FormField } from '../form';
import { Icon } from '../icons';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string;
  hint?: string;
  description?: string;
  errorMessages?: string | string[];
  tooltip?: string;
  clearAble?: boolean;
  onClear?: () => void;
  clearLabel?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      hint,
      description,
      errorMessages,
      tooltip,
      className,
      required = false,
      clearAble = false,
      onClear,
      clearLabel = 'Kosongkan isian',
      id,
      value,
      defaultValue,
      onChange,
      disabled = false,
      readOnly = false,
      ...props
    },
    ref
  ) {
    const hasError = fieldHasError(errorMessages);

    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const isControlled = value !== undefined;
    const [uncontrolledHasValue, setUncontrolledHasValue] = React.useState(
      () => String(defaultValue ?? '').length > 0
    );

    const hasValue = isControlled
      ? String(value ?? '').length > 0
      : uncontrolledHasValue;

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) {
          setUncontrolledHasValue(event.target.value.length > 0);
        }
        onChange?.(event);
      },
      [isControlled, onChange]
    );

    const handleClear = React.useCallback(() => {
      const textarea = innerRef.current;
      if (!textarea) return;

      const nativeValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set;

      nativeValueSetter?.call(textarea, '');
      textarea.dispatchEvent(new Event('input', { bubbles: true }));

      textarea.focus();
      onClear?.();
    }, [onClear]);

    const showClear = clearAble && !disabled && !readOnly && hasValue;

    return (
      <FormField
        label={label}
        htmlFor={textareaId}
        hint={hint}
        description={description}
        errorMessages={errorMessages}
        className={className}
        required={required}
        tooltip={tooltip}
      >
        <div className="relative w-full">
          <textarea
            ref={setRefs}
            required={false}
            id={textareaId}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            disabled={disabled}
            readOnly={readOnly}
            className={cn(
              'aria-invalid:ring-danger-500 aria-invalid:border-danger-500 focus-visible:ring-primary-300 flex field-sizing-content min-h-30 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-base font-medium text-gray-800 outline-none placeholder:text-gray-500 focus-visible:border-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 md:text-sm',
              hasError ? 'ring-danger-500 border-danger-500' : '',
              clearAble ? 'pr-10' : '',
              className
            )}
            {...props}
          />

          {showClear && (
            <button
              type="button"
              aria-label={clearLabel}
              title={clearLabel}
              onClick={handleClear}
              className="focus-visible:ring-primary-300 absolute top-2 right-2 flex cursor-pointer items-center justify-center rounded-full bg-transparent p-0.5 text-gray-700 focus-visible:ring-1 focus-visible:outline-none"
            >
              <Icon name="times-circle" size={18} />
            </button>
          )}
        </div>
      </FormField>
    );
  }
);

export { Textarea };

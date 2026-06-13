import React, { createContext, useContext, useId } from 'react';
import type { RadioProps, RadioGroupProps, SizeType, ColorType } from './type';
import { RadioVariants, RadioIndicatorVariants } from './radio-variants';
import { cn } from '../../lib/utils';
import {
  FormDescription,
  FormErrorMessages,
  FormField,
  FormHint,
  FormLabel,
} from '../form';
import { useInputGroup } from '../input-group';

export type RadioButtonValue = string | number | boolean;
interface RadioGroupContextValue {
  value?: RadioButtonValue;
  onValueChange?: (value: RadioButtonValue) => void;
  disabled?: boolean;
  name?: string;
  size?: SizeType;
  color?: ColorType;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined
);

export const RadioGroup: React.FC<
  RadioGroupProps & {
    label?: string;
    hint?: string;
    description?: string;
    errorMessages?: string | string[];
    direction?: 'horizontal' | 'vertical';
    tooltip?: string;
    onChange?: (value: RadioButtonValue) => void;
  }
> = ({
  value,
  defaultValue,
  onValueChange,
  onChange,
  disabled = false,
  required = false,
  name,
  size = 'md',
  color = 'primary',
  className,
  label,
  hint,
  description,
  errorMessages,
  direction = 'vertical',
  children,
  tooltip,
}) => {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? value ?? ''
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: RadioButtonValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    onChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        disabled,
        name,
        size,
        color,
      }}
    >
      <FormField
        label={label}
        tooltip={tooltip}
        hint={hint}
        description={description}
        errorMessages={errorMessages}
        className={className}
        required={required}
        size={size}
      >
        <div
          role="radiogroup"
          aria-required={required}
          className={cn(
            'flex gap-4',
            direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
          )}
        >
          {children}
        </div>
      </FormField>
    </RadioGroupContext.Provider>
  );
};

export const BaseRadio: React.FC<
  RadioProps & {
    onChange?: (checked: boolean) => void;
  }
> = ({
  id: providedId,
  value,
  checked,
  disabled: disabledProp = false,
  required = false,
  size: sizeProp,
  color: colorProp,
  onCheckedChange,
  onChange,
  className,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(
    checked ?? false
  );
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const context = useContext(RadioGroupContext);
  const isControlled = checked !== undefined;
  const isChecked = context
    ? context.value === value
    : isControlled
      ? (checked ?? false)
      : internalChecked;

  const disabled = disabledProp || context?.disabled != false || false;
  const name = context?.name;
  const size = sizeProp ?? context?.size ?? 'md';
  const color = colorProp ?? context?.color ?? 'primary';

  const handleChange = () => {
    if (disabled) return;

    if (context != undefined && value !== undefined) {
      context.onValueChange?.(value);
    } else {
      if (!isControlled) {
        setInternalChecked(true);
      }
      onCheckedChange?.(true);
      onChange?.(true);
    }
  };

  const disabledColorClass: Record<string, string> = {
    primary: 'bg-primary-100 border-primary-200',
    success: 'bg-success-100 border-success-200',
    danger: 'bg-danger-100 border-danger-200',
    info: 'bg-info-100 border-info-200',
    warning: 'bg-warning-100 border-warning-200',
    orange: 'bg-orange-100 border-orange-200',
    purple: 'bg-purple-100 border-purple-200',
    gray: 'bg-gray-100 border-gray-200',
  };

  return (
    <button
      type="button"
      role="radio"
      id={id}
      aria-checked={isChecked}
      aria-required={required}
      disabled={disabled}
      onClick={handleChange}
      className={cn(
        RadioVariants({ size, color }),
        isChecked == false && 'border-gray-300',
        'bg-white',
        disabled && 'cursor-not-allowed',
        disabled && disabledColorClass[color],
        !disabled && 'hover:border-opacity-80 cursor-pointer',
        className
      )}
    >
      {Boolean(name) && (
        <input
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          onChange={() => {}}
          className="sr-only"
          disabled={disabled}
          required={required}
        />
      )}

      <span
        className={cn(
          RadioIndicatorVariants({ size, color }),
          isChecked == true ? 'scale-100' : 'scale-0 bg-transparent'
        )}
      />
    </button>
  );
};

export const Radio: React.FC<
  RadioProps & {
    label?: string;
    description?: string;
    hint?: string;
    errorMessages?: string | string[];
    tooltip?: string;
    onChange?: (checked: boolean) => void;
  }
> = ({
  label,
  description,
  hint,
  errorMessages,
  className,
  size: sizeProp,
  tooltip,
  ...props
}) => {
  const generatedId = useId();
  const id = props.id ?? generatedId;
  const context = useContext(RadioGroupContext);
  const size = sizeProp ?? context?.size ?? null;

  const isInGroup = !!context;
  const showHintAndError = !isInGroup;

  const hasError = Boolean(errorMessages);
  const group = useInputGroup();
  const inGroup = group !== null;
  const resolvedSize = size ?? group?.size;
  return (
    <div
      className={cn(
        'flex flex-col',
        inGroup && 'h-full items-center justify-center',
        className
      )}
    >
      <div className={cn('inline-flex gap-2')}>
        <BaseRadio {...props} id={id} size={resolvedSize} />

        <div className={cn('flex flex-col')}>
          {label !== undefined && (
            <FormLabel
              htmlFor={id}
              size={size}
              tooltip={tooltip}
              className={cn('cursor-pointer')}
            >
              {label}
            </FormLabel>
          )}

          {description !== undefined && (
            <FormDescription size={size}>{description}</FormDescription>
          )}
        </div>
      </div>

      {showHintAndError && hint !== undefined && (
        <FormHint className="mt-1 ml-6">{hint}</FormHint>
      )}

      {hasError && <FormErrorMessages messages={errorMessages} size={size} />}
    </div>
  );
};

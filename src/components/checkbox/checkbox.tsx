import React, { createContext, useContext, useId } from "react";
import type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxGroupContextValue,
} from "./type";
import {
  CheckboxVariants,
  CheckboxIndicatorVariants,
} from "./checkbox-variants";
import { cn } from "../../lib/utils";
import {
  FormDescription,
  FormErrorMessages,
  FormField,
  FormHint,
  FormLabel,
} from "../form";

const CheckboxGroupContext = createContext<
  CheckboxGroupContextValue | undefined
>(undefined);

export const CheckboxGroup: React.FC<
  CheckboxGroupProps & {
    label?: string;
    hint?: string;
    description?: string;
    errorMessages?: string | string[];
    direction?: "horizontal" | "vertical";
  }
> = ({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  required = false,
  name,
  size = "md",
  color = "primary",
  icon = "check",
  className,
  label,
  hint,
  description,
  errorMessages,
  direction = "vertical",
  children,
}) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    defaultValue || value || [],
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: string[]) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <CheckboxGroupContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        disabled,
        name,
        size,
        color,
        icon,
      }}
    >
      <FormField
        label={label}
        hint={hint}
        description={description}
        errorMessages={errorMessages}
        className={className}
        required={required}
        size={size}
      >
        <div
          role="group"
          aria-required={required}
          className={cn(
            "flex gap-4",
            direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
          )}
        >
          {children}
        </div>
      </FormField>
    </CheckboxGroupContext.Provider>
  );
};

export const BaseCheckbox: React.FC<CheckboxProps> = ({
  id: providedId,
  value,
  checked,
  disabled: disabledProp = false,
  required = false,
  size: sizeProp,
  color: colorProp,
  icon: iconProp,
  onCheckedChange,
  className,
}) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  const context = useContext(CheckboxGroupContext);

  const isChecked = context
    ? context.value?.includes(value || "")
    : checked || false;
  const disabled = disabledProp || context?.disabled || false;
  const name = context?.name;
  const size = sizeProp || context?.size || "md";
  const color = colorProp || context?.color || "primary";
  const icon = iconProp || context?.icon || "check";

  const handleChange = () => {
    if (disabled) return;

    if (context && value) {
      const currentValues = context.value || [];
      const newValues = isChecked
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      context.onValueChange?.(newValues);
    } else {
      onCheckedChange?.(!isChecked);
    }
  };

  const disabledColorClass: Record<string, string> = {
    primary: "bg-primary-100 border-primary-200",
    success: "bg-success-100 border-success-200",
    danger: "bg-danger-100 border-danger-200",
    info: "bg-info-100 border-info-200",
    warning: "bg-warning-100 border-warning-200",
    orange: "bg-orange-100 border-orange-200",
    purple: "bg-purple-100 border-purple-200",
    gray: "bg-gray-100 border-gray-200",
  };

  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={isChecked}
      aria-required={required}
      disabled={disabled}
      onClick={handleChange}
      className={cn(
        CheckboxVariants({ size, color, checked: isChecked }),
        disabled && "cursor-not-allowed",
        disabled && disabledColorClass[color],
        !disabled && "hover:border-opacity-80 cursor-pointer",
        className,
      )}
    >
      {name && (
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          onChange={() => {}}
          className="sr-only"
          disabled={disabled}
          required={required}
        />
      )}

      {/* Checkbox indicator */}
      {isChecked && (
        <>
          {icon === "check" ? (
            <svg
              className={CheckboxIndicatorVariants({ size, color, icon })}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3334 4L6.00002 11.3333L2.66669 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              className={CheckboxIndicatorVariants({ size, color, icon })}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </>
      )}
    </button>
  );
};

// Checkbox with Label Component
export const Checkbox: React.FC<
  CheckboxProps & {
    label?: string;
    description?: string;
    hint?: string;
    errorMessages?: string | string[];
    vertical?: boolean;
  }
> = ({
  label,
  description,
  hint,
  errorMessages,
  className,
  size: sizeProp,
  icon: iconProp,
  vertical,
  ...props
}) => {
  const generatedId = useId();
  const id = props.id || generatedId;
  const context = useContext(CheckboxGroupContext);
  const size = sizeProp || context?.size || "md";
  const icon = iconProp || context?.icon || "check";

  // Jika dalam group, tidak perlu hint dan error di level individual
  const isInGroup = !!context;
  const showHintAndError = !isInGroup;

  const hasError = Boolean(errorMessages) && showHintAndError;
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "inline-flex items-center gap-2",
          vertical && "flex-col justify-center",
        )}
      >
        <BaseCheckbox {...props} id={id} size={size} icon={icon} />

        <div className={cn("flex flex-col", vertical && "items-center")}>
          {label && (
            <FormLabel htmlFor={id} className={cn("cursor-pointer")}>
              {label}
            </FormLabel>
          )}

          {description && <FormDescription>{description}</FormDescription>}
        </div>
      </div>

      {showHintAndError && hint && (
        <FormHint className="mt-1 ml-6">{hint}</FormHint>
      )}

      {hasError && (
        <FormErrorMessages messages={errorMessages} className="mt-1 ml-6" />
      )}
    </div>
  );
};

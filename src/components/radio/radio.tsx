import React, { createContext, useContext, useId } from "react";
import type { RadioProps, RadioGroupProps, SizeType, ColorType } from "./type";
import { RadioVariants, RadioIndicatorVariants } from "./radio-variants";
import { cn } from "../../lib/utils";
import { FormDescription, FormField, FormLabel } from "../form";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  size?: SizeType;
  color?: ColorType;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined,
);

// Radio Group Component
export const RadioGroup: React.FC<
  RadioGroupProps & {
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
  className,
  label,
  hint,
  description,
  errorMessages,
  direction = "vertical",
  children,
}) => {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue || value || "",
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
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
            "flex gap-4",
            direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
          )}
        >
          {children}
        </div>
      </FormField>
    </RadioGroupContext.Provider>
  );
};

// Radio Component
export const BaseRadio: React.FC<RadioProps> = ({
  id: providedId,
  value,
  checked,
  disabled: disabledProp = false,
  required = false,
  size: sizeProp,
  color: colorProp,
  onCheckedChange,
  className,
}) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  const context = useContext(RadioGroupContext);

  const isChecked = context ? context.value === value : checked || false;
  const disabled = disabledProp || context?.disabled || false;
  const name = context?.name;
  const size = sizeProp || context?.size || "md";
  const color = colorProp || context?.color || "primary";

  const handleChange = () => {
    if (disabled) return;

    if (context) {
      context.onValueChange?.(value);
    } else {
      onCheckedChange?.(!isChecked);
    }
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
        !isChecked && "border-gray-300",
        disabled && "cursor-not-allowed opacity-50",
        !disabled && "hover:border-opacity-80 cursor-pointer",
        "bg-white",
        className,
      )}
    >
      {/* Hidden input for form compatibility */}
      {name && (
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

      {/* Radio indicator */}
      <span
        className={cn(
          RadioIndicatorVariants({ size, color }),
          isChecked ? "scale-100" : "scale-0 bg-transparent",
        )}
      />
    </button>
  );
};

// Radio with Label Component
export const Radio: React.FC<
  RadioProps & {
    label?: string;
    description?: string;
  }
> = ({ label, description, className, size: sizeProp, ...props }) => {
  const generatedId = useId();
  const id = props.id || generatedId;
  const context = useContext(RadioGroupContext);
  const size = sizeProp || context?.size || "md";

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <BaseRadio {...props} id={id} size={size} />

      <div className="flex flex-col">
        {label && (
          <FormLabel htmlFor={id} className={labelSizeClasses[size]}>
            {label}
          </FormLabel>
        )}

        {description && <FormDescription>{description}</FormDescription>}
      </div>
    </div>
  );
};

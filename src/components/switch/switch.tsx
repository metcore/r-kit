import React, { useId } from "react";
import type { SwitchProps } from "./type";
import { SwitchVariants, SwitchThumbVariants } from "./switch-variants";
import { cn } from "../../lib/utils";
import { FormField, FormLabel } from "../form";

export const BaseSwitch: React.FC<SwitchProps> = ({
  id: providedId,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  required = false,
  name,
  size = "md",
  color = "primary",
  className,
}) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked || checked || false,
  );

  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={isChecked}
      aria-required={required}
      disabled={disabled}
      onClick={handleToggle}
      data-state={isChecked ? "checked" : "unchecked"}
      className={cn(
        SwitchVariants({ size, color }),
        !isChecked && "bg-gray-400",
        disabled && "cursor-not-allowed opacity-50",
        !disabled && "cursor-pointer hover:opacity-90",
        className,
      )}
    >
      {/* Hidden input for form compatibility */}
      {name && (
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={() => {}}
          className="sr-only"
          disabled={disabled}
          required={required}
        />
      )}

      {/* Switch thumb */}
      <span
        data-state={isChecked ? "checked" : "unchecked"}
        className={SwitchThumbVariants({ size })}
      />
    </button>
  );
};

export const Switch: React.FC<
  SwitchProps & {
    label?: string;
    description?: string;
    errorMessages?: string | string[];
    hint?: string;
    direction?:
      | "horizontal"
      | "vertical"
      | "horizontal-reverse"
      | "vertical-reverse";
  }
> = ({
  label,
  hint,
  className,
  size = "md",
  direction = "horizontal",
  errorMessages,
  ...props
}) => {
  const generatedId = useId();
  const id = props.id || generatedId;

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-base",
  };

  return (
    <FormField hint={hint} errorMessages={errorMessages} className={className}>
      <div
        className={cn(
          "flex flex-col items-center gap-2",
          direction === "horizontal" && "inline-flex flex-row-reverse items-center justify-end", //prettier-ignore
          direction === "horizontal-reverse" && "inline-flex flex-row items-center justify-start text-end", //prettier-ignore
          direction === "vertical-reverse" && "inline-flex flex-col-reverse items-center", //prettier-ignore
        )}
      >
        {label && (
          <FormLabel htmlFor={id} className={labelSizeClasses[size]}>
            {label}
          </FormLabel>
        )}
        <BaseSwitch {...props} id={id} size={size} />
      </div>
    </FormField>
  );
};

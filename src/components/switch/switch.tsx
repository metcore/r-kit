import React, { useId } from "react";
import type { SwitchProps } from "./type";
import { SwitchVariants, SwitchThumbVariants } from "./switch-variants";
import { cn } from "../../lib/utils";

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
    direction?: "horizontal" | "vertical";
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
    md: "text-sm",
    lg: "text-base",
  };

  const hasError = Boolean(errorMessages);

  const errorList = Array.isArray(errorMessages)
    ? errorMessages
    : errorMessages
      ? [errorMessages]
      : [];

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "flex flex-col gap-2",
          direction === "horizontal" &&
            "inline-flex flex-row-reverse items-center justify-end",
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              labelSizeClasses[size],
              "block text-xs font-semibold text-gray-900",
            )}
          >
            {label}
          </label>
        )}
        <BaseSwitch {...props} id={id} size={size} />
      </div>
      {hint && <p className="mt-1 text-xs text-gray-700">{hint}</p>}

      {hasError && (
        <div className="mt-1 space-y-0.5">
          {errorList.map((msg, i) => (
            <p key={i} className="text-danger-500 text-xs">
              {msg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

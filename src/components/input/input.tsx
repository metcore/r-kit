import * as React from "react";
import { cn } from "../../lib/utils";
import { inputVariants, type InputVariantProps } from "./input-variants";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    InputVariantProps {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  label?: string;
  hint?: string;
  errorMessages?: string | string[];
  inputSize?: number;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      leftAddon,
      rightAddon,
      type = "text",
      label,
      hint,
      errorMessages,
      size,
      inputSize,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(errorMessages);

    const errorList = Array.isArray(errorMessages)
      ? errorMessages
      : errorMessages
      ? [errorMessages]
      : [];

    return (
      <div>
        {label && (
          <label
            {...(props.id && { htmlFor: props.id })}
            className="mb-1 block text-xs font-semibold text-gray-900"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex items-stretch w-full rounded-lg border bg-white",
            hasError
              ? "border-danger-500 focus-within:border-danger-500"
              : "border-gray-200 focus-within:border-primary-300"
          )}
        >
          {leftAddon && (
            <div
              className={cn(
                "px-3 flex items-center justify-center border-r",
                hasError
                  ? "text-danger-500 border-danger-500"
                  : "text-gray-600 border-gray-200"
              )}
            >
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            size={inputSize}
            className={cn(
              inputVariants({ size }),
              "border-none rounded-none focus-visible:outline-none w-full",
              leftAddon && "pl-2",
              rightAddon && "pr-2",
              props.disabled && "cursor-not-allowed bg-gray-100",
              className
            )}
            {...props}
          />

          {rightAddon && (
            <div
              className={cn(
                "px-3 flex items-center justify-center",
                hasError ? "text-danger-500" : "text-gray-600"
              )}
            >
              {rightAddon}
            </div>
          )}
        </div>

        {hint && <p className="mt-1 text-xs text-gray-700">{hint}</p>}

        {hasError && (
          <div className="mt-1 space-y-0.5">
            {errorList.map((msg, i) => (
              <p key={i} className="text-xs text-danger-500">
                {msg}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

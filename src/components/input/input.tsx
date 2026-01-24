import * as React from "react";
import { cn, fieldHasError } from "../../lib/utils";
import { inputVariants, type InputVariantProps } from "./input-variants";
import { FormField } from "../form";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">, InputVariantProps {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  label?: string;
  hint?: string;
  errorMessages?: string | string[];
  inputSize?: number;
  description?: string;
  leftAddonClassName?: string;
  rightAddonClassName?: string;
  isError?: boolean;
  mergedAddon?: boolean;
  onContainerResize?: (width: number) => void;
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
      description,
      leftAddonClassName,
      rightAddonClassName,
      mergedAddon,
      isError,
      onContainerResize,
      ...props
    },
    ref,
  ) => {
    const hasError = fieldHasError(errorMessages) || isError;
    const generatedId = React.useId();
    const fieldRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (!fieldRef.current || !onContainerResize) return;

      const ro = new ResizeObserver(([entry]) => {
        onContainerResize(entry.contentRect.width);
      });

      ro.observe(fieldRef.current);
      return () => ro.disconnect();
    }, [onContainerResize]);

    return (
      <FormField
        ref={fieldRef}
        label={label}
        hint={hint}
        description={description}
        errorMessages={errorMessages}
        className={className}
        required={props.required}
        size={size}
        htmlFor={props?.id || generatedId}
      >
        <div
          className={cn(
            "flex w-full items-stretch rounded-lg border bg-white",
            hasError
              ? "border-danger-500 focus-within:border-danger-500"
              : "focus-within:border-primary-300 border-gray-200",
          )}
        >
          {leftAddon && (
            <div
              className={cn(
                leftAddonClassName,
                "flex items-center justify-center border-r border-gray-200 px-3",
                mergedAddon && "border-r-0",
                hasError
                  ? "text-danger-500 border-danger-500"
                  : "border-gray-200 text-gray-600",
              )}
            >
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            size={inputSize}
            id={props?.id || generatedId}
            className={cn(
              inputVariants({ size }),
              "font-metropolis w-full rounded-none border-none focus-visible:outline-none",
              leftAddon && "pl-2",
              rightAddon && "pr-2",
              props.disabled && "cursor-not-allowed bg-gray-100",
              className,
            )}
            {...props}
          />

          {rightAddon && (
            <div
              className={cn(
                rightAddonClassName,
                "flex items-center justify-center border-l border-gray-200 px-3",
                hasError ? "text-danger-500" : "text-gray-600",
                mergedAddon && "border-l-0",
              )}
            >
              {rightAddon}
            </div>
          )}
        </div>
      </FormField>
    );
  },
);

Input.displayName = "Input";

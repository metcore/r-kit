import * as React from "react";
import { cn, fieldHasError } from "../../lib/utils";
import { FormField } from "../form";
import { useId } from "react";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  hint?: string;
  description?: string;
  errorMessages?: string | string[];
}

function Textarea({
  label,
  hint,
  description,
  errorMessages,
  className,
  ...props
}: TextareaProps) {
  const hasError = fieldHasError(errorMessages);

  const generatedId = useId();
  return (
    <FormField
      label={label}
      htmlFor={props.id || generatedId}
      hint={hint}
      description={description}
      errorMessages={errorMessages}
      className={className}
      required={props.required}
    >
      <textarea
        id={props?.id || generatedId}
        className={cn(
          "aria-invalid:ring-danger-500 aria-invalid:border-danger-500 focus-visible:ring-primary-300 flex field-sizing-content min-h-30 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-base font-medium text-gray-800 shadow-xs transition-[color,box-shadow] outline-none placeholder:text-gray-500 focus-visible:border-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 md:text-sm",
          hasError ? "ring-danger-500 border-danger-500" : "",
          className,
        )}
        {...props}
      />
    </FormField>
  );
}

export { Textarea };

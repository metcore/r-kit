import * as React from "react";
import { Input } from "../input";
import { cn } from "../../lib/utils";
import { FormField } from "../form";

export interface InputOTPProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  hint?: string;
  description?: string;
  errorMessages?: string | string[];
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const InputOTP = ({
  length = 6,
  value,
  onChange,
  label,
  hint,
  description,
  errorMessages,
  disabled,
  className,
  size = "md",
}: InputOTPProps) => {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const values = React.useMemo(() => {
    const chars = value.split("");
    return Array.from({ length }, (_, i) => chars[i] ?? "");
  }, [value, length]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;

    const next = [...values];
    next[index] = char;
    onChange(next.join(""));

    if (char && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  return (
    <FormField
      label={label}
      hint={hint}
      className={className}
      errorMessages={errorMessages}
    >
      <div className="flex gap-2">
        {values.map((char, i) => (
          <Input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={char}
            disabled={disabled}
            inputMode="numeric"
            maxLength={1}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={cn("text-center", {
              "w-9": size === "sm",
              "w-10": size === "md",
              "w-11": size === "lg",
            })}
            size={size}
            description={i === 0 ? description : undefined}
            isError={!!errorMessages}
          />
        ))}
      </div>
    </FormField>
  );
};

InputOTP.displayName = "InputOTP";

import * as React from 'react';
import { Input } from '../input';
import { cn } from '../../lib/utils';
import { FormField } from '../form';

export type InputOTPType = 'numeric' | 'alphanumeric' | 'alphabetic';
export type InputOTPSize = 'sm' | 'md' | 'lg';

export interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  label?: string;
  hint?: string;
  description?: string;
  errorMessages?: string | string[];
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  mask?: boolean;
  type?: InputOTPType;
  separator?: React.ReactNode;
  groupSize?: number;
  name?: string;
  id?: string;
  ariaLabel?: (index: number, length: number) => string;
  className?: string;
  size?: InputOTPSize;
  tooltip?: string;
}

const PATTERNS: Record<InputOTPType, RegExp> = {
  numeric: /^[0-9]?$/,
  alphabetic: /^[a-zA-Z]?$/,
  alphanumeric: /^[a-zA-Z0-9]?$/,
};

const FULL_PATTERNS: Record<InputOTPType, RegExp> = {
  numeric: /[0-9]/g,
  alphabetic: /[a-zA-Z]/g,
  alphanumeric: /[a-zA-Z0-9]/g,
};

export const InputOTP = ({
  length = 6,
  value,
  onChange,
  onComplete,
  onBlur,
  onFocus,
  label,
  hint,
  description,
  errorMessages,
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  mask = false,
  type = 'numeric',
  separator,
  groupSize = 0,
  name,
  id,
  ariaLabel,
  className,
  size = 'md',
  tooltip,
}: InputOTPProps): React.ReactElement => {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const previousValueRef = React.useRef<string>(value ?? '');

  // Internal state handles in-progress display; onChange only fires when complete
  const [internalValue, setInternalValue] = React.useState<string>(value ?? '');

  const charPattern = PATTERNS[type];
  const fullPattern = FULL_PATTERNS[type];
  const hasError = Array.isArray(errorMessages)
    ? errorMessages.length > 0
    : typeof errorMessages === 'string' && errorMessages.length > 0;

  // Sync from controlled prop only on reset (empty) or externally-set complete value
  React.useEffect(() => {
    const normalized = value ?? '';
    if (normalized.length === 0 || normalized.length === length) {
      setInternalValue(normalized);
    }
  }, [value, length]);

  const values = React.useMemo<string[]>(() => {
    const chars = internalValue.split('');
    return Array.from({ length }, (_, i) => chars?.[i] ?? '');
  }, [internalValue, length]);

  React.useEffect(() => {
    if (
      internalValue.length === length &&
      previousValueRef.current != undefined &&
      previousValueRef.current.length !== length
    ) {
      onComplete?.(internalValue);
    }
    previousValueRef.current = internalValue;
  }, [internalValue, length, onComplete]);

  React.useEffect(() => {
    if (autoFocus && !disabled && !readOnly) {
      inputsRef.current[0]?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusInput = (index: number): void => {
    const target = inputsRef.current[index];
    target?.focus();
    target?.select();
  };

  const updateValue = (next: string[]): void => {
    const joined = next.join('');
    setInternalValue(joined);
    if (next.every((char) => char.length > 0)) {
      onChange?.(joined);
    }
  };

  const handleChange = (index: number, char: string): void => {
    if (readOnly) return;

    const cleaned = char.length > 1 ? char.slice(-1) : char;

    if (!charPattern.test(cleaned)) return;

    const next = [...values];
    next[index] = cleaned;
    updateValue(next);

    if (cleaned.length > 0 && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (readOnly) return;

    const currentChar = values[index] ?? '';

    switch (e.key) {
      case 'Backspace': {
        if (currentChar.length === 0 && index > 0) {
          e.preventDefault();
          const next = [...values];
          next[index - 1] = '';
          updateValue(next);
          focusInput(index - 1);
        } else if (currentChar.length > 0) {
          e.preventDefault();
          const next = [...values];
          next[index] = '';
          updateValue(next);
        }
        break;
      }
      case 'Delete': {
        e.preventDefault();
        const next = [...values];
        next[index] = '';
        updateValue(next);
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (index > 0) focusInput(index - 1);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (index < length - 1) focusInput(index + 1);
        break;
      }
      case 'Home': {
        e.preventDefault();
        focusInput(0);
        break;
      }
      case 'End': {
        e.preventDefault();
        focusInput(length - 1);
        break;
      }
      default:
        break;
    }
  };

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ): void => {
    if (readOnly || disabled) return;

    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const matches = pasted.match(fullPattern);

    if (matches === null || matches.length === 0) return;

    const next = [...values];
    let writeIndex = index;

    for (const ch of matches) {
      if (writeIndex >= length) break;
      next[writeIndex] = ch;
      writeIndex++;
    }

    updateValue(next);
    const focusTarget = Math.min(writeIndex, length - 1);
    focusInput(focusTarget);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.select();
    onFocus?.();
  };

  const inputMode: 'numeric' | 'text' = type === 'numeric' ? 'numeric' : 'text';
  const autoCompleteValue = 'one-time-code';

  const shouldShowSeparator = (index: number): boolean => {
    if (separator === undefined || separator === null || groupSize <= 0) {
      return false;
    }
    return (index + 1) % groupSize === 0 && index < length - 1;
  };

  return (
    <FormField
      label={label}
      hint={hint}
      className={className}
      errorMessages={errorMessages}
      required={required}
      tooltip={tooltip}
    >
      <div
        className="flex items-center gap-2"
        role="group"
        aria-label={label ?? 'Verification code'}
      >
        {name !== undefined && name.length > 0 && (
          <input type="hidden" name={name} value={value} required={required} />
        )}

        {values.map((char, i) => {
          const displayValue = mask && char.length > 0 ? '•' : char;
          console.log(displayValue);
          const inputId = i === 0 ? fieldId : `${fieldId}-${i}`;
          const computedAriaLabel =
            ariaLabel !== undefined
              ? ariaLabel(i, length)
              : `Digit ${i + 1} of ${length}`;

          return (
            <React.Fragment key={i}>
              <Input
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                id={inputId}
                value={char}
                disabled={disabled}
                readOnly={readOnly}
                required={required && i === 0}
                inputMode={inputMode}
                autoComplete={i === 0 ? autoCompleteValue : 'off'}
                maxLength={1}
                type={mask ? 'password' : 'text'}
                aria-label={computedAriaLabel}
                aria-invalid={hasError}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={(e) => handlePaste(i, e)}
                onFocus={handleFocus}
                onBlur={onBlur}
                className={cn('text-center', {
                  'w-9': size === 'sm',
                  'w-10': size === 'md',
                  'w-11': size === 'lg',
                })}
                size={size}
                description={i === 0 ? description : undefined}
                isError={hasError}
              />
              {shouldShowSeparator(i) && (
                <span
                  className="text-muted-foreground select-none"
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </FormField>
  );
};

InputOTP.displayName = 'InputOTP';

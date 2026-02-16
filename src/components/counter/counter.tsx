import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import { Icon } from "../icons";
import { Input } from "../input";
import { counterVariants } from "./counter-variants";
import {
  handleDecrement,
  handleIncrement,
  handleInputChange,
  handleKeyDown,
} from "./helpers";
import type { ButtonIconProps, CounterProps } from "./type";

const Counter = ({
  iconLeft,
  iconRight,
  className,
  canMinus,
  inputWidth,
  disabled,
  variant = "primary",
  size = "md",

  value: externalValue,
  defaultValue = "0",
  onChange,
}: CounterProps) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue);

  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;

  const updateValue = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-hidden rounded-lg px-1",
        counterVariants({ variant, size, height: size }),
        disabled && "cursor-not-allowed",
        className,
      )}
    >
      {/* Tombol kiri (custom atau default minus) */}
      {iconLeft && (
        <button
          className="cursor-pointer"
          disabled={(!canMinus && value === "0") || disabled}
          onClick={() =>
            handleDecrement({ value, valueUpdater: updateValue, canMinus })
          }
        >
          {iconLeft}
        </button>
      )}
      {!iconLeft && (
        <ButtonIcon
          icon={"minus"}
          iconClassName={cn(counterVariants({ controlIconSize: size }))}
          disabled={(!canMinus && value === "0") || disabled}
          onClick={() =>
            handleDecrement({ value, valueUpdater: updateValue, canMinus })
          }
          variant={variant}
        />
      )}

      {/* Input field */}
      <div className="translate-x-px">
        <Input
          type="text"
          value={value}
          onChange={(e) => handleInputChange({ e, valueUpdater: updateValue })}
          className={cn(
            "appearance-none truncate bg-transparent px-1.5 py-0 text-center *:border-0",
            counterVariants({ size }),
            disabled && "opacity-50",
          )}
          disabled={disabled}
          onKeyDown={(e) =>
            handleKeyDown({ e, value, canMinus, valueUpdater: updateValue })
          }
          style={{
            width: inputWidth || `${Math.max(value.length, 1) + 1.2}ch`,
          }}
        />
      </div>

      {/* Tombol kanan (custom atau default plus) */}
      {iconRight && (
        <button
          disabled={disabled}
          className="cursor-pointer"
          onClick={() => handleIncrement({ value, valueUpdater: updateValue })}
        >
          {iconRight}
        </button>
      )}
      {!iconRight && (
        <ButtonIcon
          disabled={disabled}
          icon={"plus"}
          iconClassName={cn(counterVariants({ controlIconSize: size }))}
          onClick={() => handleIncrement({ value, valueUpdater: updateValue })}
          variant={variant}
        />
      )}
    </div>
  );
};

const ButtonIcon = ({
  icon,
  disabled,
  onClick,
  variant,
  iconClassName,
}: ButtonIconProps) => {
  return (
    <Button
      size={"icon"}
      className={cn(
        "w-fit rounded-full",
        variant === "secondary" && "bg-tansparent hover:bg-transparent focus:ring-0", //prettier-ignore
        variant == "primary" && disabled && "bg-gray-400!",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon
        name={icon}
        className={cn(
          "size-4",
          variant === "secondary" && "text-gray-600",
          iconClassName,
        )}
      />
    </Button>
  );
};

export { Counter };

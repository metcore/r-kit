import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Input } from '../input';
import { counterVariants } from './counter-variants';
import {
  handleDecrement,
  handleIncrement,
  handleInputChange,
  handleKeyDown,
} from './helpers';
import type { CounterProps } from './type';
import { ButtonIcon } from '../button-icon/button-icon';

type CounterSize = 'sm' | 'md' | 'lg';
type ButtonIconSize = 'xxs' | 'xs' | 'md';

const buttonSizeMap: Record<CounterSize, ButtonIconSize> = {
  sm: 'xxs',
  md: 'xs',
  lg: 'md',
};
const Counter = ({
  iconLeft,
  iconRight,
  className,
  allowMinus,
  inputWidth,
  disabled,
  variant = 'primary',
  size = 'md',

  value: externalValue,
  defaultValue = '0',
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
        'flex items-center gap-2 overflow-hidden rounded-lg px-1',
        counterVariants({ variant, size, height: size }),
        disabled === true && 'cursor-not-allowed',
        className
      )}
    >
      {iconLeft !== undefined && (
        <button
          className="cursor-pointer"
          disabled={(allowMinus === false && value === '0') || disabled}
          onClick={() =>
            handleDecrement({ value, valueUpdater: updateValue, allowMinus })
          }
        >
          {iconLeft}
        </button>
      )}
      {iconLeft === undefined && (
        <ButtonIcon
          icon={'minus'}
          size={buttonSizeMap[size]}
          disabled={(allowMinus === false && value === '0') || disabled}
          onClick={() =>
            handleDecrement({ value, valueUpdater: updateValue, allowMinus })
          }
          rounded
          variant="default"
        />
      )}

      {/* Input field */}
      <div className="translate-x-px">
        <Input
          type="text"
          value={value}
          onChange={(e) => handleInputChange({ e, valueUpdater: updateValue })}
          className={cn(
            'appearance-none truncate bg-transparent px-1.5 py-0 text-center *:border-0',
            counterVariants({ size }),
            disabled === true && 'opacity-50'
          )}
          disabled={disabled}
          onKeyDown={(e) =>
            handleKeyDown({ e, value, allowMinus, valueUpdater: updateValue })
          }
          style={{
            width: inputWidth ?? `${Math.max(value.length, 1) + 1.2}ch`,
          }}
        />
      </div>

      {/* Tombol kanan (custom atau default plus) */}
      {Boolean(iconRight) === true && (
        <button
          disabled={disabled}
          className="cursor-pointer"
          onClick={() => handleIncrement({ value, valueUpdater: updateValue })}
        >
          {iconRight}
        </button>
      )}
      {Boolean(iconRight) === false && (
        <ButtonIcon
          disabled={disabled}
          icon={'plus'}
          onClick={() => handleIncrement({ value, valueUpdater: updateValue })}
          variant="default"
          size={buttonSizeMap[size]}
          rounded
        />
      )}
    </div>
  );
};

export { Counter };

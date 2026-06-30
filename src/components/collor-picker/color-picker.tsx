import { Input } from '../input';
import { InputGroup, InputGroupControl, InputGroupText } from '../input-group';
import { BaseColorPicker } from './base-color-picker';
import { CHECKER } from './constants';
import type { ColorInputProps } from './type';

export default function ColorInput({
  label,
  required,
  disabled,
  hint,
  size = 'md',
  tooltip,
  errorMessages,
  placeholder,
  onChange,
  value,
}: ColorInputProps) {
  return (
    <BaseColorPicker onChange={onChange} value={value}>
      {({ toggle, rgb, alpha, display, hasValue }) => {
        const InputColorDisplay = (): React.ReactElement => (
          <button
            type="button"
            onClick={toggle}
            className="block h-6.5 w-6.5 shrink-0 cursor-pointer rounded-md p-0"
            style={{ ...CHECKER, backgroundSize: '8px 8px' }}
          >
            <span
              className="block h-full w-full rounded-[5px]"
              style={{
                background: hasValue
                  ? `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
                  : 'transparent',
              }}
            />
          </button>
        );

        return (
          <InputGroup
            label={label}
            required={required}
            disabled={disabled}
            hint={hint}
            size={size}
            tooltip={tooltip}
            errorMessages={errorMessages}
          >
            <InputGroupControl>
              <Input
                placeholder={placeholder}
                onClick={toggle}
                className="cursor-pointer"
                size={size}
                value={display}
                readOnly
              />
            </InputGroupControl>
            <InputGroupText>
              <InputColorDisplay />
            </InputGroupText>
          </InputGroup>
        );
      }}
    </BaseColorPicker>
  );
}

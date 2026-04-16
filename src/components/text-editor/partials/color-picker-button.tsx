import clsx from 'clsx';
import { Icon } from '../../icons';
import type { ColorPickerButtonProps } from '../type';

export default function ColorPickerButton({
  id,
  icon,
  color,
  disabled = false,
  onChange,
}: ColorPickerButtonProps) {
  return (
    <label htmlFor={id} className="relative">
      <div
        className={clsx(
          'flex items-center gap-1 rounded-lg border border-gray-300 p-2',
          disabled && 'opacity-50'
        )}
      >
        <div className="flex flex-col">
          <Icon name={icon} size={18} />
          <div
            className="h-1 w-full border border-gray-100"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
      <input
        id={id}
        type="color"
        className="invisible absolute inset-0 size-5 cursor-pointer rounded-lg disabled:opacity-50"
        value={color}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

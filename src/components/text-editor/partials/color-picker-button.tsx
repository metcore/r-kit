import clsx from 'clsx';
import { Icon } from '../../icons';
import type { ColorPickerButtonProps } from '../type';
import { BaseColorPicker } from '../../collor-picker/base-color-picker';

export default function ColorPickerButton({
  icon,
  color,
  disabled = false,
  onChange,
}: ColorPickerButtonProps) {
  return (
    <BaseColorPicker
      defaultColor={color}
      onChange={(val) => onChange(val?.hex)}
    >
      {() => {
        return (
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
        );
      }}
    </BaseColorPicker>
  );
}

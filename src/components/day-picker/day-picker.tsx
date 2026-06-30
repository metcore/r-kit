import { Chip } from '../chip';
import { type InputSize } from '../input';
import { dayOptions } from '../base/helpers/date';
import {
  PickerBase,
  PickerFooter,
  PickerHeader,
  buildDisplayValue,
  usePickerState,
  type PickerMode,
  type PickerValue,
} from '../base/components/picker-base';

type DayPickerMode = PickerMode;
type DayPickerValue = PickerValue;

interface DayPickerProps {
  mode?: DayPickerMode;
  defaultValue?: DayPickerValue;
  onChange?: (value: DayPickerValue) => void;
  onApply?: (value: DayPickerValue) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: InputSize;
  label?: string;
  hint?: string;
  description?: string;
  errorMessages?: string | string[];
  direction?: 'horizontal' | 'vertical';
  tooltip?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  title?: string;
}

const DAY_OPTIONS = dayOptions();

const DAY_LABEL: Record<number, string> = Object.fromEntries(
  DAY_OPTIONS.map(({ value, label }) => [value, label])
);

export const DayPicker: React.FC<DayPickerProps> = ({
  mode = 'single',
  defaultValue,
  onChange,
  onApply,
  placeholder,
  disabled = false,
  required = false,
  size = 'md',
  label,
  hint,
  errorMessages,
  tooltip,
  cancelLabel = 'Batalkan',
  confirmLabel = 'Terapkan',
  title,
}) => {
  const {
    open,
    setOpen,
    committedSingle,
    committedRange,
    committedMultiple,
    handleOpen,
    handleSelect,
    isSelected,
    handleApply,
    handleCancel,
  } = usePickerState({ mode, defaultValue, onChange, onApply, disabled });

  const displayValue = buildDisplayValue(
    mode,
    committedSingle,
    committedRange,
    committedMultiple,
    (v) => DAY_LABEL[v] ?? ''
  );

  return (
    <PickerBase
      open={open}
      onOpenChange={setOpen}
      onOpen={handleOpen}
      displayValue={displayValue}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      size={size}
      label={label}
      hint={hint}
      errorMessages={errorMessages}
      tooltip={tooltip}
      renderHeader={title == null ? <PickerHeader title="Day" /> : undefined}
      renderOptions={
        <div className="grid grid-cols-2 gap-2">
          {DAY_OPTIONS.map(({ value: dayVal, label: dayLabel }) => (
            <Chip
              key={dayVal}
              onClick={() => handleSelect(dayVal)}
              className="px-6"
              selected={isSelected(dayVal)}
            >
              {dayLabel}
            </Chip>
          ))}
        </div>
      }
      renderFooter={
        <PickerFooter
          cancelLabel={cancelLabel}
          confirmLabel={confirmLabel}
          onCancel={handleCancel}
          onApply={handleApply}
        />
      }
    />
  );
};

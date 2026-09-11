import { Chip } from '../chip';
import { type InputSize } from '../input';
import {
  PickerBase,
  PickerFooter,
  PickerHeader,
  buildDisplayValue,
  usePickerState,
  type PickerModeValueProps,
  type PickerValue,
} from '../base/components/picker-base';

type DayOfMonthPickerProps = PickerModeValueProps & {
  placeholder?: string;
  value?: PickerValue;
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
};

export const DayOfMonthPicker: React.FC<DayOfMonthPickerProps> = ({
  mode = 'single',
  value,
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
  title = 'Day',
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
  } = usePickerState({
    mode,
    defaultValue,
    value,
    onChange: onChange as ((value: PickerValue) => void) | undefined,
    onApply: onApply as ((value: PickerValue) => void) | undefined,
    disabled,
  });
  const displayValue = buildDisplayValue(
    mode,
    committedSingle,
    committedRange,
    committedMultiple,
    (v) => String(v)
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
      renderHeader={title == null ? <PickerHeader title={title} /> : undefined}
      renderOptions={
        <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
          {Array.from({ length: 31 }, (_, index) => {
            const dayVal = index + 1;
            return (
              <Chip
                key={dayVal}
                onClick={() => handleSelect(dayVal)}
                className="px-6"
                selected={isSelected(dayVal)}
              >
                {dayVal}
              </Chip>
            );
          })}
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

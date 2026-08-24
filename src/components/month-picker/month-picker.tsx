import { Chip } from '../chip';
import { type InputSize } from '../input';
import { generateMonthOptions } from './helpers';
import {
  PickerBase,
  PickerFooter,
  PickerHeader,
  buildDisplayValue,
  usePickerState,
  type PickerModeValueProps,
  type PickerValue,
} from '../base/components/picker-base';

type MonthPickerProps = PickerModeValueProps & {
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
};

const MONTH_OPTIONS = generateMonthOptions();

const MONTH_LABEL: Record<number, string> = Object.fromEntries(
  MONTH_OPTIONS.map(({ value, label }) => [value, label])
);

export const MonthPicker: React.FC<MonthPickerProps> = ({
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
  } = usePickerState({
    mode,
    value,
    defaultValue,
    onChange: onChange as ((value: PickerValue) => void) | undefined,
    onApply: onApply as ((value: PickerValue) => void) | undefined,
    disabled,
  });

  const displayValue = buildDisplayValue(
    mode,
    committedSingle,
    committedRange,
    committedMultiple,
    (v) => MONTH_LABEL[v] ?? ''
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
      renderHeader={title == null ? <PickerHeader title="Month" /> : undefined}
      renderOptions={
        <div className="grid grid-cols-3 gap-2">
          {MONTH_OPTIONS.map(({ value: monthVal, label: monthLabel }) => (
            <Chip
              key={monthVal}
              onClick={() => handleSelect(monthVal)}
              className="px-6"
              selected={isSelected(monthVal)}
            >
              {monthLabel}
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

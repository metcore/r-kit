import { useMemo } from 'react';
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

type MonthPickerLanguage = 'en' | 'id';

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
  /** Bahasa nama bulan & label tombol default (cancel/confirm). Default `'id'`. */
  language?: MonthPickerLanguage;
};

const DEFAULT_LABELS: Record<
  MonthPickerLanguage,
  { cancel: string; confirm: string }
> = {
  id: { cancel: 'Batalkan', confirm: 'Terapkan' },
  en: { cancel: 'Cancel', confirm: 'Apply' },
};

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
  language = 'id',
  cancelLabel,
  confirmLabel,
  title = 'Month',
}) => {
  const monthOptions = useMemo(
    () => generateMonthOptions(language),
    [language]
  );

  const monthLabelMap = useMemo<Record<number, string>>(
    () =>
      Object.fromEntries(
        monthOptions.map(({ value, label }) => [value, label])
      ),
    [monthOptions]
  );

  const resolvedCancelLabel = cancelLabel ?? DEFAULT_LABELS[language].cancel;
  const resolvedConfirmLabel = confirmLabel ?? DEFAULT_LABELS[language].confirm;

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
    (v) => monthLabelMap[v] ?? ''
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
        <div className="grid grid-cols-3 gap-2">
          {monthOptions.map(({ value: monthVal, label: monthLabel }) => (
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
          cancelLabel={resolvedCancelLabel}
          confirmLabel={resolvedConfirmLabel}
          onCancel={handleCancel}
          onApply={handleApply}
        />
      }
    />
  );
};

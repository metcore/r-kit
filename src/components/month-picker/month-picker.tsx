import { useCallback, useMemo, useState } from 'react';
import { Button } from '../button';
import { Chip } from '../chip';
import { Dropdown, DropdownContent, DropdownTrigger } from '../dropdown';
import { Icon } from '../icons';
import { Input, type InputSize } from '../input';
import { InputGroup, InputGroupControl, InputGroupText } from '../input-group';
import { generateMonthOptions } from './helpers';
import { Text } from '../text';

type MonthPickerMode = 'single' | 'range' | 'multiple';
type RangeValue = { startDate: number | null; endDate: number | null };
type MonthPickerValue = number[] | RangeValue;

interface MonthPickerProps {
  mode?: MonthPickerMode;
  defaultValue?: MonthPickerValue;
  onChange?: (value: MonthPickerValue) => void;
  onApply?: (value: MonthPickerValue) => void;
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

const MONTH_OPTIONS = generateMonthOptions();

const MONTH_LABEL: Record<number, string> = Object.fromEntries(
  MONTH_OPTIONS.map(({ value, label }) => [value, label])
);

function parseDefault(
  defaultValue: MonthPickerValue | undefined,
  mode: MonthPickerMode
) {
  const empty = {
    single: null as number | null,
    range: { startDate: null, endDate: null } as RangeValue,
    multiple: [] as number[],
  };
  if (!defaultValue) return empty;
  if (Array.isArray(defaultValue)) {
    if (mode === 'single')
      return {
        ...empty,
        single: defaultValue[0] ?? null,
      };
    if (mode === 'multiple') return { ...empty, multiple: defaultValue };
  } else if (mode === 'range') {
    return { ...empty, range: defaultValue };
  }
  return empty;
}

function buildDisplayValue(
  mode: MonthPickerMode,
  single: number | null,
  range: RangeValue,
  multiple: number[]
): string {
  if (mode === 'single') {
    return single !== null ? (MONTH_LABEL[single] ?? '') : '';
  }
  if (mode === 'range') {
    const { startDate, endDate } = range;
    if (startDate === null) return '';
    const from = MONTH_LABEL[startDate] ?? '';
    return endDate !== null ? `${from} – ${MONTH_LABEL[endDate] ?? ''}` : from;
  }
  return multiple
    .slice()
    .sort((a, b) => a - b)
    .map((m) => MONTH_LABEL[m] ?? '')
    .filter(Boolean)
    .join(', ');
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  mode = 'single',
  defaultValue,
  onChange,
  onApply,
  placeholder = 'Pilih bulan',
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
  const [open, setOpen] = useState(false);

  const init = useMemo(
    () => parseDefault(defaultValue, mode),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const [committedSingle, setCommittedSingle] = useState<number | null>(
    init.single
  );
  const [committedRange, setCommittedRange] = useState<RangeValue>(init.range);
  const [committedMultiple, setCommittedMultiple] = useState<number[]>(
    init.multiple
  );

  const [draftSingle, setDraftSingle] = useState<number | null>(init.single);
  const [draftRange, setDraftRange] = useState<RangeValue>(init.range);
  const [draftMultiple, setDraftMultiple] = useState<number[]>(init.multiple);

  const displayValue = buildDisplayValue(
    mode,
    committedSingle,
    committedRange,
    committedMultiple
  );

  const handleOpen = () => {
    if (disabled) return;
    setDraftSingle(committedSingle);
    setDraftRange({ ...committedRange });
    setDraftMultiple([...committedMultiple]);
    setOpen(true);
  };

  const handleSelectMonth = useCallback(
    (month: number) => {
      if (mode === 'single') {
        setDraftSingle(month);
      } else if (mode === 'range') {
        setDraftRange((prev) => {
          if (prev.startDate === null || prev.endDate !== null) {
            return { startDate: month, endDate: null };
          }
          if (month < prev.startDate) {
            return { startDate: month, endDate: prev.startDate };
          }
          return { startDate: prev.startDate, endDate: month };
        });
      } else {
        setDraftMultiple((prev) =>
          prev.includes(month)
            ? prev.filter((m) => m !== month)
            : [...prev, month]
        );
      }
    },
    [mode]
  );

  const isSelected = useCallback(
    (month: number): boolean => {
      if (mode === 'single') return month === draftSingle;
      if (mode === 'range') {
        const { startDate, endDate } = draftRange;
        if (startDate === null) return false;
        if (endDate === null) return month === startDate;
        return month >= startDate && month <= endDate;
      }
      return draftMultiple.includes(month);
    },
    [mode, draftSingle, draftRange, draftMultiple]
  );

  const handleApply = () => {
    let value: MonthPickerValue;
    if (mode === 'single') {
      value = draftSingle !== null ? [draftSingle] : [];
      setCommittedSingle(draftSingle);
    } else if (mode === 'range') {
      value = { ...draftRange };
      setCommittedRange({ ...draftRange });
    } else {
      value = [...draftMultiple];
      setCommittedMultiple([...draftMultiple]);
    }
    onChange?.(value);
    onApply?.(value);
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger>
        <InputGroup
          disabled={disabled}
          label={label}
          hint={hint}
          tooltip={tooltip}
          errorMessages={errorMessages}
          required={required}
          size={size}
        >
          <InputGroupText>
            <Icon name="calendar" />
          </InputGroupText>
          <InputGroupControl>
            <Input
              value={displayValue}
              placeholder={placeholder}
              readOnly
              onClick={() =>
                disabled == false && (open ? setOpen(false) : handleOpen())
              }
            />
          </InputGroupControl>
          <Button
            variant="tertiary"
            onClick={() => !disabled && (open ? setOpen(false) : handleOpen())}
          >
            <Icon
              name="arrow-down"
              size={15}
              className={`text-gray-700 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </Button>
        </InputGroup>
      </DropdownTrigger>

      <DropdownContent className="flex gap-4">
        {title == null && (
          <div className="flex items-center justify-center">
            <Text
              variant="p2"
              className="text-center text-gray-900"
              weight="semibold"
            >
              Month
            </Text>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          {MONTH_OPTIONS.map(({ value: monthVal, label: monthLabel }) => (
            <Chip
              key={monthVal}
              onClick={() => handleSelectMonth(monthVal)}
              className="px-6"
              selected={isSelected(monthVal)}
            >
              {monthLabel}
            </Chip>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
          <Button onClick={handleCancel} variant="tertiary">
            {cancelLabel}
          </Button>
          <Button onClick={handleApply}>{confirmLabel}</Button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
};

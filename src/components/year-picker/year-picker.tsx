import { useCallback, useMemo, useState } from 'react';
import { Button } from '../button';
import { Chip } from '../chip';
import { Dropdown, DropdownContent, DropdownTrigger } from '../dropdown';
import { Icon } from '../icons';
import { Input, type InputSize } from '../input';
import { InputGroup, InputGroupControl, InputGroupText } from '../input-group';
import { Text } from '../text';
import { cn } from '../../lib/utils';
import { ButtonNavigator } from '../calendar';

type YearPickerMode = 'single' | 'range' | 'multiple';
type RangeValue = { startDate: number | null; endDate: number | null };
type YearPickerValue = number[] | RangeValue;

interface YearPickerProps {
  mode?: YearPickerMode;
  defaultValue?: YearPickerValue;
  onChange?: (value: YearPickerValue) => void;
  onApply?: (value: YearPickerValue) => void;
  minYear?: number;
  maxYear?: number;
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
  confirmLabel?: string;
  title?: string;
}

const PAGE_SIZE = 12;
const CURRENT_YEAR = new Date().getFullYear();

function getPageStart(year: number): number {
  return Math.floor(year / PAGE_SIZE) * PAGE_SIZE;
}

function parseDefault(
  defaultValue: YearPickerValue | undefined,
  mode: YearPickerMode
) {
  const empty = {
    single: null as number | null,
    range: { startDate: null, endDate: null } as RangeValue,
    multiple: [] as number[],
  };
  if (!defaultValue) return empty;
  if (Array.isArray(defaultValue)) {
    if (mode === 'single') return { ...empty, single: defaultValue[0] ?? null };
    if (mode === 'multiple') return { ...empty, multiple: defaultValue };
  } else if (mode === 'range') {
    return { ...empty, range: defaultValue };
  }
  return empty;
}

function buildDisplayValue(
  mode: YearPickerMode,
  single: number | null,
  range: RangeValue,
  multiple: number[]
): string {
  if (mode === 'single') {
    return single !== null ? String(single) : '';
  }
  if (mode === 'range') {
    const { startDate, endDate } = range;
    if (startDate === null) return '';
    return endDate !== null ? `${startDate} – ${endDate}` : String(startDate);
  }
  return multiple.length > 0
    ? multiple
        .slice()
        .sort((a, b) => a - b)
        .join(', ')
    : '';
}

export const YearPicker: React.FC<YearPickerProps> = ({
  mode = 'single',
  defaultValue,
  onChange,
  onApply,
  minYear,
  maxYear,
  placeholder = 'Pilih tahun',
  disabled = false,
  required = false,
  size = 'md',
  label,
  hint,
  errorMessages,
  tooltip,
  confirmLabel = 'Terapkan',
  title = 'Year',
}) => {
  const [open, setOpen] = useState(false);
  const [pageStart, setPageStart] = useState(() => getPageStart(CURRENT_YEAR));

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

  const yearOptions = useMemo(
    () => Array.from({ length: PAGE_SIZE }, (_, i) => pageStart + i),
    [pageStart]
  );

  const displayValue = buildDisplayValue(
    mode,
    committedSingle,
    committedRange,
    committedMultiple
  );

  const isPrevDisabled = minYear !== undefined && pageStart <= minYear;
  const isNextDisabled =
    maxYear !== undefined && pageStart + PAGE_SIZE > maxYear;

  const handlePrevPage = () => {
    if (!isPrevDisabled) setPageStart((p) => p - PAGE_SIZE);
  };
  const handleNextPage = () => {
    if (!isNextDisabled) setPageStart((p) => p + PAGE_SIZE);
  };

  const handleOpen = () => {
    if (disabled) return;
    setDraftSingle(committedSingle);
    setDraftRange({ ...committedRange });
    setDraftMultiple([...committedMultiple]);
    setOpen(true);
  };

  const isYearDisabled = useCallback(
    (year: number): boolean => {
      if (minYear !== undefined && year < minYear) return true;
      if (maxYear !== undefined && year > maxYear) return true;
      return false;
    },
    [minYear, maxYear]
  );

  const handleSelectYear = useCallback(
    (year: number) => {
      if (isYearDisabled(year)) return;
      if (mode === 'single') {
        setDraftSingle(year);
      } else if (mode === 'range') {
        setDraftRange((prev) => {
          if (prev.startDate === null || prev.endDate !== null) {
            return { startDate: year, endDate: null };
          }
          if (year < prev.startDate) {
            return { startDate: year, endDate: prev.startDate };
          }
          return { startDate: prev.startDate, endDate: year };
        });
      } else {
        setDraftMultiple((prev) =>
          prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
        );
      }
    },
    [mode, isYearDisabled]
  );

  const isSelected = useCallback(
    (year: number): boolean => {
      if (mode === 'single') return year === draftSingle;
      if (mode === 'range') {
        const { startDate, endDate } = draftRange;
        if (startDate === null) return false;
        if (endDate === null) return year === startDate;
        return year >= startDate && year <= endDate;
      }
      return draftMultiple.includes(year);
    },
    [mode, draftSingle, draftRange, draftMultiple]
  );

  const handleNow = () => {
    const year = CURRENT_YEAR;
    if (isYearDisabled(year)) return;
    setPageStart(getPageStart(year));
    if (mode === 'single') {
      setDraftSingle(year);
    } else if (mode === 'range') {
      setDraftRange((prev) =>
        prev.startDate === null || prev.endDate !== null
          ? { startDate: year, endDate: null }
          : { startDate: prev.startDate, endDate: year }
      );
    } else {
      setDraftMultiple((prev) =>
        prev.includes(year) ? prev : [...prev, year]
      );
    }
  };

  const handleApply = () => {
    let value: YearPickerValue;
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
                !disabled && (open ? setOpen(false) : handleOpen())
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
        <div className="flex items-center justify-between">
          <ButtonNavigator
            icon="arrow-left"
            onClick={handlePrevPage}
            disabled={isPrevDisabled}
          />
          <Text variant="p3" weight="semibold" className="text-gray-900">
            {title}
          </Text>
          <ButtonNavigator
            icon="arrow-right"
            onClick={handleNextPage}
            disabled={isNextDisabled}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {yearOptions.map((year) => {
            const yearDisabled = isYearDisabled(year);
            const selected = isSelected(year);
            const isCurrent = year === CURRENT_YEAR;
            return (
              <Chip
                key={year}
                onClick={() => handleSelectYear(year)}
                selected={selected}
                disabled={yearDisabled}
                className={cn(
                  'px-6',
                  isCurrent && !selected && !yearDisabled && 'text-primary-500'
                )}
              >
                {year}
              </Chip>
            );
          })}
        </div>

        <div className="flex items-center gap-2 border-t border-gray-100 pt-4">
          <Button
            variant="tertiary"
            onClick={handleNow}
            block
            disabled={isYearDisabled(CURRENT_YEAR)}
          >
            Now
          </Button>
          <Button block onClick={handleApply}>
            {confirmLabel}
          </Button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
};

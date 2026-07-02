import { useCallback, useMemo, useState } from 'react';
import { Button } from '../button';
import { Chip } from '../chip';
import { type InputSize } from '../input';
import { Text } from '../text';
import { cn } from '../../lib/utils';
import { ButtonNavigator } from '../calendar';
import {
  PickerBase,
  buildDisplayValue,
  usePickerState,
  type PickerMode,
  type PickerValue,
} from '../base/components/picker-base';

type YearPickerMode = PickerMode;
type YearPickerValue = PickerValue;

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
  const [pageStart, setPageStart] = useState(() => getPageStart(CURRENT_YEAR));

  const isYearDisabled = useCallback(
    (year: number): boolean => {
      if (minYear !== undefined && year < minYear) return true;
      if (maxYear !== undefined && year > maxYear) return true;
      return false;
    },
    [minYear, maxYear]
  );

  const {
    open,
    setOpen,
    setDraftSingle,
    setDraftRange,
    setDraftMultiple,
    committedSingle,
    committedRange,
    committedMultiple,
    handleOpen,
    handleSelect,
    isSelected,
    handleApply,
  } = usePickerState({
    mode,
    defaultValue,
    onChange,
    onApply,
    disabled,
    isValueDisabled: isYearDisabled,
  });

  const yearOptions = useMemo(
    () => Array.from({ length: PAGE_SIZE }, (_, i) => pageStart + i),
    [pageStart]
  );

  const displayValue = buildDisplayValue(
    mode,
    committedSingle,
    committedRange,
    committedMultiple,
    String
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
      renderHeader={
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
      }
      renderOptions={
        <div className="grid grid-cols-3 gap-2">
          {yearOptions.map((year) => {
            const yearDisabled = isYearDisabled(year);
            const selected = isSelected(year);
            const isCurrent = year === CURRENT_YEAR;
            return (
              <Chip
                key={year}
                onClick={() => handleSelect(year)}
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
      }
      renderFooter={
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
      }
    />
  );
};

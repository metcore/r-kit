import { useCallback, useMemo, useState } from 'react';
import { Button } from '../../button';
import { Dropdown, DropdownContent, DropdownTrigger } from '../../dropdown';
import { Icon } from '../../icons';
import { Input, type InputSize } from '../../input';
import {
  InputGroup,
  InputGroupControl,
  InputGroupText,
} from '../../input-group';
import { Text } from '../../text';

export type PickerMode = 'single' | 'range' | 'multiple';
export type RangeValue = { startDate: number | null; endDate: number | null };
export type PickerValue = number[] | RangeValue;

interface UsePickerStateOptions {
  mode?: PickerMode;
  defaultValue?: PickerValue;
  onChange?: (value: PickerValue) => void;
  onApply?: (value: PickerValue) => void;
  disabled?: boolean;
  isValueDisabled?: (value: number) => boolean;
}

export function parseDefault(
  defaultValue: PickerValue | undefined,
  mode: PickerMode
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

export function buildDisplayValue(
  mode: PickerMode,
  single: number | null,
  range: RangeValue,
  multiple: number[],
  getLabel: (value: number) => string
): string {
  if (mode === 'single') {
    return single !== null ? getLabel(single) : '';
  }
  if (mode === 'range') {
    const { startDate, endDate } = range;
    if (startDate === null) return '';
    const from = getLabel(startDate);
    return endDate !== null ? `${from} – ${getLabel(endDate)}` : from;
  }
  return multiple
    .slice()
    .sort((a, b) => a - b)
    .map((m) => getLabel(m))
    .filter(Boolean)
    .join(', ');
}

export function usePickerState({
  mode = 'single',
  defaultValue,
  onChange,
  onApply,
  disabled = false,
  isValueDisabled,
}: UsePickerStateOptions) {
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

  const handleOpen = () => {
    if (disabled) return;
    setDraftSingle(committedSingle);
    setDraftRange({ ...committedRange });
    setDraftMultiple([...committedMultiple]);
    setOpen(true);
  };

  const handleSelect = useCallback(
    (value: number) => {
      if (isValueDisabled && isValueDisabled?.(value)) return;
      if (mode === 'single') {
        setDraftSingle(value);
      } else if (mode === 'range') {
        setDraftRange((prev) => {
          if (prev.startDate === null || prev.endDate !== null) {
            return { startDate: value, endDate: null };
          }
          if (value < prev.startDate) {
            return { startDate: value, endDate: prev.startDate };
          }
          return { startDate: prev.startDate, endDate: value };
        });
      } else {
        setDraftMultiple((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value]
        );
      }
    },
    [mode, isValueDisabled]
  );

  const isSelected = useCallback(
    (value: number): boolean => {
      if (mode === 'single') return value === draftSingle;
      if (mode === 'range') {
        const { startDate, endDate } = draftRange;
        if (startDate === null) return false;
        if (endDate === null) return value === startDate;
        return value >= startDate && value <= endDate;
      }
      return draftMultiple.includes(value);
    },
    [mode, draftSingle, draftRange, draftMultiple]
  );

  const handleApply = () => {
    let value: PickerValue;
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

  return {
    open,
    setOpen,
    draftSingle,
    setDraftSingle,
    draftRange,
    setDraftRange,
    draftMultiple,
    setDraftMultiple,
    committedSingle,
    committedRange,
    committedMultiple,
    handleOpen,
    handleSelect,
    isSelected,
    handleApply,
    handleCancel,
  };
}

interface PickerHeaderProps {
  title: string;
}

export const PickerHeader: React.FC<PickerHeaderProps> = ({ title }) => (
  <div className="flex items-center justify-center">
    <Text variant="p2" className="text-center text-gray-900" weight="semibold">
      {title}
    </Text>
  </div>
);

interface PickerFooterProps {
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onApply: () => void;
}

export const PickerFooter: React.FC<PickerFooterProps> = ({
  cancelLabel,
  confirmLabel,
  onCancel,
  onApply,
}) => (
  <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
    <Button onClick={onCancel} variant="tertiary">
      {cancelLabel}
    </Button>
    <Button onClick={onApply}>{confirmLabel}</Button>
  </div>
);

interface PickerBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpen: () => void;
  displayValue: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: InputSize;
  label?: string;
  hint?: string;
  errorMessages?: string | string[];
  tooltip?: string;
  renderHeader?: React.ReactNode;
  renderOptions: React.ReactNode;
  renderFooter: React.ReactNode;
}

export const PickerBase: React.FC<PickerBaseProps> = ({
  open,
  onOpenChange,
  onOpen,
  displayValue,
  placeholder,
  disabled = false,
  required = false,
  size = 'md',
  label,
  hint,
  errorMessages,
  tooltip,
  renderHeader,
  renderOptions,
  renderFooter,
}) => (
  <Dropdown open={open} onOpenChange={onOpenChange}>
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
              disabled == false && (open ? onOpenChange(false) : onOpen())
            }
          />
        </InputGroupControl>
        <Button
          variant="tertiary"
          onClick={() => !disabled && (open ? onOpenChange(false) : onOpen())}
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
      {renderHeader}
      {renderOptions}
      {renderFooter}
    </DropdownContent>
  </Dropdown>
);

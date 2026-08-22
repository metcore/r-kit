import type { ReactNode } from 'react';
import type { Calendar } from '../calendar';

export type DatePickerMode = 'single' | 'range';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type CalendarBaseProps = React.ComponentProps<typeof Calendar>;
export type CalendarOverrideProps = Omit<
  CalendarBaseProps,
  | 'wrapperClassname'
  | 'weekWrapperClassname'
  | 'dayWrapperClassname'
  | 'onChange'
  | 'mode'
>;

export type CalendarRangeOverrideProps = Omit<
  CalendarBaseProps,
  | 'wrapperClassname'
  | 'weekWrapperClassname'
  | 'dayWrapperClassname'
  | 'onChange'
  | 'value'
  | 'rangeValue'
  | 'mode'
>;

export type DatePickerShortcut =
  | 'lastWeek'
  | 'last7Days'
  | 'last30Days'
  | 'currentMonth'
  | 'lastYear';

export const DATE_PICKER_SHORTCUT_ORDER: DatePickerShortcut[] = [
  'lastWeek',
  'last7Days',
  'last30Days',
  'currentMonth',
  'lastYear',
];

export const DEFAULT_DATE_PICKER_SHORTCUT_LABELS: Record<
  DatePickerShortcut,
  string
> = {
  lastWeek: 'Last Week',
  last7Days: 'Last 7 Days',
  last30Days: 'Last 30 Days',
  currentMonth: 'Current Month',
  lastYear: 'Last Year',
};

export interface DatePickerProps {
  format?: DateFormat;
  mode?: DatePickerMode;
  value?: Date | null;
  rangeValue?: DateRange;
  onChange?: (date: Date | null) => void;
  onRangeChange?: (range: DateRange) => void;
  trigger?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;

  minDate?: Date;
  maxDate?: Date;
  disabledDateClassName?: string;
  calendarProps?: CalendarOverrideProps;
  startDateCalendarProps?: CalendarRangeOverrideProps;
  endDateCalendarProps?: CalendarRangeOverrideProps;
  wrapperClassName?: string;
  size?: 'sm' | 'lg' | 'md';
  showController?: boolean;
  align?: 'start' | 'center' | 'end';

  containerClassName?: string;
  placeholder?: string;
  isClearable?: boolean;
  autoWidth?: boolean;

  label?: string;
  hint?: string;
  required?: boolean;
  tooltip?: string;
  description?: string;
  errorMessages?: string;

  resetLabel?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
  shortcutLabels?: Partial<Record<DatePickerShortcut, string>>;
}

export type DateFormat =
  | 'DD-MM-YYYY'
  | 'DD/MM/YYYY'
  | 'DD MMM YYYY'
  | 'DD MMMM YYYY'
  | 'YYYY-MM-DD'
  | 'MM/DD/YYYY'
  | 'DD-MM-YYYY HH:mm:ss'
  | 'DD/MM/YYYY HH:mm:ss'
  | 'DD MMM YYYY HH:mm:ss'
  | 'DD MMMM YYYY HH:mm:ss'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'MM/DD/YYYY HH:mm:ss'
  | 'DD MMMM YYYY - HH:mm:ss'
  | 'DD MMM YYYY - HH:mm:ss';

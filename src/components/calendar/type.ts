import type { createCalendarHelpers } from './helpers/create-calendar-helpers';

export interface GetCalendarDaysProps {
  currentYear: number;
  currentMonth: number;
}

export interface ButtonDropdownProps {
  onClick?: () => void;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface CalendarDay {
  date: number;
  month: 'prev' | 'current' | 'next';
  fullDate: Date;
}

export interface DotConfig {
  color?: string;
  count?: number;
}

export interface CalendarDayConfig {
  date: Date;
  dots?: DotConfig[];
  disabled?: boolean;
}

export interface CalendarStyleConfig {
  selected?: {
    background?: string;
    text?: string;
  };
  disabled?: {
    background?: string;
    text?: string;
  };
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarProps {
  showNavigator?: boolean;
  showHeader?: boolean;
  value?: Date | null;
  onChange?: (date: Date) => void;
  disabledDates?: Date[];
  dayConfigs?: CalendarDayConfig[];
  defaultMonth?: number;
  defaultYear?: number;
  styleConfig?: CalendarStyleConfig;
  daysOfWeek?: string[];
  months?: string[];
  wrapperClassname?: string;
  dayWrapperClassname?: string;
  weekWrapperClassname?: string;
  showNextNavigator?: boolean;
  showPrevNavigator?: boolean;
  mode?: 'single' | 'range';
  rangeValue?: DateRange;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'compact' | 'default';
  events?: CalendarEvent[];
  showCalendarTooltip?: boolean;
  type?: CalendarTypes;
  onTypeChange?: (type: CalendarTypes) => void;
  onEventClick?: (event?: CalendarEvent) => void;
  backdropOnClick?: (day?: CalendarDay) => void;
  showDefaultController?: boolean;
}

export type CalendarState = {
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
};

export type DropdownState = {
  isMonthOpen: boolean;
  setMonthOpen: (val: boolean) => void;
  isYearOpen: boolean;
  setYearOpen: (val: boolean) => void;
};

export interface CalendarGridProps {
  days: CalendarDay[];
  helpers: ReturnType<typeof createCalendarHelpers>;
  size: CalendarProps['size'];
  mode: CalendarProps['mode'];
  styleConfig?: CalendarStyleConfig;
  onClick: (day: CalendarDay) => void;
  className?: string;
  variant?: CalendarProps['variant'];
  events?: CalendarEvent[];
  showCalendarTooltip?: boolean;
  backdropOnClick?: (day?: CalendarDay) => void;
  onEventClick?: (event?: CalendarEvent) => void;
}

export interface CalendarDayItemProps {
  day: CalendarDay;
  helpers: ReturnType<typeof createCalendarHelpers>;
  size: CalendarProps['size'];
  mode: CalendarProps['mode'];
  styleConfig?: CalendarStyleConfig;
  onClick: (day: CalendarDay) => void;
  variant?: CalendarProps['variant'];
  events?: CalendarEvent[];
  backdropOnClick?: (day?: CalendarDay) => void;
}

export interface CalendarEvent {
  title: string;
  subtitle?: string;
  label?: string;
  startTime?: string;
  endTime?: string;
  color?:
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'primary'
    | 'orange'
    | 'purple';
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

export type CalendarTypes = 'week' | 'month' | 'year' | 'day' | 'agenda';

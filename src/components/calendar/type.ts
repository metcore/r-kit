export interface GetCalendarDaysProps {
  currentYear: number;
  currentMonth: number;
}

export interface ButtonDropdownProps {
  onClick?: () => void;
}

export interface CalendarDay {
  date: number;
  month: "prev" | "current" | "next";
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
}

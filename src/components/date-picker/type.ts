import type { ReactNode } from "react";
import type { Calendar } from "../calendar";

export type DatePickerMode = "single" | "range";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type CalendarBaseProps = React.ComponentProps<typeof Calendar>;
export type CalendarOverrideProps = Omit<
  CalendarBaseProps,
  | "wrapperClassname"
  | "weekWrapperClassname"
  | "dayWrapperClassname"
  | "onChange"
  | "mode"
>;

export type CalendarRangeOverrideProps = Omit<
  CalendarBaseProps,
  | "wrapperClassname"
  | "weekWrapperClassname"
  | "dayWrapperClassname"
  | "onChange"
  | "value"
  | "rangeValue"
  | "mode"
>;

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

  calendarProps?: CalendarOverrideProps;
  startDateCalendarProps?: CalendarRangeOverrideProps;
  endDateCalendarProps?: CalendarRangeOverrideProps;
}

export type DateFormat =
  | "DD-MM-YYYY"
  | "DD/MM/YYYY"
  | "DD MMM YYYY"
  | "DD MMMM YYYY"
  | "YYYY-MM-DD"
  | "MM/DD/YYYY";

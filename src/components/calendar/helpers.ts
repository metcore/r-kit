import type {
  CalendarDay,
  CalendarStyleConfig,
  GetCalendarDaysProps,
} from "./type";

const getCalendarDays = ({
  currentYear,
  currentMonth,
}: GetCalendarDaysProps) => {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const prevLastDay = new Date(currentYear, currentMonth, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDateOfMonth = lastDay.getDate();
  const prevLastDate = prevLastDay.getDate();

  const days = [];

  // Previous month's days
  for (let i = firstDayOfWeek; i > 0; i--) {
    days.push({
      date: prevLastDate - i + 1,
      month: "prev",
      fullDate: new Date(currentYear, currentMonth - 1, prevLastDate - i + 1),
    });
  }

  // Current month's days
  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push({
      date: i,
      month: "current",
      fullDate: new Date(currentYear, currentMonth, i),
    });
  }

  // Next month's days
  const remainingDays = 42 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      month: "next",
      fullDate: new Date(currentYear, currentMonth + 1, i),
    });
  }

  return days;
};

const isSameDate = (date1: CalendarDay, date2: CalendarDay) => {
  if (!date1 || !date2) return false;
  return (
    date1.fullDate.getDate() === date2.fullDate.getDate() &&
    date1.fullDate.getMonth() === date2.fullDate.getMonth() &&
    date1.fullDate.getFullYear() === date2.fullDate.getFullYear()
  );
};

// =====styling helpers====
// Get style for selected date
const getSelectedStyle = (styleConfig?: CalendarStyleConfig) => {
  return {
    backgroundColor: styleConfig?.selected?.background,
    color: styleConfig?.selected?.text,
  };
};

// Get style for disabled date
const getDisabledStyle = (styleConfig?: CalendarStyleConfig) => {
  return {
    backgroundColor: styleConfig?.disabled?.background,
    color: styleConfig?.disabled?.text,
  };
};

// Get day style
const getDayStyle = ({
  day,
  disabled,
  selected,
  styleConfig,
}: {
  selected: boolean;
  day: CalendarDay;
  disabled: boolean;
  styleConfig?: CalendarStyleConfig;
}) => {
  if (selected) {
    return getSelectedStyle(styleConfig);
  } else if (disabled && day.month === "current") {
    return getDisabledStyle(styleConfig);
  }

  return {};
};

// Get cursor classes
const getCursorClass = ({
  isDisabled,
  isCurrentMonth,
}: {
  isDisabled: boolean;
  isCurrentMonth: boolean;
}) => {
  if (isDisabled && isCurrentMonth) {
    return "cursor-not-allowed";
  }

  return "cursor-pointer";
};

// Get text color classes
const getTextColorClass = ({
  isCurrentMonth,
  isSelected,
  isDisabled,
  styleConfig,
}: {
  isCurrentMonth: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  styleConfig?: CalendarStyleConfig;
}) => {
  if (!isCurrentMonth) {
    return "*:text-gray-500";
  }

  if (isSelected && styleConfig?.selected?.text) {
    return ""; // Use inline style
  }

  if (isSelected) {
    return "*:text-white!";
  }

  if (isDisabled && styleConfig?.disabled?.text) {
    return ""; // Use inline style
  }

  if (isDisabled) {
    return "*:text-red-500!";
  }

  return "*:text-gray-700!";
};
// Get background color classes
const getBackgroundClass = ({
  isSelected,
  isDisabled,
  isCurrentMonth,
  styleConfig,
}: {
  isSelected: boolean;
  isDisabled: boolean;
  isCurrentMonth: boolean;
  styleConfig?: CalendarStyleConfig;
}) => {
  if (isSelected && styleConfig?.selected?.background) {
    return ""; // Use inline style
  }

  if (isSelected) {
    return "bg-primary-1000";
  }

  if (isDisabled && isCurrentMonth && styleConfig?.disabled?.background) {
    return ""; // Use inline style
  }

  if (isDisabled && isCurrentMonth) {
    return "bg-red-500/30";
  }

  if (!isDisabled) {
    return "hover:bg-gray-100";
  }

  return "";
};

export {
  getCalendarDays,
  isSameDate,
  getDayStyle,
  getTextColorClass,
  getCursorClass,
  getBackgroundClass,
};

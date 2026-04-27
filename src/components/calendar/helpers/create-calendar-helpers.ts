import type { CalendarDay, CalendarDayConfig } from '../type';

export type UseCalendarHelpersParams = {
  mode: 'single' | 'range';
  value?: Date | null;
  rangeValue?: {
    start: Date | null;
    end: Date | null;
  };
  disabledDates: Date[];
  dayConfigs: CalendarDayConfig[];
  disabled?: (date: Date) => boolean;
};

export const createCalendarHelpers = ({
  mode,
  value,
  rangeValue,
  disabledDates,
  dayConfigs,
  disabled,
}: UseCalendarHelpersParams) => {
  /**
   * Check if a given date is disabled.
   * @param {CalendarDay} day
   * @returns {boolean} true if the date is disabled, false otherwise
   */
  const isDateDisabled = (day: CalendarDay): boolean => {
    if (disabledDates.some((d) => d.getTime() === day.fullDate.getTime())) {
      return true;
    }
    if (disabled?.(day.fullDate) === true) {
      return true;
    }
    return false;
  };

  /**
   * Get a day config from the given day.
   * @param {CalendarDay} day
   * @returns {CalendarDayConfig | undefined} The day config if found, undefined otherwise
   */
  const getDayConfig = (day: CalendarDay) => {
    return dayConfigs.find((c) => c.date.getTime() === day.fullDate.getTime());
  };

  /**
   * Check if a given date is selected.
   * Only works for single mode.
   * @param {CalendarDay} day The day to check
   * @returns {boolean} true if the date is selected, false otherwise
   */
  const isDateSelected = (day: CalendarDay): boolean => {
    if (mode === 'range') return false;
    if (!value) return false;
    return value.getTime() === day.fullDate.getTime();
  };

  /**
   * Check if a given date is within the range.
   * Only works for range mode.
   * @param {CalendarDay} day The day to check
   * @returns {boolean} true if the date is within the range, false otherwise
   */
  const isDateInRange = (day: CalendarDay): boolean => {
    if (mode !== 'range' || !rangeValue?.start || !rangeValue?.end)
      return false;

    const t = day.fullDate.getTime();
    return t > rangeValue.start.getTime() && t < rangeValue.end.getTime();
  };

  /**
   * Check if a given date is the start of the range.
   * Only works for range mode.
   * @param {CalendarDay} day The day to check
   * @returns {boolean} true if the date is the start of the range, false otherwise
   */
  const isRangeStart = (day: CalendarDay): boolean => {
    if (mode !== 'range' || !rangeValue?.start) return false;
    return rangeValue.start.getTime() === day.fullDate.getTime();
  };

  const isRangeEnd = (day: CalendarDay): boolean => {
    if (mode !== 'range' || !rangeValue?.end) return false;
    return rangeValue.end.getTime() === day.fullDate.getTime();
  };

  /**
   * Get the background class for a given day in range mode.
   * If the day is the start or end of the range, it will return 'bg-primary-1000 text-white!'.
   * If the day is within the range, it will return 'bg-primary-100'.
   * If the day is not in range mode, it will return an empty string.
   * @param {CalendarDay} day The day to get the background class for
   * @returns {string} The background class for the given day
   */
  const getRangeBackgroundClass = (day: CalendarDay): string => {
    if (mode !== 'range') return '';

    if (isRangeStart(day) || isRangeEnd(day)) {
      return 'bg-primary-1000 text-white!';
    }

    if (isDateInRange(day)) {
      return 'bg-primary-100';
    }

    return '';
  };

  return {
    isDateDisabled,
    getDayConfig,
    isDateSelected,
    isDateInRange,
    isRangeStart,
    isRangeEnd,
    getRangeBackgroundClass,
  };
};

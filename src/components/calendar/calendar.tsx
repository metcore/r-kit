import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { Text, type TextVariant } from "../text";
import { ButtonNavigator } from "./button-navigator";
import { ButtonDropdown, ItemDropdown } from "./dropdown";
import {
  getBackgroundClass,
  getCalendarDays,
  getCursorClass,
  getDayStyle,
  getTextColorClass,
} from "./helpers";
import type { CalendarDay, CalendarDayConfig, CalendarProps } from "./type";

const Calendar = ({
  showNavigator = true,
  showHeader = true,
  value,
  onChange,
  disabledDates = [],
  dayConfigs = [],
  defaultMonth,
  defaultYear,
  styleConfig,
  wrapperClassname,
  weekWrapperClassname,
  dayWrapperClassname,
  daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
  showNextNavigator = true,
  showPrevNavigator = true,
  mode = "single",
  rangeValue,
  size = "md",
}: CalendarProps) => {
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    defaultMonth ?? currentDate.getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    defaultYear ?? currentDate.getFullYear(),
  );

  const [isDropdownYearShow, setIsDropdownYearShow] = useState(false);
  const [isDropdownMonthShow, setIsDropdownMonthShow] = useState(false);

  // Generate array of years (current year ± 10 years)
  const years = useMemo(() => {
    const yearRange = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      yearRange.push(i);
    }
    return yearRange;
  }, [currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calendarDays = getCalendarDays({ currentMonth, currentYear });

  // Helper to check if date is disabled
  const isDateDisabled = (day: CalendarDay): boolean => {
    return disabledDates.some(
      (disabledDate) =>
        disabledDate.getDate() === day.fullDate.getDate() &&
        disabledDate.getMonth() === day.fullDate.getMonth() &&
        disabledDate.getFullYear() === day.fullDate.getFullYear(),
    );
  };

  // Helper to get day config
  const getDayConfig = (day: CalendarDay): CalendarDayConfig | undefined => {
    return dayConfigs.find(
      (config) =>
        config.date.getDate() === day.fullDate.getDate() &&
        config.date.getMonth() === day.fullDate.getMonth() &&
        config.date.getFullYear() === day.fullDate.getFullYear(),
    );
  };

  // Helper to check if date is selected (single mode)
  const isDateSelected = (day: CalendarDay): boolean => {
    if (mode === "range") return false;
    if (!value) return false;
    return (
      value.getDate() === day.fullDate.getDate() &&
      value.getMonth() === day.fullDate.getMonth() &&
      value.getFullYear() === day.fullDate.getFullYear()
    );
  };

  // Helper to check if date is in range
  const isDateInRange = (day: CalendarDay): boolean => {
    if (mode !== "range" || !rangeValue?.start || !rangeValue?.end)
      return false;

    const dayTime = day.fullDate.getTime();
    const startTime = rangeValue.start.getTime();
    const endTime = rangeValue.end.getTime();

    return dayTime > startTime && dayTime < endTime;
  };

  // Helper to check if date is range start
  const isRangeStart = (day: CalendarDay): boolean => {
    if (mode !== "range" || !rangeValue?.start) return false;
    return (
      day.fullDate.getDate() === rangeValue.start.getDate() &&
      day.fullDate.getMonth() === rangeValue.start.getMonth() &&
      day.fullDate.getFullYear() === rangeValue.start.getFullYear()
    );
  };

  // Helper to check if date is range end
  const isRangeEnd = (day: CalendarDay): boolean => {
    if (mode !== "range" || !rangeValue?.end) return false;
    return (
      day.fullDate.getDate() === rangeValue.end.getDate() &&
      day.fullDate.getMonth() === rangeValue.end.getMonth() &&
      day.fullDate.getFullYear() === rangeValue.end.getFullYear()
    );
  };

  const handleDateClick = (day: CalendarDay) => {
    if (day.month !== "current") return;

    const dayConfig = getDayConfig(day);
    const disabled = dayConfig?.disabled || isDateDisabled(day);

    if (disabled) return;

    onChange?.(day.fullDate);
  };

  // Get range background class
  const getRangeBackgroundClass = (day: CalendarDay): string => {
    if (mode !== "range") return "";

    const inRange = isDateInRange(day);
    const rangeStart = isRangeStart(day);
    const rangeEnd = isRangeEnd(day);

    if (rangeStart || rangeEnd) {
      return "bg-primary-1000 text-white!";
    }

    if (inRange) {
      return "bg-primary-100";
    }

    return "";
  };

  useEffect(() => {
    if (value !== undefined) {
      setCurrentMonth(
        value?.getMonth() ?? defaultMonth ?? currentDate?.getMonth(),
      );
      setCurrentYear(
        value?.getFullYear() ?? defaultYear ?? currentDate?.getFullYear(),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const header_size_map: Record<string, TextVariant> = {
    sm: "t2",
    md: "t1",
    lg: "p3",
  };

  const day_of_week_size: Record<string, TextVariant> = {
    sm: "t3",
    md: "t2",
    lg: "t1",
  };

  const date_size_map: Record<string, string> = {
    md: "size-9",
    sm: "size-6",
    lg: "size-9",
  };

  return (
    <div
      className={cn(
        "mx-auto w-fit rounded-2xl border border-gray-200 bg-white p-6",
        wrapperClassname,
      )}
    >
      {/* Header with navigation */}
      {showHeader && (
        <div className="mb-6 flex items-center justify-between">
          {showNavigator && (
            <ButtonNavigator
              size={size}
              onClick={handlePrevMonth}
              icon="angle-left-small"
              className={showPrevNavigator ? "" : "opacity-0"}
            />
          )}

          {/* Month - Year Dropdown */}
          <div
            className={cn(
              "flex items-center gap-2",
              !showNavigator && "w-full justify-center",
            )}
          >
            {/* month */}
            {showNavigator && (
              <div>
                <ButtonDropdown
                  size={size}
                  onClick={() => setIsDropdownMonthShow(!isDropdownMonthShow)}
                  active={isDropdownMonthShow}
                />
                {isDropdownMonthShow && (
                  <div
                    className="relative"
                    onClick={() => setIsDropdownMonthShow(false)}
                  >
                    <div className="absolute top-5 left-1/2 z-20 max-h-48 -translate-x-1/2 space-y-1 overflow-y-auto rounded-lg bg-white px-2 py-1 shadow-md">
                      {months.map((month, index) => (
                        <ItemDropdown
                          onClick={() => setCurrentMonth(index)}
                          key={index}
                          active={currentMonth === index}
                          value={month}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* current month - year */}
            <Text
              as={"span"}
              variant={header_size_map[size]}
              weight="semibold"
              value={`${months[currentMonth]} - ${currentYear}`}
              align={"center"}
            />

            {/* year */}
            {showNavigator && (
              <div>
                <ButtonDropdown
                  onClick={() => setIsDropdownYearShow(!isDropdownYearShow)}
                  active={isDropdownYearShow}
                />
                {isDropdownYearShow && (
                  <div
                    className="relative"
                    onClick={() => setIsDropdownYearShow(false)}
                  >
                    <div className="absolute top-5 left-1/2 z-20 max-h-48 -translate-x-1/2 space-y-1 overflow-y-auto rounded-lg bg-white px-2 py-1 shadow-md">
                      {years.map((year) => (
                        <ItemDropdown
                          key={year}
                          onClick={() => setCurrentYear(year)}
                          active={currentYear === year}
                          value={year.toString()}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Next Month Button */}
          {showNavigator && (
            <ButtonNavigator
              size={size}
              onClick={handleNextMonth}
              icon="angle-right-small"
              className={showNextNavigator ? "" : "opacity-0"}
            />
          )}
        </div>
      )}

      {/* Days of week */}
      <div
        className={cn(
          "calendar-cols mb-3 grid justify-items-center gap-x-1",
          weekWrapperClassname,
        )}
      >
        {daysOfWeek.map((day) => (
          <Text
            key={day}
            as={"h5"}
            weight="medium"
            value={day}
            className="text-gray-600!"
            align="center"
            variant={day_of_week_size[size]}
          />
        ))}
      </div>

      {/* Calendar grid */}
      <div
        className={cn(
          "calendar-cols grid justify-items-center gap-x-1 gap-y-1",
          dayWrapperClassname,
        )}
      >
        {calendarDays.map((day, index) => {
          const dayConfig = getDayConfig(day as CalendarDay);
          const isDisabled = dayConfig?.disabled || isDateDisabled(day as CalendarDay); //prettier-ignore
          const isSelected = isDateSelected(day as CalendarDay);
          const dots = dayConfig?.dots || [];
          const isCurrentMonth = day.month === "current";
          // const inRange = isDateInRange(day as CalendarDay);
          const rangeStart = isRangeStart(day as CalendarDay);
          const rangeEnd = isRangeEnd(day as CalendarDay);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day as CalendarDay)}
              disabled={isDisabled && day.month === "current"}
              style={getDayStyle({
                selected: isSelected || rangeStart || rangeEnd,
                day: day as CalendarDay,
                disabled: isDisabled,
                styleConfig,
              })}
              className={cn(
                "flex flex-col items-center justify-center rounded-full text-sm font-medium transition-all duration-200",
                date_size_map[size],
                getCursorClass({ isDisabled, isCurrentMonth }),
                getTextColorClass({
                  isCurrentMonth,
                  isSelected: isSelected || rangeStart || rangeEnd,
                  isDisabled,
                  styleConfig,
                  day: day as CalendarDay,
                }),
                mode === "single" &&
                  getBackgroundClass({
                    isSelected,
                    isDisabled,
                    isCurrentMonth,
                    styleConfig,
                  }),
                mode === "range" &&
                  !isDisabled &&
                  getRangeBackgroundClass(day as CalendarDay),
              )}
            >
              <h5 className="font-metropolis text-xs font-medium">
                {day.date}
              </h5>

              {/* dots */}
              {dots.length > 0 && (
                <div className="-mb-1 flex gap-0.5">
                  {dots.map((dot, dotIndex) => (
                    <div
                      key={dotIndex}
                      className="size-1 rounded-full"
                      style={{
                        backgroundColor: dot.color || "#d1d5db",
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { ButtonDropdown, ButtonNavigator, Calendar, ItemDropdown };

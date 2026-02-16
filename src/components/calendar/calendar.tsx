import { useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { Dropdown, DropdownContent, DropdownTrigger } from "../dropdown";
import { Text } from "../text";
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
}: CalendarProps) => {
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    defaultMonth ?? currentDate.getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    defaultYear ?? currentDate.getFullYear(),
  );

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

  // Helper to check if date is selected
  const isDateSelected = (day: CalendarDay): boolean => {
    if (!value) return false;
    return (
      value.getDate() === day.fullDate.getDate() &&
      value.getMonth() === day.fullDate.getMonth() &&
      value.getFullYear() === day.fullDate.getFullYear()
    );
  };

  const handleDateClick = (day: CalendarDay) => {
    const dayConfig = getDayConfig(day);
    const disabled = dayConfig?.disabled || isDateDisabled(day);

    if (disabled) return;

    onChange?.(day.fullDate);
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
              onClick={handlePrevMonth}
              icon="angle-left-small"
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
              <Dropdown>
                <DropdownTrigger>
                  <ButtonDropdown />
                </DropdownTrigger>
                <DropdownContent className="max-h-48 max-w-[100px] space-y-1 overflow-y-auto p-1!">
                  {months.map((month, index) => (
                    <ItemDropdown
                      onClick={() => setCurrentMonth(index)}
                      key={index}
                      active={currentMonth === index}
                      value={month}
                    />
                  ))}
                </DropdownContent>
              </Dropdown>
            )}

            {/* current month - year */}
            <Text
              as={"span"}
              variant="t1"
              weight="semibold"
              value={`${months[currentMonth]} - ${currentYear}`}
              align={"center"}
            />

            {/* year */}
            {showNavigator && (
              <Dropdown>
                <DropdownTrigger>
                  <ButtonDropdown />
                </DropdownTrigger>
                <DropdownContent className="max-h-48 max-w-[100px] space-y-1 overflow-y-auto p-1!">
                  {years.map((year) => (
                    <ItemDropdown
                      key={year}
                      onClick={() => setCurrentYear(year)}
                      active={currentYear === year}
                      value={year.toString()}
                    />
                  ))}
                </DropdownContent>
              </Dropdown>
            )}
          </div>

          {/* Next Month Button */}
          {showNavigator && (
            <ButtonNavigator
              onClick={handleNextMonth}
              icon="angle-right-small"
            />
          )}
        </div>
      )}

      {/* Days of week */}
      <div
        className={cn("calendar-cols mb-3 grid gap-x-1", weekWrapperClassname)}
      >
        {daysOfWeek.map((day) => (
          <Text
            key={day}
            as={"h5"}
            weight="medium"
            value={day}
            className="text-gray-600!"
            align="center"
          />
        ))}
      </div>

      {/* Calendar grid */}
      <div
        className={cn(
          "calendar-cols grid gap-x-1 gap-y-1",
          dayWrapperClassname,
        )}
      >
        {calendarDays.map((day, index) => {
          const dayConfig = getDayConfig(day as CalendarDay);
          const isDisabled = dayConfig?.disabled || isDateDisabled(day as CalendarDay); //prettier-ignore
          const isSelected = isDateSelected(day as CalendarDay);
          const dots = dayConfig?.dots || [];
          const isCurrentMonth = day.month === "current";

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day as CalendarDay)}
              disabled={isDisabled && day.month === "current"}
              style={getDayStyle({
                selected: isSelected,
                day: day as CalendarDay,
                disabled: isDisabled,
                styleConfig,
              })}
              className={cn(
                "flex size-9 flex-col items-center justify-center rounded-full text-sm font-medium transition-all duration-200",
                getCursorClass({ isDisabled, isCurrentMonth }),
                getTextColorClass({
                  isCurrentMonth,
                  isSelected,
                  isDisabled,
                  styleConfig,
                }),
                getBackgroundClass({
                  isSelected,
                  isDisabled,
                  isCurrentMonth,
                  styleConfig,
                }),
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

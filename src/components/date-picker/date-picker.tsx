import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Calendar, type DateRange } from "../calendar";
import { Dropdown, DropdownContent, DropdownTrigger } from "../dropdown";
import { Icon } from "../icons";
import { Input } from "../input";
import { formatDateToString, getFormatConfig, parseMonthName } from "./helpers";
import { Button } from "../button";
import { ChipGroup, type ChipOptionProps, type ChipValue } from "../chip";
import type { DatePickerProps } from "./type";
import clsx from "clsx";

const DatePicker = ({
  format = "DD-MM-YYYY",
  mode = "single",
  value: controlledValue,
  rangeValue: controlledRangeValue,
  onChange: controlledOnChange,
  onRangeChange: controlledOnRangeChange,
  trigger,
  open,
  onOpenChange,
  calendarProps,
  endDateCalendarProps,
  startDateCalendarProps,
  wrapperClassName,
  size = "md",
  showController = true,
  align = "start",
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    controlledValue || null,
  );
  const [dateRange, setDateRange] = useState<DateRange>(
    controlledRangeValue || { start: null, end: null },
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCalendarShow, setIsCalendarShow] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<ChipValue[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filterCalendar: ChipOptionProps[] = [
    {
      label: "Last Week",
      value: 0,
    },
    {
      label: "Last 7 Days",
      value: 1,
    },
    {
      label: "Last 30 Days",
      value: 2,
    },
    {
      label: "Current Month",
      value: 3,
    },
    {
      label: "Last Year",
      value: 4,
    },
  ];

  // Check if format uses month names
  const usesMonthName = format.includes("MMM");
  const formatConfig = getFormatConfig(format);

  // Format date range to string
  const formatRangeToString = (range: DateRange): string => {
    if (!range.start && !range.end) return "";
    if (range.start && !range.end)
      return formatDateToString(range.start, format);
    if (!range.start && range.end) return formatDateToString(range.end, format);
    return `${formatDateToString(range.start, format)} - ${formatDateToString(range.end, format)}`;
  };

  // Parse custom format to Date
  const parseStringToDate = (dateString: string): Date | null => {
    let day = 0;
    let month = 0;
    let year = 0;

    try {
      switch (format) {
        case "DD-MM-YYYY": {
          const parts = dateString.split("-");
          if (parts.length !== 3) return null;
          day = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
          break;
        }
        case "DD/MM/YYYY": {
          const parts = dateString.split("/");
          if (parts.length !== 3) return null;
          day = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
          break;
        }
        case "DD MMM YYYY":
        case "DD MMMM YYYY": {
          const parts = dateString.split(" ");
          if (parts.length !== 3) return null;
          day = parseInt(parts[0], 10);
          const monthNum = parseMonthName(parts[1]);
          if (!monthNum) return null;
          month = monthNum;
          year = parseInt(parts[2], 10);
          break;
        }
        case "YYYY-MM-DD": {
          const parts = dateString.split("-");
          if (parts.length !== 3) return null;
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          day = parseInt(parts[2], 10);
          break;
        }
        case "MM/DD/YYYY": {
          const parts = dateString.split("/");
          if (parts.length !== 3) return null;
          month = parseInt(parts[0], 10);
          day = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
          break;
        }
        default:
          return null;
      }

      if (
        isNaN(day) ||
        isNaN(month) ||
        isNaN(year) ||
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12 ||
        year < 1900 ||
        year > 2100
      ) {
        return null;
      }

      const date = new Date(year, month - 1, day);

      if (
        date.getDate() !== day ||
        date.getMonth() !== month - 1 ||
        date.getFullYear() !== year
      ) {
        return null;
      }

      return date;
    } catch {
      return null;
    }
  };

  // Auto-format input as user types
  const autoFormatInput = (value: string): string => {
    if (usesMonthName) {
      return value;
    }

    const { separator } = formatConfig;

    const separatorRegex = separator === "/" ? "\\/" : separator;
    const regex = new RegExp(`[^\\d${separatorRegex}]`, "g");
    let formatted = value.replace(regex, "");

    if (format === "DD-MM-YYYY" || format === "DD/MM/YYYY") {
      if (formatted.length === 2 && !formatted.includes(separator)) {
        formatted = formatted + separator;
      } else if (
        formatted.length === 5 &&
        formatted.split(separator).length === 2
      ) {
        formatted = formatted + separator;
      }
    } else if (format === "YYYY-MM-DD") {
      if (formatted.length === 4 && !formatted.includes(separator)) {
        formatted = formatted + separator;
      } else if (
        formatted.length === 7 &&
        formatted.split(separator).length === 2
      ) {
        formatted = formatted + separator;
      }
    } else if (format === "MM/DD/YYYY") {
      if (formatted.length === 2 && !formatted.includes(separator)) {
        formatted = formatted + separator;
      } else if (
        formatted.length === 5 &&
        formatted.split(separator).length === 2
      ) {
        formatted = formatted + separator;
      }
    }

    if (formatted.length > formatConfig.maxLength) {
      formatted = formatted.slice(0, formatConfig.maxLength);
    }

    return formatted;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = usesMonthName ? value : autoFormatInput(value);

    setInputValue(formatted);

    if (mode === "single") {
      if (usesMonthName) {
        const parsedDate = parseStringToDate(formatted);
        if (parsedDate) {
          setSelectedDate(parsedDate);
          controlledOnChange?.(parsedDate);
        }
      } else {
        if (formatted.length === formatConfig.maxLength) {
          const parsedDate = parseStringToDate(formatted);
          if (parsedDate) {
            setSelectedDate(parsedDate);
            controlledOnChange?.(parsedDate);
          }
        } else {
          setSelectedDate(null);
          controlledOnChange?.(null);
        }
      }
    }
  };

  // Handle calendar selection for single mode
  const handleCalendarChange = (date: Date) => {
    setSelectedDate(date);
    setInputValue(formatDateToString(date, format));
    controlledOnChange?.(date);

    setIsCalendarShow(false);
    onOpenChange?.(false);
  };

  // Handle calendar selection for range mode
  const handleRangeCalendarChange = (date: Date) => {
    let newRange: DateRange;

    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      // Start new range
      newRange = { start: date, end: null };
    } else {
      // Complete the range
      if (date < dateRange.start) {
        newRange = { start: date, end: dateRange.start };
      } else {
        newRange = { start: dateRange.start, end: date };
      }
    }

    setSelectedFilter([]);
    setDateRange(newRange);
  };

  const handleApplyDateRange = () => {
    setInputValue(formatRangeToString(dateRange));
    controlledOnRangeChange?.(dateRange);

    onOpenChange?.(false);
    setIsCalendarShow(false);
  };

  // Get next month for second calendar
  const getNextMonth = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return {
      month: nextMonth.getMonth(),
      year: nextMonth.getFullYear(),
    };
  };

  const nextMonthData = getNextMonth();

  // Sync with controlled value
  useEffect(() => {
    if (mode === "single" && controlledValue) {
      setSelectedDate(controlledValue);
      setInputValue(formatDateToString(controlledValue, format));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledValue, mode]);

  // Sync with controlled range value
  useEffect(() => {
    if (mode === "range" && controlledRangeValue) {
      setDateRange(controlledRangeValue);
      setInputValue(formatRangeToString(controlledRangeValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledRangeValue, mode, open]);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (open !== undefined) {
      setIsCalendarShow(open);
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative flex max-w-sm flex-col">
      <Dropdown
        open={isCalendarShow}
        onOpenChange={(open) => {
          setIsCalendarShow(open);
          onOpenChange?.(open);

          if (mode === "range" && controlledRangeValue) {
            setDateRange(controlledRangeValue);
          }
        }}
      >
        <DropdownTrigger asChild={!!trigger}>
          {!trigger ? (
            <Input
              type="text"
              mergedAddon
              className="pl-0"
              leftAddonClassName="pr-1!"
              leftAddon={<Icon name="calendar" className="text-gray-900" />}
              placeholder={
                mode === "range"
                  ? `${formatConfig.placeholder} - ${formatConfig.placeholder}`
                  : formatConfig.placeholder
              }
              onChange={handleInputChange}
              value={inputValue}
              readOnly={mode === "range"}
            />
          ) : (
            trigger
          )}
        </DropdownTrigger>

        <DropdownContent
          align={align}
          sideOffset={5}
          className={clsx("z-10 overflow-hidden p-0", wrapperClassName)}
        >
          <div className="top-full z-10">
            {mode === "single" ? (
              <Calendar
                size={size}
                wrapperClassname="w-full border-0"
                weekWrapperClassname="w-full justify-between"
                dayWrapperClassname="justify-between"
                onChange={handleCalendarChange}
                value={selectedDate}
                {...calendarProps}
              />
            ) : (
              <div className="flex">
                {showController && (
                  <div className="flex flex-col items-start gap-2 border-r border-gray-400 px-3 py-6.5">
                    <ChipGroup
                      direction="vertical"
                      options={filterCalendar}
                      selected={selectedFilter}
                      onSelect={(val) => {
                        setSelectedFilter(val);
                        const now = new Date();

                        const end = new Date();
                        const start = new Date();

                        if (val[0] === 0) {
                          const day = now.getDay(); // 0 = Minggu
                          const diffToMonday = day === 0 ? -6 : 1 - day;

                          const startOfThisWeek = new Date(now);
                          startOfThisWeek.setDate(now.getDate() + diffToMonday);
                          startOfThisWeek.setHours(0, 0, 0, 0);

                          const startOfLastWeek = new Date(startOfThisWeek);
                          startOfLastWeek.setDate(
                            startOfThisWeek.getDate() - 7,
                          );

                          const endOfLastWeek = new Date(startOfThisWeek);
                          endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);
                          endOfLastWeek.setHours(23, 59, 59, 999);

                          setDateRange({
                            start: startOfLastWeek,
                            end: endOfLastWeek,
                          });
                        } else if (val[0] === 1) {
                          start.setDate(end.getDate() - 7);

                          start.setHours(0, 0, 0, 0);
                          end.setHours(23, 59, 59, 999);

                          setDateRange({
                            start,
                            end,
                          });
                        } else if (val[0] === 2) {
                          start.setDate(end.getDate() - 29);

                          start.setHours(0, 0, 0, 0);
                          end.setHours(23, 59, 59, 999);

                          setDateRange({
                            start,
                            end,
                          });
                        } else if (val[0] === 3) {
                          const start = new Date(
                            now.getFullYear(),
                            now.getMonth(),
                            1,
                          );
                          const end = new Date(
                            now.getFullYear(),
                            now.getMonth() + 1,
                            0,
                          );

                          start.setHours(0, 0, 0, 0);
                          end.setHours(23, 59, 59, 999);

                          setDateRange({
                            start,
                            end,
                          });
                        } else if (val[0] === 4) {
                          start.setFullYear(end.getFullYear() - 1);

                          start.setHours(0, 0, 0, 0);
                          end.setHours(23, 59, 59, 999);

                          setDateRange({
                            start,
                            end,
                          });
                        }
                      }}
                      color="gray"
                      size={size}
                    />
                    <Button
                      color="danger"
                      variant={"outline"}
                      size={size}
                      onClick={() => {
                        setDateRange({ start: null, end: null });
                        setSelectedFilter([]);
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                )}

                <div className="flex flex-col">
                  <div
                    className={cn("flex", isMobile ? "flex-col" : "flex-row")}
                  >
                    {/* First Calendar */}
                    <Calendar
                      size={size}
                      wrapperClassname="w-full rounded-none! border-0"
                      weekWrapperClassname="w-full justify-between"
                      dayWrapperClassname="justify-between"
                      onChange={handleRangeCalendarChange}
                      value={dateRange.start}
                      rangeValue={dateRange}
                      mode="range"
                      {...startDateCalendarProps}
                    />
                    {/* Second Calendar (desktop only) */}
                    {!isMobile && (
                      <Calendar
                        size={size}
                        wrapperClassname="w-full rounded-none border-0 border-l"
                        weekWrapperClassname="w-full justify-between"
                        dayWrapperClassname="justify-between"
                        onChange={handleRangeCalendarChange}
                        value={dateRange.end}
                        rangeValue={dateRange}
                        mode="range"
                        defaultMonth={nextMonthData.month}
                        defaultYear={nextMonthData.year}
                        {...endDateCalendarProps}
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2 border-t border-gray-300 px-4 py-3 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                      <Input
                        size={size}
                        readOnly
                        className="w-30 truncate"
                        placeholder="Start Date"
                        value={formatDateToString(
                          dateRange.start,
                          "DD MMM YYYY",
                        )}
                      />
                      <Icon name="minus" size={16} />
                      <Input
                        size={size}
                        readOnly
                        placeholder="End Date"
                        className="w-30 truncate"
                        value={formatDateToString(dateRange.end, "DD MMM YYYY")}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => setIsCalendarShow(false)}
                        variant={"tertiary"}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleApplyDateRange}>Apply</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

export { DatePicker };

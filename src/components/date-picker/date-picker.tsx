import { useRef, useState, useEffect } from "react";
import { Calendar } from "../calendar";
import { Icon } from "../icons";
import { Input } from "../input";
import { cn } from "../../lib/utils";

type DateFormat =
  | "DD-MM-YYYY"
  | "DD/MM/YYYY"
  | "DD MMM YYYY"
  | "DD MMMM YYYY"
  | "YYYY-MM-DD"
  | "MM/DD/YYYY";

type DatePickerMode = "single" | "range";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DatePickerProps {
  format?: DateFormat;
  mode?: DatePickerMode;
  value?: Date | null;
  rangeValue?: DateRange;
  onChange?: (date: Date | null) => void;
  onRangeChange?: (range: DateRange) => void;
}

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Oct",
  "Nov",
  "Des",
];
const monthsFull = [
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
];

const DatePicker = ({
  format = "DD-MM-YYYY",
  mode = "single",
  value: controlledValue,
  rangeValue: controlledRangeValue,
  onChange: controlledOnChange,
  onRangeChange: controlledOnRangeChange,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    controlledValue || null,
  );
  const [dateRange, setDateRange] = useState<DateRange>(
    controlledRangeValue || { start: null, end: null },
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check if format uses month names
  const usesMonthName = format.includes("MMM");

  // Get format configuration
  const getFormatConfig = (format: DateFormat) => {
    switch (format) {
      case "DD-MM-YYYY":
        return { separator: "-", placeholder: "DD-MM-YYYY", maxLength: 10 };
      case "DD/MM/YYYY":
        return { separator: "/", placeholder: "DD/MM/YYYY", maxLength: 10 };
      case "DD MMM YYYY":
        return { separator: " ", placeholder: "DD MMM YYYY", maxLength: 11 };
      case "DD MMMM YYYY":
        return { separator: " ", placeholder: "DD MMMM YYYY", maxLength: 18 };
      case "YYYY-MM-DD":
        return { separator: "-", placeholder: "YYYY-MM-DD", maxLength: 10 };
      case "MM/DD/YYYY":
        return { separator: "/", placeholder: "MM/DD/YYYY", maxLength: 10 };
      default:
        return { separator: "-", placeholder: "DD-MM-YYYY", maxLength: 10 };
    }
  };

  const formatConfig = getFormatConfig(format);

  // Format Date to custom format
  const formatDateToString = (date: Date | null): string => {
    if (!date) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const monthShort = monthsShort[date.getMonth()];
    const monthFull = monthsFull[date.getMonth()];
    const year = date.getFullYear();

    switch (format) {
      case "DD-MM-YYYY":
        return `${day}-${month}-${year}`;
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "DD MMM YYYY":
        return `${day} ${monthShort} ${year}`;
      case "DD MMMM YYYY":
        return `${day} ${monthFull} ${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;
      default:
        return `${day}-${month}-${year}`;
    }
  };

  // Format date range to string
  const formatRangeToString = (range: DateRange): string => {
    if (!range.start && !range.end) return "";
    if (range.start && !range.end) return formatDateToString(range.start);
    if (!range.start && range.end) return formatDateToString(range.end);
    return `${formatDateToString(range.start)} - ${formatDateToString(range.end)}`;
  };

  // Parse month name to number
  const parseMonthName = (monthStr: string): number | null => {
    const monthLower = monthStr.toLowerCase();

    const shortIndex = monthsShort.findIndex(
      (m) => m.toLowerCase() === monthLower,
    );
    if (shortIndex !== -1) return shortIndex + 1;

    const fullIndex = monthsFull.findIndex(
      (m) => m.toLowerCase() === monthLower,
    );
    if (fullIndex !== -1) return fullIndex + 1;

    return null;
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
    setInputValue(formatDateToString(date));
    setShowCalendar(false);
    controlledOnChange?.(date);
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

    setDateRange(newRange);
    setInputValue(formatRangeToString(newRange));
    controlledOnRangeChange?.(newRange);
  };

  // Handle input focus
  const handleInputFocus = () => {
    setShowCalendar(true);
  };

  // Handle input blur
  const handleInputBlur = () => {
    if (mode === "single") {
      const parsedDate = parseStringToDate(inputValue);
      if (parsedDate) {
        setSelectedDate(parsedDate);
        setInputValue(formatDateToString(parsedDate));
        controlledOnChange?.(parsedDate);
      } else if (inputValue.length > 0) {
        setInputValue("");
        setSelectedDate(null);
        controlledOnChange?.(null);
      }
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Sync with controlled value
  useEffect(() => {
    if (mode === "single" && controlledValue) {
      setSelectedDate(controlledValue);
      setInputValue(formatDateToString(controlledValue));
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
  }, [controlledRangeValue, mode]);

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

  return (
    <div ref={containerRef} className="relative flex max-w-sm flex-col">
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
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={inputValue}
        readOnly={mode === "range"}
      />

      {showCalendar && (
        <div className="absolute top-full z-10 mt-2">
          {mode === "single" ? (
            <Calendar
              wrapperClassname="w-full"
              weekWrapperClassname="w-full justify-between"
              dayWrapperClassname="justify-between"
              onChange={handleCalendarChange}
              value={selectedDate}
            />
          ) : (
            <div className="flex flex-col">
              <div className={cn("flex", isMobile ? "flex-col" : "flex-row")}>
                {/* First Calendar */}
                <Calendar
                  wrapperClassname="w-full rounded-none! border-r-0"
                  weekWrapperClassname="w-full justify-between"
                  dayWrapperClassname="justify-between"
                  onChange={handleRangeCalendarChange}
                  value={dateRange.start}
                  rangeValue={dateRange}
                  mode="range"
                  showNextNavigator={isMobile}
                  showPrevNavigator={true}
                />
                {/* Second Calendar (desktop only) */}
                {!isMobile && (
                  <Calendar
                    wrapperClassname="w-full rounded-none"
                    weekWrapperClassname="w-full justify-between"
                    dayWrapperClassname="justify-between"
                    onChange={handleRangeCalendarChange}
                    value={dateRange.start}
                    rangeValue={dateRange}
                    mode="range"
                    defaultMonth={nextMonthData.month}
                    defaultYear={nextMonthData.year}
                    showNextNavigator={true}
                    showPrevNavigator={false}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { DatePicker };
export type { DateFormat, DatePickerMode, DateRange };

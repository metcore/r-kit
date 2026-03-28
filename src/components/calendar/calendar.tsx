import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { createCalendarHelpers } from './helpers/create-calendar-helpers';
import { getCalendarDays } from './helpers/helpers';
import { ButtonNavigator } from './partials/button-navigator';
import { CalendarGrid } from './partials/calendar-grid';
import { CalendarHeader } from './partials/calendar-header';
import DaysOfWeek from './partials/days-of-week';
import { ButtonDropdown, ItemDropdown } from './partials/dropdown';
import type { CalendarDay, CalendarProps, CalendarTypes } from './type';
import clsx from 'clsx';
import { Icon } from '../icons';
import { Text } from '../text';
import { Button } from '../button';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '../dropdown';
import { typeOptions } from './constants';

const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const month = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

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
  daysOfWeek = days,
  months = month,
  showNextNavigator = true,
  showPrevNavigator = true,
  mode = 'single',
  rangeValue,
  size = 'md',
  variant = 'default',
  events,
  showCalendarTooltip = true,
  type = 'month',
  onTypeChange,
}: CalendarProps) => {
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(defaultMonth ?? currentDate.getMonth()); //prettier-ignore
  const [currentYear, setCurrentYear] = useState(defaultYear ?? currentDate.getFullYear()); //prettier-ignore

  const [isDropdownYearShow, setIsDropdownYearShow] = useState(false);
  const [isDropdownMonthShow, setIsDropdownMonthShow] = useState(false);

  const [selectedType, setSelectedType] = useState<CalendarTypes>(type);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number | null>(
    null
  );

  const calendarDays = getCalendarDays({ currentMonth, currentYear });

  const calendarHelpers = createCalendarHelpers({
    disabledDates,
    dayConfigs,
    rangeValue,
    mode,
    value,
  });

  const calendarState = {
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
  };

  const dropdownState = {
    isMonthOpen: isDropdownMonthShow,
    setMonthOpen: setIsDropdownMonthShow,
    isYearOpen: isDropdownYearShow,
    setYearOpen: setIsDropdownYearShow,
  };

  const handleDateClick = (day: CalendarDay) => {
    const dayConfig = calendarHelpers.getDayConfig(day);
    const disabled = (dayConfig?.disabled ?? false) || calendarHelpers.isDateDisabled(day); //prettier-ignore

    if (disabled) {
      return;
    }

    onChange?.(day.fullDate);
  };

  const changeMonth = (delta: number) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  useEffect(() => {
    if (value !== undefined) {
      setCurrentMonth(
        value?.getMonth() ?? defaultMonth ?? currentDate?.getMonth()
      );

      setCurrentYear(
        value?.getFullYear() ?? defaultYear ?? currentDate?.getFullYear()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (type !== undefined) {
      setSelectedType(type);
    }
  }, [type]);

  return (
    <div className={clsx(variant === 'default' && 'flex flex-col gap-2')}>
      {variant === 'default' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="*:cursor-pointer">
              <ButtonNavigation onClick={() => changeMonth(-1)} type="prev" />
              <ButtonNavigation onClick={() => changeMonth(1)} type="next" />
            </div>
            <Text
              variant="h4"
              weight="semibold"
              className="-translate-y-0.5 text-gray-900"
            >
              {months[currentMonth]} {currentYear}
            </Text>
          </div>

          {/* Select Type */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              color="gray"
              variant={'outline'}
              className="capitalize"
            >
              Today
            </Button>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  size="sm"
                  color="gray"
                  variant={'outline'}
                  className="flex items-center capitalize"
                >
                  {selectedType} <Icon name="angle-down-small" size={20} />
                </Button>
              </DropdownTrigger>

              <DropdownContent
                align="end"
                className="w-36 *:rounded-md *:border-0"
              >
                {typeOptions.map((option, index) => (
                  <DropdownItem
                    key={option.value}
                    onFocus={() => setSelectedTypeIndex(index)}
                    onClick={() => {
                      setSelectedType(option.value);
                      onTypeChange?.(option.value);
                    }}
                    className={clsx(
                      (selectedType === option.value ||
                        index === selectedTypeIndex) &&
                        'bg-primary-50!'
                    )}
                  >
                    <Text className="text-gray-900">{option.label}</Text>
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
          {/* select type end */}
        </div>
      )}

      <div
        className={cn(
          'border bg-white',
          variant === 'compact' && 'mx-auto w-fit rounded-2xl border-gray-200 p-6 ', //prettier-ignore
          variant === 'default' && 'overflow-hidden rounded-xl border-gray-300', //prettier-ignore
          wrapperClassname
        )}
      >
        {/* type week */}
        {selectedType === 'week' && (
          <div>
            <DaysOfWeek
              type="week"
              size={size}
              variant={variant}
              daysOfWeek={daysOfWeek}
              wrapperClassName={weekWrapperClassname}
            />
          </div>
        )}

        {/* type year */}
        {type === 'year' && (
          <div className="grid w-full grid-cols-3">
            <CalendarGrid
              className={dayWrapperClassname}
              days={calendarDays as CalendarDay[]}
              helpers={calendarHelpers}
              size={size}
              mode={mode}
              styleConfig={styleConfig}
              onClick={handleDateClick}
              variant={variant}
              events={events}
              showCalendarTooltip={showCalendarTooltip}
            />
          </div>
        )}

        {/* type month */}
        {selectedType === 'month' && (
          <>
            {/* Header with navigation */}
            {showHeader && variant === 'compact' && (
              <CalendarHeader
                size={size}
                calendar={calendarState}
                dropdown={dropdownState}
                handleNextMonth={() => changeMonth(1)}
                handlePrevMonth={() => changeMonth(-1)}
                showNavigator={showNavigator}
                months={months}
                showNextNavigator={showNextNavigator}
                showPrevNavigator={showPrevNavigator}
              />
            )}

            {/* Days of week */}
            <DaysOfWeek
              size={size}
              variant={variant}
              daysOfWeek={daysOfWeek}
              wrapperClassName={weekWrapperClassname}
            />

            {/* Calendar grid */}
            <CalendarGrid
              className={dayWrapperClassname}
              days={calendarDays as CalendarDay[]}
              helpers={calendarHelpers}
              size={size}
              mode={mode}
              styleConfig={styleConfig}
              onClick={handleDateClick}
              variant={variant}
              events={events}
              showCalendarTooltip={showCalendarTooltip}
            />
          </>
        )}
      </div>
    </div>
  );
};

const ButtonNavigation = ({
  onClick,
  type,
}: {
  onClick: () => void;
  type?: 'prev' | 'next';
}) => {
  return (
    <button onClick={onClick}>
      <Icon
        name={type === 'next' ? 'angle-right-small' : 'angle-left-small'}
        size={30}
        className="text-gray-900"
      />
    </button>
  );
};

export { ButtonDropdown, ButtonNavigator, Calendar, ItemDropdown };

import { useMemo } from 'react';
import { Text, type TextVariant } from '../../text';
import type { CalendarProps, CalendarState, DropdownState } from '../type';
import { ButtonNavigator } from './button-navigator';
import { ButtonDropdown, DropdownWrapper, ItemDropdown } from './dropdown';

const header_size_map: Record<string, TextVariant> = {
  sm: 't2',
  md: 't1',
  lg: 'p3',
};

export type CalendarHeaderProps = {
  size: CalendarProps['size']; // sesuaikan sama variant lu
  showNavigator: boolean;
  months: string[];

  calendar: CalendarState;
  dropdown: DropdownState;

  handlePrevMonth: () => void;
  handleNextMonth: () => void;

  showPrevNavigator: boolean;
  showNextNavigator: boolean;
};

function CalendarHeader({
  size = 'md',
  showNavigator,
  calendar,
  dropdown,
  months,
  handleNextMonth,
  handlePrevMonth,
  showNextNavigator,
  showPrevNavigator,
}: CalendarHeaderProps) {
  const { currentMonth, currentYear } = calendar;

  const years = useMemo(() => {
    const yearRange = [];
    for (let i = currentYear - 100; i <= currentYear + 100; i++) {
      yearRange.push(i);
    }
    return yearRange;
  }, [currentYear]);

  return (
    <div className="mb-6 flex items-center justify-between">
      {showNavigator && (
        <NavigatorButton
          size={size}
          direction="prev"
          onClick={handlePrevMonth}
          visible={showPrevNavigator}
        />
      )}

      <div className="flex items-center gap-2">
        {showNavigator && (
          <MonthDropdown
            months={months}
            calendar={calendar}
            dropdown={dropdown}
          />
        )}

        <Text
          as="span"
          variant={header_size_map[size]}
          weight="semibold"
          value={`${months[currentMonth]} - ${currentYear}`}
        />

        {showNavigator && (
          <YearDropdown years={years} calendar={calendar} dropdown={dropdown} />
        )}
      </div>

      {showNavigator && (
        <NavigatorButton
          direction="next"
          size={size}
          onClick={handleNextMonth}
          visible={showNextNavigator}
        />
      )}
    </div>
  );
}

interface MonthDropdownProps {
  months: string[];
  calendar: CalendarState;
  dropdown: DropdownState;
}

function MonthDropdown({ months, calendar, dropdown }: MonthDropdownProps) {
  const { currentMonth, setCurrentMonth } = calendar;
  const { isMonthOpen, setMonthOpen } = dropdown;

  return (
    <div>
      <ButtonDropdown
        onClick={() => setMonthOpen(!isMonthOpen)}
        active={isMonthOpen}
      />

      {isMonthOpen && (
        <DropdownWrapper onClose={setMonthOpen}>
          {months.map((month, index) => (
            <ItemDropdown
              key={index}
              onClick={() => setCurrentMonth(index)}
              active={currentMonth === index}
              value={month}
            />
          ))}
        </DropdownWrapper>
      )}
    </div>
  );
}

interface YearDropdownProps {
  calendar: CalendarState;
  dropdown: DropdownState;
  years: number[];
}

function YearDropdown({ calendar, dropdown, years }: YearDropdownProps) {
  const { currentYear, setCurrentYear } = calendar;
  const { isYearOpen, setYearOpen } = dropdown;

  return (
    <div>
      <ButtonDropdown
        onClick={() => setYearOpen(!isYearOpen)}
        active={isYearOpen}
      />

      {isYearOpen && (
        <DropdownWrapper onClose={setYearOpen}>
          {years.map((year) => (
            <ItemDropdown
              key={year}
              onClick={() => setCurrentYear(year)}
              active={currentYear === year}
              value={year.toString()}
            />
          ))}
        </DropdownWrapper>
      )}
    </div>
  );
}

export type NavigatorButtonProps = {
  direction: 'prev' | 'next';
  size: CalendarProps['size'];
  onClick: () => void;
  visible?: boolean;
};

function NavigatorButton({
  direction,
  size,
  onClick,
  visible = true,
}: NavigatorButtonProps) {
  const icon = direction === 'prev' ? 'angle-left-small' : 'angle-right-small';

  return (
    <ButtonNavigator
      size={size}
      onClick={onClick}
      icon={icon}
      className={visible ? '' : 'pointer-events-none opacity-0'}
    />
  );
}

export { CalendarHeader, MonthDropdown, YearDropdown };

import clsx from 'clsx';
import { formatDateLocal } from '../../date-picker';
import { Icon } from '../../icons';
import createDateStyleHelpers from '../helpers/create-date-style-helpers';
import type { CalendarDayItemProps } from '../type';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip';

const date_size_map: Record<string, string> = {
  md: 'size-7.5',
  sm: 'size-6',
  lg: 'size-9',
};

export default function CalendarDayItem({
  day,
  helpers,
  size,
  mode,
  styleConfig,
  onClick,
  variant,
  events,
  backdropOnClick,
}: CalendarDayItemProps) {
  const dayConfig = helpers.getDayConfig(day);
  const isSelected = helpers.isDateSelected(day);
  const dots = dayConfig?.dots || [];
  const isCurrentMonth = day.month === 'current';
  const isDisabled = (dayConfig?.disabled ?? false) || helpers.isDateDisabled(day); //prettier-ignore

  const rangeStart = helpers.isRangeStart(day);
  const rangeEnd = helpers.isRangeEnd(day);

  const currentDate = formatDateLocal(day.fullDate);

  const hasEvent = events?.find((event) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    return new Date(currentDate) >= start && new Date(currentDate) <= end;
  })?.title;

  const styleHelpers = createDateStyleHelpers({
    day,
    isSelected: isSelected || rangeStart || rangeEnd,
    isCurrentMonth,
    isDisabled,
    styleConfig,
  });

  return (
    <button
      style={styleHelpers.getDayStyle()}
      onClick={() => onClick(day)}
      disabled={isDisabled && isCurrentMonth}
      className={clsx(
        date_size_map[size ?? 'md'],
        styleHelpers.getCursorClass(),
        styleHelpers.getTextColorClass(),
        'group relative flex flex-col items-center justify-center rounded-full text-sm font-medium transition-all duration-200',
        mode === 'single' && variant === 'compact' && styleHelpers.getBackgroundClass(), //prettier-ignore
        mode === 'range' && !isDisabled && helpers.getRangeBackgroundClass(day),
        variant === 'default' && 'h-28 md:h-36 w-full rounded-none flex items-start justify-start group p-1 md:p-3 border-r border-gray-300' //prettier-ignore
      )}
    >
      <div
        className="absolute inset-0 size-full cursor-pointer"
        onClick={() => backdropOnClick?.(day)}
      />

      <h5
        className={clsx(
          'font-metropolis text-xs transition-colors',
          variant === 'default' && 'grid size-8 place-items-center justify-center rounded-full', //prettier-ignore
          mode === 'single' && variant === 'default' && styleHelpers.getBackgroundClass() //prettier-ignore
        )}
      >
        {day.date}
      </h5>

      {variant === 'default' &&
        Boolean(hasEvent) === false &&
        backdropOnClick && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Tooltip>
              <TooltipTrigger className="cursor-pointer">
                <Icon
                  name="plus"
                  className="text-gray-700! opacity-0 transition-opacity group-hover:opacity-100"
                  size={20}
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">Add Schedule</TooltipContent>
            </Tooltip>
          </div>
        )}

      {variant === 'compact' && dots.length > 0 && (
        <div className="-mb-1 flex gap-0.5">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="size-1 rounded-full"
              style={{
                backgroundColor: dot.color ?? '#d1d5db',
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
}

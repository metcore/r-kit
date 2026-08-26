import { useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Text } from '../../text';
import { formatClock } from '../helpers/helpers';
import type { CalendarEvent } from '../type';
import { getBgColor, getRibbonColor } from './event-bar';

interface Props {
  event: CalendarEvent;
  showTooltip?: boolean;
  onClick?: () => void;
}

export default function TimedEventBlock({
  event,
  showTooltip = true,
  onClick,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={(e) => {
        setPos({ x: e.clientX, y: e.clientY });
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      className={clsx(
        'relative mt-1 flex w-full items-center overflow-hidden rounded p-1.5 text-left text-[11px] leading-4 font-medium first:mt-0',
        onClick && 'cursor-pointer'
      )}
      style={{ backgroundColor: getBgColor(event.color) }}
    >
      <span
        className="absolute top-0 left-0 h-full w-1"
        style={{ backgroundColor: getRibbonColor(event.color) }}
      />

      <div className="flex flex-col gap-px pl-2 *:line-clamp-1">
        <Text variant="t3" weight="semibold" className="text-gray-800">
          {event.title}
        </Text>
        <Text variant="t3" className="text-gray-700">
          {formatClock(event.startDateTime!)} -{' '}
          {formatClock(event.endDateTime!)}
        </Text>
      </div>

      {hovered &&
        showTooltip === true &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50"
            style={{
              top: pos.y > window.innerHeight - 150 ? pos.y - 12 : pos.y + 12,
              left: pos.x + 12,
              transform:
                pos.y > window.innerHeight - 150
                  ? 'translateY(-100%)'
                  : undefined,
            }}
          >
            <div className="flex max-w-xs flex-col rounded-lg bg-white p-3 shadow">
              <Text
                variant="t3"
                weight="semibold"
                className="truncate text-gray-800"
              >
                {event.tooltip?.title ?? event.title}
              </Text>

              {Boolean(event.tooltip?.subtitle ?? event.subtitle) && (
                <Text variant="t3" className="truncate text-gray-700">
                  {event.tooltip?.subtitle ?? event.subtitle}
                </Text>
              )}

              <div className="mt-1 flex items-center gap-1">
                <div
                  className="size-1 rounded-full"
                  style={{ backgroundColor: getRibbonColor(event.color) }}
                />
                <Text variant="t3" className="text-gray-800">
                  {event.tooltip?.label ??
                    `${formatClock(event.startDateTime!)} - ${formatClock(event.endDateTime!)}`}
                </Text>
              </div>
            </div>
          </div>,
          document.body
        )}
    </button>
  );
}

import { useState } from 'react';
import { Text } from '../../text';
import type { CalendarEvent } from '../type';
import clsx from 'clsx';

interface Props {
  segment: { event: CalendarEvent; startCol: number; span: number };
  showTooltip?: boolean;
  onClick?: () => void;
}

export default function EventBar({
  segment,
  showTooltip = true,
  onClick,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const bg_color_map = {
    info: '#F1FDFF',
    purple: '#EEEBFF',
    orange: '#FFFBED',
    success: '#EAFFEC',
    danger: '#FEF3F2',
    warning: '#FFFAEB',
    primary: '#F1F2FF',
  };

  const ribbon_color_map = {
    info: '#6CD8FF',
    purple: '#A6A6FB',
    orange: '#FFDA71',
    success: '#6BE995',
    danger: '#FDA29B',
    warning: '#FEC84B',
    primary: '#ABB1FF',
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative mx-0.5 mt-1 flex items-center justify-between overflow-hidden rounded p-1 text-[11px] leading-5 font-medium md:p-1.5"
        style={{
          gridColumn: `${segment.startCol + 1} / span ${segment.span}`,
          backgroundColor:
            bg_color_map[segment?.event?.color ?? 'info'] ?? '#F1FDFF',
        }}
      >
        <span
          className="absolute left-0 h-full w-1"
          style={{
            backgroundColor:
              ribbon_color_map[segment?.event?.color ?? 'info'] ?? '#6CD8FF',
          }}
        />

        <div className="flex flex-col gap-px pl-2 *:line-clamp-1">
          <Text variant="t3" weight="semibold" className="text-gray-800">
            {segment.event.title}
          </Text>
          <Text variant="t3" className="text-gray-700">
            {segment.event.subtitle}
          </Text>
        </div>

        <Text variant="t3" className="line-clamp-1 text-gray-800">
          {segment.event.label}
        </Text>
      </button>

      {hovered && showTooltip === true && (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            top: pos.y + 12,
            left: pos.x + 12,
          }}
        >
          <div className="flex flex-col rounded-lg bg-white p-3 shadow">
            <Text variant="t3" weight="semibold" className="text-gray-800">
              {segment.event.title}
            </Text>

            {Boolean(segment.event.subtitle) && (
              <Text variant="t3" className="text-gray-700">
                {segment.event.subtitle}
              </Text>
            )}

            {Boolean(segment.event.label) && (
              <div className="mt-1 flex items-center gap-1">
                <div
                  className="size-1 rounded-full"
                  style={{
                    backgroundColor:
                      ribbon_color_map[segment.event.color ?? 'info'] ??
                      '#6CD8FF',
                  }}
                />
                <Text variant="t3" className={clsx('text-gray-800')}>
                  {segment.event.label}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

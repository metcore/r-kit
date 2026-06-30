import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Text } from '../../text';
import type { CalendarEvent } from '../type';
import clsx from 'clsx';

interface Props {
  segment: { event: CalendarEvent; startCol: number; span: number };
  showTooltip?: boolean;
  tooltip?: CalendarEvent;
  level?: number;
  onClick?: (segment: {
    event: CalendarEvent;
    startCol: number;
    span: number;
  }) => void;
}

const bg_color_map = {
  info: '#F1FDFF',
  purple: '#EEEBFF',
  orange: '#FFFBED',
  success: '#EAFFEC',
  danger: '#FEF3F2',
  warning: '#FFFAEB',
  primary: '#F1F2FF',
} as const;

const ribbon_color_map = {
  info: '#6CD8FF',
  purple: '#A6A6FB',
  orange: '#FFDA71',
  success: '#6BE995',
  danger: '#FDA29B',
  warning: '#FEC84B',
  primary: '#ABB1FF',
} as const;

type PresetColor = keyof typeof bg_color_map;

export default function EventBar({
  segment,
  showTooltip = true,
  onClick,
  level = 0,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  const getBgColor = (color?: string) => {
    if (color == null) return bg_color_map.info;

    if (color in bg_color_map) {
      return bg_color_map[color as PresetColor];
    }

    if (/^#([A-Fa-f0-9]{6})$/.test(color)) {
      return `${color}30`;
    }

    if (/^#([A-Fa-f0-9]{3})$/.test(color)) {
      const hex = color.slice(1);
      return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}30`;
    }

    return color;
  };

  const getRibbonColor = (color?: string) => {
    if (color === undefined || color === null) return ribbon_color_map.info;
    return color in ribbon_color_map ? ribbon_color_map[color as PresetColor] : color; //prettier-ignore
  };
  return (
    <>
      <button
        type="button"
        onClick={() => onClick?.(segment)}
        onMouseEnter={(e) => {
          setPos({ x: e.clientX, y: e.clientY });
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className={clsx(
          'relative mx-0.5 mt-1 flex w-full items-center justify-between gap-3 overflow-hidden rounded p-1 text-[11px] leading-5 font-medium md:p-1.5',
          onClick && 'cursor-pointer'
        )}
        style={{
          gridRowStart: level + 1,
          gridColumn: `${segment.startCol + 1} / span ${segment.span}`,
          backgroundColor: getBgColor(segment?.event?.color),
        }}
      >
        <span
          className="absolute left-0 h-full w-1"
          style={{
            backgroundColor: getRibbonColor(segment?.event?.color),
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

        <Text variant="t3" className="line-clamp-1 shrink-0 text-gray-800">
          {segment.event.label}
        </Text>
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
                  {segment?.event?.tooltip?.title ?? segment.event.title}
                </Text>

                {Boolean(
                  segment?.event?.tooltip?.subtitle ?? segment.event.subtitle
                ) && (
                  <Text variant="t3" className="truncate text-gray-700">
                    {segment?.event?.tooltip?.subtitle ??
                      segment.event.subtitle}
                  </Text>
                )}

                {Boolean(
                  segment?.event?.tooltip?.label ?? segment.event.label
                ) && (
                  <div className="mt-1 flex items-center gap-1">
                    <div
                      className="size-1 rounded-full"
                      style={{
                        backgroundColor: getRibbonColor(segment?.event?.color),
                      }}
                    />
                    <Text variant="t3" className={clsx('text-gray-800')}>
                      {segment?.event?.tooltip?.label ?? segment.event.label}
                    </Text>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
      </button>
    </>
  );
}

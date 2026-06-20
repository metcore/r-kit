import { useCallback, useEffect, useRef, useState } from 'react';
import { Text } from '../text';
import { cn } from '../../lib/utils';

const ITEM_H = 52;
const VISIBLE = 5;
const COL_H = ITEM_H * VISIBLE;
const PAD = ITEM_H * 2;

interface RollerColumnProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  circular?: boolean;
}

const CIRCULAR_REPEAT = 40;

export function RollerColumn({
  options: rawOptions,
  value,
  onChange,
  circular = false,
}: RollerColumnProps) {
  const listOptions = circular
    ? Array.from(
        { length: rawOptions.length * CIRCULAR_REPEAT * 2 },
        (_, i) => rawOptions[i % rawOptions.length]
      )
    : rawOptions;

  const valueToIdx = (v: string) =>
    circular
      ? rawOptions.length * CIRCULAR_REPEAT + rawOptions.indexOf(v)
      : Math.max(0, listOptions.indexOf(v));

  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const prevVal = useRef(value);

  const [liveIdx, setLiveIdx] = useState(() => valueToIdx(value));

  const scrollTo = useCallback(
    (idx: number, smooth = false) => {
      const el = scrollRef.current;
      if (!el) return;
      const top = Math.max(0, Math.min(idx, listOptions.length - 1)) * ITEM_H;
      if (smooth) el.scrollTo({ top, behavior: 'smooth' });
      else el.scrollTop = top;
    },
    [listOptions.length]
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => scrollTo(valueToIdx(value), false));
    return () => cancelAnimationFrame(id);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (prevVal.current === value) return;
    prevVal.current = value;
    const idx = valueToIdx(value);
    setLiveIdx(idx);
    scrollTo(idx, true);
  }, [value, scrollTo]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, listOptions.length - 1));
    setLiveIdx(clamped);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const actual = circular
        ? rawOptions[clamped % rawOptions.length]
        : listOptions[clamped];
      prevVal.current = actual;
      onChange(actual);
    }, 80);
  };

  return (
    <div
      className="relative flex-1 overflow-hidden" // ← shrink-0 → flex-1, hapus style width
      style={{ height: COL_H }}
    >
      <div
        className="bg-primary-50 pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ top: PAD, height: ITEM_H }}
      />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="roller-scroll relative z-[1] snap-y snap-mandatory overflow-y-scroll [scrollbar-width:none]"
        style={{ height: COL_H, paddingTop: PAD, paddingBottom: PAD }}
      >
        {listOptions.map((opt, i) => {
          const isSel = i === liveIdx;
          const dist = Math.abs(i - liveIdx);
          return (
            <div
              key={`${opt}-${i}`}
              onClick={() => {
                setLiveIdx(i);
                scrollTo(i, true);
                const actual = circular
                  ? rawOptions[i % rawOptions.length]
                  : opt;
                prevVal.current = actual;
                onChange(actual);
              }}
              className={cn(
                'flex cursor-pointer snap-center items-center justify-center select-none',
                dist === 0
                  ? 'text-[#1c1c1e]'
                  : dist === 1
                    ? 'text-[#aeaeb2]'
                    : 'text-[#d1d1d6]'
              )}
              style={{ height: ITEM_H }}
            >
              <Text
                variant={isSel ? 'p1' : 'p3'}
                weight="semibold"
                className="text-gray-900"
              >
                {opt}
              </Text>
            </div>
          );
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2]"
        style={{
          height: PAD,
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.98) 10%, rgba(255,255,255,0.55) 65%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
        style={{
          height: PAD,
          background:
            'linear-gradient(to top, rgba(255,255,255,0.98) 10%, rgba(255,255,255,0.55) 65%, transparent 100%)',
        }}
      />
    </div>
  );
}

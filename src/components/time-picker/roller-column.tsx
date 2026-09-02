import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

// Buffer of repeated blocks on each side of the middle block. Doesn't need to
// cover a whole session — recenterIfNeeded() silently snaps back to the
// middle block whenever the scroll position drifts within one block of
// either edge, so the reel behaves as infinite without pre-rendering
// thousands of repeated rows for large option sets (e.g. 60 minutes).
const CIRCULAR_REPEAT = 8;

export function RollerColumn({
  options: rawOptions,
  value,
  onChange,
  circular = false,
}: RollerColumnProps) {
  const listOptions = useMemo(
    () =>
      circular
        ? Array.from(
            { length: rawOptions.length * CIRCULAR_REPEAT * 2 },
            (_, i) => rawOptions[i % rawOptions.length]
          )
        : rawOptions,
    [circular, rawOptions]
  );

  const valueToIdx = (v: string) =>
    circular
      ? rawOptions.length * CIRCULAR_REPEAT + rawOptions.indexOf(v)
      : Math.max(0, listOptions.indexOf(v));

  const scrollRef = useRef<HTMLDivElement>(null);
  const prevVal = useRef(value);
  const rafRef = useRef(0);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

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

  // Keeps the reel from ever running out of room to scroll: whenever the
  // position drifts within one block of either edge of the repeated buffer,
  // silently jump to the equivalent offset in the middle block. Content is
  // identical across blocks, so the jump is imperceptible — the reel just
  // keeps going, in either direction, indefinitely.
  const recenterIfNeeded = useCallback(() => {
    if (!circular) return;
    const el = scrollRef.current;
    if (!el) return;

    const blockSize = rawOptions.length;
    const idx = Math.round(el.scrollTop / ITEM_H);

    if (idx >= blockSize && idx < listOptions.length - blockSize) return;

    const middleBlock = Math.floor((CIRCULAR_REPEAT * 2) / 2);
    const offset = ((idx % blockSize) + blockSize) % blockSize;
    const recentered = middleBlock * blockSize + offset;

    el.scrollTop = recentered * ITEM_H;
    setLiveIdx(recentered);
  }, [circular, rawOptions.length, listOptions.length]);

  const commit = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, listOptions.length - 1));
    const actual = circular
      ? rawOptions[clamped % rawOptions.length]
      : listOptions[clamped];
    prevVal.current = actual;
    onChangeRef.current(actual);
    recenterIfNeeded();
  }, [circular, listOptions, rawOptions, recenterIfNeeded]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let fallback: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!scrollRef.current) return;
        const idx = Math.round(scrollRef.current.scrollTop / ITEM_H);
        setLiveIdx(Math.max(0, Math.min(idx, listOptions.length - 1)));
        recenterIfNeeded();
      });
      clearTimeout(fallback);
      fallback = setTimeout(commit, 200);
    };

    const onScrollEnd = () => {
      clearTimeout(fallback);
      commit();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('scrollend', onScrollEnd, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('scrollend', onScrollEnd);
      clearTimeout(fallback);
      cancelAnimationFrame(rafRef.current);
    };
  }, [commit, listOptions.length, recenterIfNeeded]);

  return (
    <div className="relative flex-1 overflow-hidden" style={{ height: COL_H }}>
      <div
        className="bg-primary-50 pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ top: PAD, height: ITEM_H }}
      />

      <div
        ref={scrollRef}
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
                onChangeRef.current(actual);
              }}
              className={cn(
                'flex cursor-pointer snap-center items-center justify-center transition-colors duration-150 select-none',
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

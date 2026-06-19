import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent,
  type JSX,
} from 'react';
import type {
  RangeSliderProps,
  SingleSliderProps,
  SliderColorTokens,
  SliderProps,
} from './type';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { FormField } from '../form';

const DEFAULT_COLORS: Required<SliderColorTokens> = {
  filled: '#1D1D80',
  track: '#CACAE0',
  thumb: '#1D1D80',
  tick: '#9090B8',
  tickLabel: '#6060A0',
  disabledFg: '#9090B8',
  disabledBg: '#DCDCEE',
};

const clamp = (v: number, lo: number, hi: number): number =>
  Math.min(Math.max(v, lo), hi);

const snap = (v: number, min: number, max: number, step: number): number =>
  clamp(Math.round((v - min) / step) * step + min, min, max);

const toPct = (v: number, min: number, max: number): number =>
  ((v - min) / (max - min)) * 100;

export function Slider(props: SliderProps): JSX.Element {
  const {
    min = 0,
    max = 100,
    step = 1,
    range = false,
    disabled = false,
    className = '',
    label,
    tooltip,
    errorMessages,
    description,
    hint,
    required,
    colors: colorOverrides = {},
  } = props;

  const C: Required<SliderColorTokens> = {
    ...DEFAULT_COLORS,
    ...colorOverrides,
  };

  const isControlled = props.value !== undefined;

  const [internal, setInternal] = useState<number | [number, number]>(
    () => props.defaultValue ?? (range ? [min, min] : min)
  );

  const live: number | [number, number] = isControlled
    ? (props.value as number | [number, number])
    : internal;

  const liveRef = useRef<number | [number, number]>(live);
  useEffect(() => {
    liveRef.current = live;
  });

  const trackRef = useRef<HTMLDivElement>(null);

  const commit = useCallback(
    (next: number | [number, number]): void => {
      if (!isControlled) setInternal(next);
      if (!range && typeof next === 'number') {
        (props as SingleSliderProps).onChange?.(next);
      } else if (range && Array.isArray(next)) {
        (props as RangeSliderProps).onChange?.(next as [number, number]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isControlled, range]
  );

  const xToVal = useCallback(
    (clientX: number): number => {
      const el = trackRef.current;
      if (!el) return min;
      const { left, width } = el.getBoundingClientRect();
      return snap(
        clamp((clientX - left) / width, 0, 1) * (max - min) + min,
        min,
        max,
        step
      );
    },
    [min, max, step]
  );

  const onPointerDown = useCallback(
    (thumb: 'single' | 'lo' | 'hi') =>
      (e: ReactPointerEvent<HTMLDivElement>): void => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();

        const el = e.currentTarget;
        el.focus();
        el.setPointerCapture(e.pointerId);

        const onMove = (ev: PointerEvent): void => {
          const newVal = xToVal(ev.clientX);
          if (range) {
            const [lo, hi] = liveRef.current as [number, number];
            commit(
              thumb === 'lo'
                ? [Math.min(newVal, hi), hi]
                : [lo, Math.max(newVal, lo)]
            );
          } else {
            commit(newVal);
          }
        };

        const onUp = (): void => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerup', onUp);
        };

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerup', onUp);
      },
    [disabled, range, xToVal, commit]
  );

  const onKeyDown = useCallback(
    (thumb: 'single' | 'lo' | 'hi') =>
      (e: KeyboardEvent<HTMLDivElement>): void => {
        if (disabled) return;
        const dir: -1 | 0 | 1 =
          e.key === 'ArrowLeft' || e.key === 'ArrowDown'
            ? -1
            : e.key === 'ArrowRight' || e.key === 'ArrowUp'
              ? 1
              : 0;
        if (!dir) return;
        e.preventDefault();
        const delta = (e.shiftKey ? 10 : 1) * step;
        if (range) {
          const [lo, hi] = liveRef.current as [number, number];
          commit(
            thumb === 'lo'
              ? [snap(lo + dir * delta, min, hi, step), hi]
              : [lo, snap(hi + dir * delta, lo, max, step)]
          );
        } else {
          commit(
            snap((liveRef.current as number) + dir * delta, min, max, step)
          );
        }
      },
    [disabled, range, min, max, step, commit]
  );

  const onTrackClick = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
      if (disabled) return;
      const newVal = xToVal(e.clientX);
      if (!range) {
        commit(newVal);
      } else {
        const [lo, hi] = liveRef.current as [number, number];
        if (Math.abs(newVal - lo) <= Math.abs(newVal - hi)) {
          commit([Math.min(newVal, hi), hi]);
        } else {
          commit([lo, Math.max(newVal, lo)]);
        }
      }
    },
    [disabled, range, xToVal, commit]
  );

  const pSingle = !range ? toPct(live as number, min, max) : 0;
  const pLo = range ? toPct((live as [number, number])[0], min, max) : 0;
  const pHi = range ? toPct((live as [number, number])[1], min, max) : 0;

  const thumbCn = (isTop = false): string =>
    [
      'absolute top-1/2 -translate-x-1/2 -translate-y-1/2',
      'w-[18px] h-[18px] rounded-full',
      disabled ? 'cursor-not-allowed' : 'cursor-grab',
      'outline-none touch-none select-none',
      isTop ? 'z-[3]' : 'z-[2]',
    ].join(' ');

  const thumbStyle = (p: number): CSSProperties => ({
    left: `${p}%`,
    backgroundColor: disabled ? C.disabledFg : C.thumb,
  });

  const renderDotSlider = () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={live as number}
          {...(disabled && { 'aria-disabled': 'true' as const })}
          className={thumbCn()}
          style={thumbStyle(pSingle)}
          onClick={(e: MouseEvent) => e.stopPropagation()}
          onPointerDown={onPointerDown('single')}
          onKeyDown={onKeyDown('single')}
        />
      </TooltipTrigger>
      <TooltipContent>{live as number}</TooltipContent>
    </Tooltip>
  );

  const renderRangeLo = () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={`${label} — lower bound`}
          aria-valuemin={min}
          aria-valuemax={(live as [number, number])[1]}
          aria-valuenow={(live as [number, number])[0]}
          {...(disabled && { 'aria-disabled': 'true' as const })}
          className={thumbCn(true)}
          style={thumbStyle(pLo)}
          onClick={(e: MouseEvent) => e.stopPropagation()}
          onPointerDown={onPointerDown('lo')}
          onKeyDown={onKeyDown('lo')}
        />
      </TooltipTrigger>
      <TooltipContent>{(live as [number, number])[0]}</TooltipContent>
    </Tooltip>
  );

  const renderRangeHi = () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={`${label} — upper bound`}
          aria-valuemin={(live as [number, number])[0]}
          aria-valuemax={max}
          aria-valuenow={(live as [number, number])[1]}
          {...(disabled && { 'aria-disabled': 'true' as const })}
          className={thumbCn(true)}
          style={thumbStyle(pHi)}
          onClick={(e: MouseEvent) => e.stopPropagation()}
          onPointerDown={onPointerDown('hi')}
          onKeyDown={onKeyDown('hi')}
        />
      </TooltipTrigger>
      <TooltipContent>{(live as [number, number])[1]}</TooltipContent>
    </Tooltip>
  );

  const content = (
    <div
      className={[
        'sl-root relative box-border w-full py-[10px]',
        disabled ? 'opacity-[0.55]' : 'opacity-100',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        ref={trackRef}
        onClick={onTrackClick}
        className={[
          'relative h-1 rounded',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
        style={{ backgroundColor: disabled ? C.disabledBg : C.track }}
      >
        {/* Filled segment */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-full rounded"
          style={{
            left: range ? `${pLo}%` : 0,
            width: range ? `${pHi - pLo}%` : `${pSingle}%`,
            backgroundColor: disabled ? C.disabledFg : C.filled,
          }}
        />

        {!range && renderDotSlider()}

        {range && renderRangeLo()}

        {range && renderRangeHi()}
      </div>
    </div>
  );

  return (
    <FormField
      label={label}
      errorMessages={errorMessages}
      description={description}
      hint={hint}
      required={required}
      tooltip={tooltip}
    >
      {content}
    </FormField>
  );
}

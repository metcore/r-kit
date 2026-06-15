import React, { useState, useRef, useEffect } from 'react';
import type {
  ColorInputProps,
  ColorPickerPanelProps,
  ColorValue,
  EyeDropperCtor,
  HSL,
  HSV,
  RGB,
} from './type';
import { Input } from '../input';
import { InputGroup, InputGroupText } from '../input-group';
import { Icon } from '../icons';

function getEyeDropper(): EyeDropperCtor | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { EyeDropper?: EyeDropperCtor }).EyeDropper;
}

const clamp = (n: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, n));

function hsvToRgb(h: number, s: number, v: number): RGB {
  const c = v * s;
  const hh = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hh < 1) [r, g, b] = [c, x, 0];
  else if (hh < 2) [r, g, b] = [x, c, 0];
  else if (hh < 3) [r, g, b] = [0, c, x];
  else if (hh < 4) [r, g, b] = [0, x, c];
  else if (hh < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = v - c;
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number): HSV {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rr) h = ((gg - bb) / d) % 6;
    else if (max === gg) h = (bb - rr) / d + 2;
    else h = (rr - gg) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function hsvToHsl(h: number, s: number, v: number): HSL {
  const l = v * (1 - s / 2);
  const sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  return { h, s: sl, l };
}

function hslToHsv(h: number, s: number, l: number): HSV {
  const v = l + s * Math.min(l, 1 - l);
  const sv = v === 0 ? 0 : 2 * (1 - l / v);
  return { h, s: sv, v };
}

const toHex2 = (n: number): string =>
  clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');

const rgbToHex = (r: number, g: number, b: number): string =>
  ('#' + toHex2(r) + toHex2(g) + toHex2(b)).toUpperCase();

function hexToRgb(hex: string): RGB | null {
  let h = String(hex).replace('#', '').trim();
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function makeDrag(
  ref: React.RefObject<HTMLDivElement | null>,
  onMove: (x: number, y: number) => void
): (e: React.PointerEvent) => void {
  const apply = (clientX: number, clientY: number): void => {
    const el = ref.current;
    if (el == undefined) return;
    const r = el.getBoundingClientRect();
    onMove(
      clamp((clientX - r.left) / r.width, 0, 1),
      clamp((clientY - r.top) / r.height, 0, 1)
    );
  };
  return (e: React.PointerEvent): void => {
    e.preventDefault();
    apply(e.clientX, e.clientY);
    const move = (ev: PointerEvent): void => apply(ev.clientX, ev.clientY);
    const up = (): void => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
}

const ChevronIcon = (): React.ReactElement => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/* ---- runtime-only styles (cannot be Tailwind classes) ----------------- */
const CHECKER: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(45deg,#cbd0d8 25%,transparent 25%),' +
    'linear-gradient(-45deg,#cbd0d8 25%,transparent 25%),' +
    'linear-gradient(45deg,transparent 75%,#cbd0d8 75%),' +
    'linear-gradient(-45deg,transparent 75%,#cbd0d8 75%)',
  backgroundSize: '10px 10px',
  backgroundPosition: '0 0,0 5px,5px -5px,-5px 0',
  backgroundColor: '#fff',
};

const HUE_GRADIENT =
  'linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%)';

const DEFAULT_SAVED: string[] = [
  '#FF3B30',
  '#FF9500',
  '#FFCC4D',
  '#C026D3',
  '#FF8A80',
  '#B59B9E',
  '#B5E61D',
  '#5C1A1A',
  '#0A1A4F',
  '#310C0C',
  '#5B1E8A',
  '#2E5A14',
  '#2A8C8C',
];

const FORMATS = ['HEX', 'RGB', 'HSL', 'HSB'] as const;
type Format = (typeof FORMATS)[number];
const boxBaseCls =
  'box-border flex h-10 items-center rounded-[9px] border border-[#E4E6EB] bg-white';

const inputBaseCls =
  'w-full min-w-0 border-none bg-transparent text-[13px] text-[#1f2430] outline-none';

interface NumberBoxProps {
  value: number;
  onCommit: (value: string) => void;
  suffix?: string;
}

function NumberBox({
  value,
  onCommit,
  suffix,
}: NumberBoxProps): React.ReactElement {
  return (
    <div className={`${boxBaseCls} flex-1 justify-center px-1`}>
      <input
        className={`${inputBaseCls} text-center`}
        value={value}
        inputMode="numeric"
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => onCommit(e.target.value)}
      />
      {suffix != undefined ? (
        <span className="ml-px text-[13px] text-[#9aa1ad]">{suffix}</span>
      ) : null}
    </div>
  );
}

interface HexBoxProps {
  hex: string;
  onCommit: (rgb: RGB) => void;
}

function HexBox({ hex, onCommit }: HexBoxProps): React.ReactElement {
  const [draft, setDraft] = useState<string>(hex);
  useEffect(() => {
    setDraft(hex);
  }, [hex]);

  const commit = (): void => {
    const rgb = hexToRgb(draft);
    if (rgb) onCommit(rgb);
    else setDraft(hex);
  };

  return (
    <div className={`${boxBaseCls} flex-3 justify-center px-1`}>
      <input
        className={`${inputBaseCls} pl-1.5 text-left tracking-[0.5px]`}
        value={draft}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
        }}
      />
    </div>
  );
}

interface SliderThumbProps {
  left: number;
  fill: string;
}

function SliderThumb({ left, fill }: SliderThumbProps): React.ReactElement {
  return (
    <div
      className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_1px_3px_rgba(0,0,0,0.3)]"
      style={{ left: `${left}%`, background: fill }}
    />
  );
}

export function ColorPickerPanel({
  hsv,
  alpha,
  onHsv,
  onAlpha,
  savedColors = DEFAULT_SAVED,
}: ColorPickerPanelProps): React.ReactElement {
  const [format, setFormat] = useState<Format>('HSL');
  const [fmtOpen, setFmtOpen] = useState<boolean>(false);

  const svRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);

  const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const hsl = hsvToHsl(hsv.h, hsv.s, hsv.v);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const hueColor = `hsl(${hsv.h},100%,50%)`;

  const eyedropperSupported = getEyeDropper() !== undefined;

  const onSvDown = makeDrag(svRef, (x, y) => onHsv({ ...hsv, s: x, v: 1 - y }));
  const onHueDown = makeDrag(hueRef, (x) => onHsv({ ...hsv, h: x * 360 }));
  const onAlphaDown = makeDrag(alphaRef, (x) => onAlpha(x));

  const setRgb = (k: keyof RGB, val: string): void => {
    const next: RGB = { ...rgb };
    next[k] = clamp(parseInt(val, 10) || 0, 0, 255);
    onHsv(rgbToHsv(next.r, next.g, next.b));
  };
  const setHsl = (k: 'h' | 's' | 'l', val: string): void => {
    const next: HSL = { h: hsl.h, s: hsl.s, l: hsl.l };
    if (k === 'h') next.h = clamp(parseInt(val, 10) || 0, 0, 360);
    else next[k] = clamp(parseInt(val, 10) || 0, 0, 100) / 100;
    onHsv(hslToHsv(next.h, next.s, next.l));
  };
  const setHsb = (k: 'h' | 's' | 'v', val: string): void => {
    const next: HSV = { ...hsv };
    if (k === 'h') next.h = clamp(parseInt(val, 10) || 0, 0, 360);
    else next[k] = clamp(parseInt(val, 10) || 0, 0, 100) / 100;
    onHsv(next);
  };
  const setAlphaPct = (val: string): void =>
    onAlpha(clamp(parseInt(val, 10) || 0, 0, 100) / 100);

  const pickWithEyedropper = async (): Promise<void> => {
    const EyeDropperClass = getEyeDropper();
    if (!EyeDropperClass) return;
    try {
      const res = await new EyeDropperClass().open();
      const r = hexToRgb(res.sRGBHex);
      if (r) onHsv(rgbToHsv(r.r, r.g, r.b));
    } catch {
      /* user cancelled the picker */
    }
  };

  const renderReadout = (): React.ReactElement => {
    if (format === 'HEX') {
      return (
        <>
          <HexBox hex={hex} onCommit={(r) => onHsv(rgbToHsv(r.r, r.g, r.b))} />
          <NumberBox
            value={Math.round(alpha * 100)}
            suffix="%"
            onCommit={setAlphaPct}
          />
        </>
      );
    }
    if (format === 'RGB') {
      return (
        <>
          <NumberBox value={rgb.r} onCommit={(v) => setRgb('r', v)} />
          <NumberBox value={rgb.g} onCommit={(v) => setRgb('g', v)} />
          <NumberBox value={rgb.b} onCommit={(v) => setRgb('b', v)} />
          <NumberBox
            value={Math.round(alpha * 100)}
            suffix="%"
            onCommit={setAlphaPct}
          />
        </>
      );
    }
    if (format === 'HSB') {
      return (
        <>
          <NumberBox
            value={Math.round(hsv.h)}
            onCommit={(v) => setHsb('h', v)}
          />
          <NumberBox
            value={Math.round(hsv.s * 100)}
            onCommit={(v) => setHsb('s', v)}
          />
          <NumberBox
            value={Math.round(hsv.v * 100)}
            onCommit={(v) => setHsb('v', v)}
          />
          <NumberBox
            value={Math.round(alpha * 100)}
            suffix="%"
            onCommit={setAlphaPct}
          />
        </>
      );
    }
    return (
      <>
        <NumberBox value={Math.round(hsl.h)} onCommit={(v) => setHsl('h', v)} />
        <NumberBox
          value={Math.round(hsl.s * 100)}
          onCommit={(v) => setHsl('s', v)}
        />
        <NumberBox
          value={Math.round(hsl.l * 100)}
          onCommit={(v) => setHsl('l', v)}
        />
        <NumberBox
          value={Math.round(alpha * 100)}
          suffix="%"
          onCommit={setAlphaPct}
        />
      </>
    );
  };

  return (
    <div className="box-border w-70 rounded-2xl bg-white p-3.5 shadow-[0_12px_36px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.05)] select-none">
      <div
        ref={svRef}
        onPointerDown={onSvDown}
        className="relative h-47.5 w-full cursor-crosshair touch-none rounded-[10px]"
        style={{
          background:
            `linear-gradient(to top,#000,rgba(0,0,0,0)),` +
            `linear-gradient(to right,#fff,${hueColor})`,
        }}
      >
        <div
          className="pointer-events-none absolute h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_1px_4px_rgba(0,0,0,0.35)]"
          style={{
            left: `${hsv.s * 100}%`,
            top: `${(1 - hsv.v) * 100}%`,
            background: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
          }}
        />
      </div>

      <div className="mt-3.5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            void pickWithEyedropper();
          }}
          title={
            eyedropperSupported
              ? 'Pick a color from screen'
              : 'EyeDropper not supported in this browser'
          }
          className={`flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg border border-[#E4E6EB] bg-white ${
            eyedropperSupported
              ? 'cursor-pointer text-[#4b5563]'
              : 'cursor-not-allowed text-[#c4c8cf]'
          }`}
        >
          <Icon name="pencil" size={20} />
        </button>

        <div className="flex flex-1 flex-col gap-2.5">
          <div
            ref={hueRef}
            onPointerDown={onHueDown}
            className="relative h-3 cursor-pointer touch-none rounded-md"
            style={{ background: HUE_GRADIENT }}
          >
            <SliderThumb left={(hsv.h / 360) * 100} fill={hueColor} />
          </div>
          <div
            ref={alphaRef}
            onPointerDown={onAlphaDown}
            className="relative h-3 cursor-pointer touch-none rounded-md"
            style={CHECKER}
          >
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background: `linear-gradient(to right,rgba(${rgb.r},${rgb.g},${rgb.b},0),rgb(${rgb.r},${rgb.g},${rgb.b}))`,
              }}
            />
            <SliderThumb
              left={alpha * 100}
              fill={`rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`}
            />
          </div>
        </div>
      </div>

      {/* format dropdown + readouts */}
      <div className="relative mt-3.5 flex gap-1.5">
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setFmtOpen((o) => !o)}
            className={`${boxBaseCls} w-16 cursor-pointer justify-between px-2.5 text-[13px] font-medium text-[#1f2430]`}
          >
            {format}
            <span className="flex text-[#9aa1ad]">
              <ChevronIcon />
            </span>
          </button>
          {fmtOpen ? (
            <div className="absolute top-11 left-0 z-5 w-20 overflow-hidden rounded-[10px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.06)]">
              {FORMATS.map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => {
                    setFormat(f);
                    setFmtOpen(false);
                  }}
                  className={`block w-full cursor-pointer px-3 py-2.25 text-left text-[13px] ${
                    f === format
                      ? 'bg-[#f3f7ff] font-semibold text-[#2f80ed]'
                      : 'text-[#1f2430] hover:bg-[#f6f7f9]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        {renderReadout()}
      </div>

      {/* saved colors (swatch fill is dynamic -> inline) */}
      <div className="mt-4 text-sm font-semibold text-[#1f2430]">
        Saved Colors
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {savedColors.map((c) => (
          <button
            type="button"
            key={c}
            title={c}
            onClick={() => {
              const r = hexToRgb(c);
              if (r) {
                onHsv(rgbToHsv(r.r, r.g, r.b));
                onAlpha(1);
              }
            }}
            className="h-6.5 w-6.5 cursor-pointer rounded-full border border-[rgba(0,0,0,0.08)] p-0"
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  );
}

function parseColor(input: string): {
  hsv: HSV;
  alpha: number;
  valid: boolean;
} {
  const r = hexToRgb(input);
  if (r) return { hsv: rgbToHsv(r.r, r.g, r.b), alpha: 1, valid: true };
  return { hsv: { h: 0, s: 0, v: 0 }, alpha: 1, valid: false };
}

export function ColorInput({
  defaultColor = '',
  placeholder,
  tooltip,
  label,
  hint,
  errorMessages,
  size,
  onChange,
  required,
  disabled,
}: ColorInputProps): React.ReactElement {
  const init = parseColor(defaultColor);
  const [hsv, setHsv] = useState<HSV>(init.hsv);
  const [alpha, setAlpha] = useState<number>(init.alpha);
  const [hasValue, setHasValue] = useState<boolean>(init.valid);
  const [open, setOpen] = useState<boolean>(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  const display = !hasValue
    ? ''
    : alpha < 1
      ? `${hex} · ${Math.round(alpha * 100)}%`
      : hex;

  const onChangeRef = useRef<((color: ColorValue) => void) | undefined>(
    onChange
  );
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (!hasValue) return;
    }
    const rgbNow = hsvToRgb(hsv.h, hsv.s, hsv.v);
    const hexNow = rgbToHex(rgbNow.r, rgbNow.g, rgbNow.b);
    onChangeRef.current?.({ hex: hexNow, rgb: rgbNow, alpha, hsv });
  }, [hsv, alpha, hasValue]);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e: MouseEvent): void => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const applyHsv = (next: HSV): void => {
    setHsv(next);
    setHasValue(true);
  };
  const applyAlpha = (a: number): void => {
    setAlpha(a);
    setHasValue(true);
  };

  const inputColorDisplay = (): React.ReactElement => (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="block h-6.5 w-6.5 shrink-0 cursor-pointer rounded-md p-0"
      style={{ ...CHECKER, backgroundSize: '8px 8px' }}
    >
      <span
        className="block h-full w-full rounded-[5px]"
        style={{
          background: hasValue
            ? `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
            : 'transparent',
        }}
      />
    </button>
  );

  return (
    <div ref={wrapRef} className="relative w-80">
      <InputGroup
        label={label}
        required={required}
        disabled={disabled}
        hint={hint}
        size={size}
        tooltip={tooltip}
        errorMessages={errorMessages}
      >
        <Input
          placeholder={placeholder}
          onClick={() => setOpen((o) => !o)}
          className="cursor-pointer"
          size={size}
          value={display}
          readOnly
        />
        <InputGroupText>{inputColorDisplay()}</InputGroupText>
      </InputGroup>
      {open ? (
        <div className="absolute top-13 left-0 z-10">
          <ColorPickerPanel
            hsv={hsv}
            alpha={alpha}
            onHsv={applyHsv}
            onAlpha={applyAlpha}
          />
        </div>
      ) : null}
    </div>
  );
}

import { useRef, useState } from 'react';
import type { ColorPickerPanelProps, HSL, HSV, RGB } from './type';
import { boxBaseCls, CHECKER, DEFAULT_SAVED, HUE_GRADIENT } from './constants';
import {
  getEyeDropper,
  hexToRgb,
  hslToHsv,
  hsvToHsl,
  hsvToRgb,
  makeDrag,
  rgbToHex,
  rgbToHsv,
} from './helpers';
import { clamp } from '../api-table';
import NumberBox from './number-box';
import HexBox from './hex-box';
import { Icon } from '../icons';
import SliderThumb from './slider-thumb';

const FORMATS = ['HEX', 'RGB', 'HSL', 'HSB'] as const;
type Format = (typeof FORMATS)[number];

export default function ColorPickerPanel({
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
            <Icon name="angle-down-small" className="text-gray-700" />
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

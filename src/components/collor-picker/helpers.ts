import type { EyeDropperCtor, HSL, HSV, RGB } from './type';

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

function parseColor(input: string): {
  hsv: HSV;
  alpha: number;
  valid: boolean;
} {
  const r = hexToRgb(input);
  if (r) return { hsv: rgbToHsv(r.r, r.g, r.b), alpha: 1, valid: true };
  return { hsv: { h: 0, s: 0, v: 0 }, alpha: 1, valid: false };
}

function getEyeDropper(): EyeDropperCtor | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { EyeDropper?: EyeDropperCtor }).EyeDropper;
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

export {
  parseColor,
  clamp,
  hexToRgb,
  hslToHsv,
  rgbToHex,
  rgbToHsv,
  hsvToHsl,
  hsvToRgb,
  getEyeDropper,
  makeDrag,
};

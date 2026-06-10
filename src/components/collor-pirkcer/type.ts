import type { InputProps } from '../input';

export interface RGB {
  r: number;
  g: number;
  b: number;
}
export interface HSV {
  h: number;
  s: number;
  v: number;
}
export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorValue {
  hex: string;
  rgb: RGB;
  alpha: number;
  hsv: HSV;
}
type ColorInputValue = string | RGB | HSV | number;

export interface ColorInputProps extends Omit<
  InputProps,
  'onChange' | 'value'
> {
  value?: ColorInputValue;
  defaultColor?: string;
  onChange?: (color: ColorValue) => void;
}

export interface ColorPickerPanelProps {
  hsv: HSV;
  alpha: number;
  onHsv: (hsv: HSV) => void;
  onAlpha: (alpha: number) => void;
  savedColors?: string[];
}

interface EyeDropperResult {
  sRGBHex: string;
}
interface EyeDropperInstance {
  open: () => Promise<EyeDropperResult>;
}
export type EyeDropperCtor = new () => EyeDropperInstance;

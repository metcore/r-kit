import type { InputProps, InputSize } from '../input';

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

export interface BaseColorPickerProps {
  value?: ColorInputValue;
  size?: InputSize;
  defaultColor?: string;
  onChange?: (color: ColorValue) => void;
  children: (props: {
    open: boolean;
    toggle: () => void;
    openPicker: () => void;
    closePicker: () => void;
    color: ColorValue | null;
    rgb: RGB;
    alpha: number;
    display: string;
    hasValue: boolean;
  }) => React.ReactNode;
}

export interface ColorInputProps extends Omit<
  InputProps,
  'onChange' | 'value' | 'children'
> {
  value?: ColorInputValue;
  size?: InputSize;
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

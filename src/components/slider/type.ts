export interface SliderMark {
  value: number;
  label?: string;
}
export interface SliderColorTokens {
  filled?: string;
  track?: string;
  thumb?: string;
  tick?: string;
  tickLabel?: string;
  disabledFg?: string;
  disabledBg?: string;
}
interface SliderCommonProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  label?: string;
  colors?: SliderColorTokens;
  tooltiop?: string;
  description?: string;
  hint?: string;
  errorMessages?: string | string[];
  tooltip?: string;
  required?: boolean;
}

export interface SingleSliderProps extends SliderCommonProps {
  range?: false;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}
export interface RangeSliderProps extends SliderCommonProps {
  range: true;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
}

export type SliderProps = SingleSliderProps | RangeSliderProps;

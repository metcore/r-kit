import type { RadioButtonValue } from './radio';

export type SizeType = 'sm' | 'md' | 'lg';
export type ColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'orange'
  | 'purple'
  | 'gray';

export interface RadioProps {
  id?: string;
  name?: string;
  value?: string | number;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: SizeType;
  color?: ColorType;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export interface RadioGroupProps {
  value?: RadioButtonValue;
  defaultValue?: string;
  onValueChange?: (value: RadioButtonValue) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  size?: SizeType;
  color?: ColorType;
  className?: string;
  children: React.ReactNode;
}

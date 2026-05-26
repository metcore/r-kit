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

export type IconType = 'check' | 'minus';

export type CheckboxValue = number | string;
export interface CheckboxProps {
  id?: string;
  value?: CheckboxValue;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: SizeType;
  color?: ColorType;
  icon?: IconType;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export interface CheckboxGroupProps {
  value?: CheckboxValue[];
  defaultValue?: CheckboxValue[];
  /**
   * @deprecated Gunakan OnChange
   */
  onValueChange?: (value: CheckboxValue[]) => void;
  onChange?: (value: CheckboxValue[]) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  size?: SizeType;
  color?: ColorType;
  icon?: IconType;
  className?: string;
  children?: React.ReactNode;
}

export interface CheckboxGroupContextValue {
  value?: CheckboxValue[];
  /**
   * @deprecated Gunakan OnChange
   */
  onValueChange?: (value: CheckboxValue[]) => void;
  onChange?: (value: CheckboxValue[]) => void;
  disabled?: boolean;
  name?: string;
  size?: SizeType;
  color?: ColorType;
  icon?: 'check' | 'minus';
}

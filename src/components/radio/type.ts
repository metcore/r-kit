export type SizeType = "sm" | "md" | "lg";
export type ColorType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "orange"
  | "purple"
  | "gray";

export interface RadioProps {
  id?: string;
  name?: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: SizeType;
  color?: ColorType;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  size?: SizeType;
  color?: ColorType;
  className?: string;
  children: React.ReactNode;
}

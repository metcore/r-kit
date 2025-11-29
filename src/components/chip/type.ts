import type { VariantProps } from "class-variance-authority";
import type { chipVariants } from "./chip-variants";

export type ChipValue = string | number;

export type ColorVariantType =
  | "gray"
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "purple"
  | "orange";

export interface ChipContextValue {
  selectedValues: ChipValue[];
  toggleSelection: (value: ChipValue) => void;
  color?: ColorVariantType;
  size?: "sm" | "md" | "lg";
  block?: boolean;
}

export interface ChipProps
  extends Omit<VariantProps<typeof chipVariants>, "state"> {
  value?: ChipValue;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (value?: ChipValue) => void;
  children: React.ReactNode;
  className?: string;
}

export interface ChipOptionProps {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type ChipSelectedProps = ChipValue | ChipValue[];

export interface ChipArrayProps {
  options?: ChipOptionProps[];
  selected?: ChipSelectedProps;
  onSelect?: (selected: ChipValue[]) => void;
  direction?: "horizontal" | "vertical";
  color?: ColorVariantType;
  multiple?: boolean;
  scrollable?: boolean;
  block?: boolean;
  size?: "sm" | "md" | "lg";
  footer?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

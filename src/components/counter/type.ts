// Tambahkan props berikut ke interface CounterProps yang sudah ada:

import type { IconNameProps } from "../icons";

export interface CounterProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  canMinus?: boolean;
  inputWidth?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";

  // Props baru untuk controlled/uncontrolled component
  value?: string; // Untuk mode controlled
  defaultValue?: string; // Untuk mode uncontrolled (default: "0")
  onChange?: (value: string) => void; // Callback saat value berubah
}

export interface ButtonIconProps {
  icon: IconNameProps;
  disabled?: boolean;
  onClick: () => void;
  variant?: "primary" | "secondary";
  iconClassName?: string;
}

export interface CounterControllerProps {
  value: string;
  valueUpdater: (value: string) => void;
}

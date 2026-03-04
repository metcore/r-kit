import type { IconNameProps } from "../icons";

export type ColorVariant =
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "orange"
  | "danger"
  | "purple"
  | "gray"
  | "secondary";

export interface ToastProps {
  color?: ColorVariant;
  title: string;
  description: string;
  onClose?: () => void;
  icon?: IconNameProps;
  onClickAction?: () => void;
  actionLabel?: string;
  iconSize?: number;
  variant?: "outline";
}

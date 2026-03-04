import { createContext } from "react";
import type { ToastProps } from "./type";

export type ToastContextType = {
  show: (props: ToastProps) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fieldHasError(errorMessages: unknown) {
  return typeof errorMessages === "string"
    ? errorMessages.trim().length > 0
    : Array.isArray(errorMessages)
      ? errorMessages.length > 0
      : false;
}

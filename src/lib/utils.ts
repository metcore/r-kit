import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fieldHasError(errorMessages: unknown) {
  return typeof errorMessages === 'string'
    ? errorMessages.trim().length > 0
    : Array.isArray(errorMessages)
      ? errorMessages.length > 0
      : false;
}

export function hexToRgba(hex: string, opacity = 1) {
  hex = hex.replace('#', '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 MB';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / 1024 ** exponent;
  const rounded =
    value >= 10 || Number.isInteger(value)
      ? Math.round(value)
      : Math.round(value * 10) / 10;

  return `${rounded} ${units[exponent]}`;
}

import type { CSSProperties } from 'react';
import type { FormSizeType } from '../form/type';

export interface DrawingUploadConfig {
  url: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  fieldName?: string;
  fileName?: string;
  mimeType?: string;
  headers?: Record<string, string>;
  data?: Record<string, string>;
  extractUrl?: (response: unknown) => string;
  errorMessage?: string;
}

export interface DrawingUploadResult {
  url: string;
  response: unknown;
}

export interface DrawingRef {
  clear: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  isEmpty: () => boolean;
  toDataURL: (type?: string, quality?: number) => string;
  toBlob: (
    callback: (blob: Blob | null) => void,
    type?: string,
    quality?: number
  ) => void;
  getCanvas: () => HTMLCanvasElement | null;
}

export interface DrawingProps {
  strokeColor?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  height?: number | string;
  width?: number | string;
  disabled?: boolean;
  readOnly?: boolean;
  showActions?: boolean;
  placeholder?: string;
  onChange?: (dataUrl: string) => void;
  initialValue?: string;
  className?: string;
  style?: CSSProperties;
  label?: string;
  description?: string;
  hint?: string;
  errorMessages?: string | string[];
  required?: boolean;
  size?: FormSizeType;
  tooltip?: string;
}

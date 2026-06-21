import type { CSSProperties } from 'react';
import type { FormSizeType } from '../form/type';

export interface DrawingRef {
  /** Clear the canvas and reset it to the empty state. */
  clear: () => void;
  /** Step back to the previous stroke. */
  undo: () => void;
  /** Re-apply a stroke that was undone. */
  redo: () => void;
  /** Whether there is a previous state to undo to. */
  canUndo: () => boolean;
  /** Whether there is an undone state to redo. */
  canRedo: () => boolean;
  /** Whether nothing has been drawn yet. */
  isEmpty: () => boolean;
  /** Export the drawing as a Base64 data URL (PNG by default). */
  toDataURL: (type?: string, quality?: number) => string;
  /** Export the drawing as a Blob via callback (PNG by default). */
  toBlob: (
    callback: (blob: Blob | null) => void,
    type?: string,
    quality?: number
  ) => void;
  /** Access the underlying canvas element. */
  getCanvas: () => HTMLCanvasElement | null;
}

export interface DrawingProps {
  /** Stroke (pen) color. @default '#1D1D80' */
  strokeColor?: string;
  /** Stroke width in CSS pixels. @default 2 */
  strokeWidth?: number;
  /**
   * Canvas background color. Use `'transparent'` to keep an alpha channel
   * (e.g. for signatures overlaid on a document). @default 'transparent'
   */
  backgroundColor?: string;
  /** Height of the drawing surface. @default 200 */
  height?: number | string;
  /** Width of the drawing surface. @default '100%' */
  width?: number | string;
  /** Disable the field: not drawable and visually dimmed. */
  disabled?: boolean;
  /** Render the current drawing but block any further input. */
  readOnly?: boolean;
  /** Render a built-in toolbar: undo / redo on the left, clear on the right. */
  showActions?: boolean;
  /** Hint shown centered while the canvas is empty (e.g. "Sign here"). */
  placeholder?: string;
  /**
   * Fired after each completed stroke (and on `clear`) with the PNG data URL.
   * Emits an empty string when the canvas becomes empty.
   */
  onChange?: (dataUrl: string) => void;
  /** Extra classes for the drawing surface box. */
  className?: string;
  style?: CSSProperties;

  // FormField passthrough — consistent with Slider / Input.
  label?: string;
  description?: string;
  hint?: string;
  errorMessages?: string | string[];
  required?: boolean;
  size?: FormSizeType;
  tooltip?: string;
}

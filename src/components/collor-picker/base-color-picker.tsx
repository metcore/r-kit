import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, DropdownContent, DropdownTrigger } from '../dropdown';
import ColorPickerPanel from './color-picker-panel';
import { hsvToRgb, parseColor, rgbToHex } from './helpers';
import type { BaseColorPickerProps, ColorValue, HSV } from './type';

export function BaseColorPicker({
  defaultColor = '',
  onChange,
  children,
}: BaseColorPickerProps): React.ReactElement {
  const init = parseColor(defaultColor);
  const [hsv, setHsv] = useState<HSV>(init.hsv);
  const [alpha, setAlpha] = useState<number>(init.alpha);
  const [hasValue, setHasValue] = useState<boolean>(init.valid);
  const [open, setOpen] = useState<boolean>(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);
  const toggle = () => setOpen((o) => !o);

  const color = hasValue
    ? {
        hex,
        rgb,
        alpha,
        hsv,
      }
    : null;

  const display = !hasValue
    ? ''
    : alpha < 1
      ? `${hex} · ${Math.round(alpha * 100)}%`
      : hex;

  const onChangeRef = useRef<((color: ColorValue) => void) | undefined>(
    onChange
  );
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (!hasValue) return;
    }
    const rgbNow = hsvToRgb(hsv.h, hsv.s, hsv.v);
    const hexNow = rgbToHex(rgbNow.r, rgbNow.g, rgbNow.b);
    onChangeRef.current?.({ hex: hexNow, rgb: rgbNow, alpha, hsv });
  }, [hsv, alpha, hasValue]);

  const applyHsv = (next: HSV): void => {
    setHsv(next);
    setHasValue(true);
  };
  const applyAlpha = (a: number): void => {
    setAlpha(a);
    setHasValue(true);
  };

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e: MouseEvent): void => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <Dropdown>
        <DropdownTrigger>
          {children({
            open,
            toggle,
            openPicker,
            closePicker,
            color,
            rgb,
            alpha,
            display,
            hasValue,
          })}
        </DropdownTrigger>
        <DropdownContent className="rounded-2xl border-0 p-0 shadow-none">
          <ColorPickerPanel
            hsv={hsv}
            alpha={alpha}
            onHsv={applyHsv}
            onAlpha={applyAlpha}
          />
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

import * as React from 'react';
import { Input, type InputProps } from './input';
import {
  MAX_SIGNIFICANT_DIGITS,
  coerceTypedDecimal,
  countDigits,
  formatNumber,
  formatParts,
  isDigit,
  normalizePasted,
  padParts,
  parseParts,
  partsToNumber,
  type NumberFormatOptions,
} from './input-number-helpers';

export interface InputNumberProps extends Omit<
  InputProps,
  'type' | 'value' | 'defaultValue' | 'onChange'
> {
  /** Nilai terkendali. `null` = kosong. */
  value?: number | null;
  /** Nilai awal mode tak terkendali. */
  defaultValue?: number | null;
  /** Dipanggil saat nilai angka berubah (bukan tiap perubahan format). */
  onChange?: (value: number | null, formatted: string) => void;
  /** Maksimal angka di belakang koma. `0` = bilangan bulat. Bawaan: bebas. */
  decimalScale?: number;
  /** Selalu tampilkan `decimalScale` digit desimal saat blur (1.234,50). */
  fixedDecimalScale?: boolean;
  /** Pemisah ribuan. `false` untuk mematikan. Bawaan `.` */
  thousandSeparator?: string | false;
  /** Pemisah desimal. Bawaan `,` */
  decimalSeparator?: string;
  /** Teks di depan angka, mis. `Rp `. */
  prefix?: string;
  /** Teks di belakang angka, mis. ` %`. */
  suffix?: string;
  /** Batas bawah, diterapkan saat blur. */
  min?: number;
  /** Batas atas, diterapkan saat blur. */
  max?: number;
  /** Mengizinkan angka negatif. Bawaan `true`. */
  allowNegative?: boolean;
  /** Perataan angka di dalam isian. Bawaan `left`. */
  align?: 'left' | 'right';
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      decimalScale,
      fixedDecimalScale = false,
      thousandSeparator = '.',
      decimalSeparator = ',',
      prefix = '',
      suffix = '',
      min,
      max,
      allowNegative = true,
      align = 'left',
      style,
      onBlur,
      onKeyDown,
      onPaste,
      inputMode,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const hasThousand = thousandSeparator !== false && thousandSeparator !== '';
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const pendingCaret = React.useRef<number | null>(null);
    const [, forceRender] = React.useReducer((x: number) => x + 1, 0);

    const opts = React.useMemo<NumberFormatOptions>(
      () => ({
        decimalScale,
        fixedDecimalScale,
        thousandSeparator,
        decimalSeparator,
        prefix,
        suffix,
        allowNegative,
      }),
      [
        decimalScale,
        fixedDecimalScale,
        thousandSeparator,
        decimalSeparator,
        prefix,
        suffix,
        allowNegative,
      ]
    );

    const [text, setText] = React.useState(() =>
      formatNumber(isControlled ? value : defaultValue, opts)
    );
    const currentParts = parseParts(text, opts);
    const currentNumber = partsToNumber(currentParts);

    // Sinkron saat parent mengganti `value` dari luar (bukan gema dari ketikan).
    const [prevValue, setPrevValue] = React.useState(value);
    if (isControlled && value !== prevValue) {
      setPrevValue(value);
      if (!Object.is(value, currentNumber)) setText(formatNumber(value, opts));
    }

    React.useLayoutEffect(() => {
      const el = innerRef.current;
      if (pendingCaret.current === null || !el) return;
      if (document.activeElement === el) {
        el.setSelectionRange(pendingCaret.current, pendingCaret.current);
      }
      pendingCaret.current = null;
    });

    const setRefs = React.useCallback(
      (el: HTMLInputElement | null) => {
        innerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      },
      [ref]
    );

    const isSignificant = (ch: string) =>
      isDigit(ch) || ch === decimalSeparator;

    const countSignificant = (s: string) =>
      Array.from(s).filter(isSignificant).length;

    // Posisi caret dihitung dari kanan: sisipan pemisah ribuan di kiri
    // caret tidak menggeser posisinya relatif ke digit di kanan.
    const caretFromRight = (s: string, count: number) => {
      const end =
        suffix !== '' && s.endsWith(suffix)
          ? s.length - suffix.length
          : s.length;
      if (count <= 0) return end;
      let seen = 0;
      for (let i = end - 1; i >= 0; i--) {
        if (isSignificant(s.charAt(i))) {
          seen++;
          if (seen === count) return i;
        }
      }
      return 0;
    };

    const commit = (nextText: string, nextNumber: number | null) => {
      setText(nextText);
      forceRender();
      if (!Object.is(nextNumber, currentNumber)) {
        onChange?.(nextNumber, nextText);
      }
    };

    const applyRaw = (raw: string, rightCount: number) => {
      const parts = parseParts(raw, opts);
      // Tolak ketikan yang membuat angka melewati batas presisi `number`.
      if (
        countDigits(parts) > MAX_SIGNIFICANT_DIGITS &&
        countDigits(parts) > countDigits(currentParts)
      ) {
        pendingCaret.current = caretFromRight(text, rightCount);
        commit(text, currentNumber);
        return;
      }
      const next = formatParts(parts, opts);
      pendingCaret.current = caretFromRight(next, rightCount);
      commit(next, partsToNumber(parts));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const caret = e.target.selectionStart ?? e.target.value.length;
      const raw = coerceTypedDecimal(text, e.target.value, caret, opts);
      applyRaw(raw, countSignificant(raw.slice(caret)));
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      onPaste?.(e);
      if (e.defaultPrevented) return;
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? start;
      const pasted = normalizePasted(
        e.clipboardData.getData('text'),
        decimalSeparator
      );
      const after = el.value.slice(end);
      applyRaw(
        el.value.slice(0, start) + pasted + after,
        countSignificant(after)
      );
    };

    // Backspace/Delete tepat di pemisah ribuan: lompati pemisahnya dan
    // hapus digit di sebelahnya, supaya tombolnya tidak terasa "mati".
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented || !hasThousand) return;
      const el = e.currentTarget;
      const pos = el.selectionStart;
      if (pos === null || pos !== el.selectionEnd) return;
      if (
        e.key === 'Backspace' &&
        el.value.charAt(pos - 1) === thousandSeparator
      ) {
        el.setSelectionRange(pos - 1, pos - 1);
      } else if (
        e.key === 'Delete' &&
        el.value.charAt(pos) === thousandSeparator
      ) {
        el.setSelectionRange(pos + 1, pos + 1);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      let next = '';
      let n = currentNumber;
      if (n !== null) {
        const clamped =
          min !== undefined && n < min
            ? min
            : max !== undefined && n > max
              ? max
              : n;
        if (clamped !== n) {
          n = clamped;
          next = formatNumber(n, opts);
        } else {
          // Format ulang dari digit yang diketik, bukan dari `number`,
          // supaya digit yang tampil tidak berubah sendiri.
          const parts = { ...currentParts, hasDec: currentParts.dec !== '' };
          next = formatParts(padParts(parts, opts), opts);
        }
      }
      if (next !== text || !Object.is(n, currentNumber)) commit(next, n);
      onBlur?.(e);
    };

    return (
      <Input
        {...props}
        ref={setRefs}
        type="text"
        style={align === 'right' ? { textAlign: 'right', ...style } : style}
        inputMode={inputMode ?? (decimalScale === 0 ? 'numeric' : 'decimal')}
        autoComplete="off"
        value={text}
        onChange={handleChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    );
  }
);

InputNumber.displayName = 'InputNumber';

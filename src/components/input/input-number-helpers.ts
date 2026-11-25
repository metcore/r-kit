// Logika murni InputNumber (tanpa React/DOM) supaya bisa dites langsung
// dengan `node --test`. Jangan import apa pun dari luar file ini.

export interface NumberFormatOptions {
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  thousandSeparator: string | false;
  decimalSeparator: string;
  prefix: string;
  suffix: string;
  allowNegative: boolean;
}

export interface NumberParts {
  negative: boolean;
  int: string;
  dec: string;
  hasDec: boolean;
}

/**
 * Batas digit yang masih presisi di `number` JavaScript. Ketikan yang
 * melewatinya ditolak, supaya angka yang tampil selalu sama persis dengan
 * nilai yang dikirim `onChange`.
 */
export const MAX_SIGNIFICANT_DIGITS = 15;

export const isDigit = (ch: string) => ch >= '0' && ch <= '9';

/** Pembulatan desimal tanpa jebakan float `toFixed` (1.005 → 1.01). */
export const roundTo = (n: number, scale?: number) => {
  if (scale === undefined || !Number.isFinite(n)) return n;
  const shifted = Number(`${Math.abs(n)}e${scale}`);
  if (!Number.isFinite(shifted)) return Number(n.toFixed(scale));
  const rounded = Number(`${Math.round(shifted)}e-${scale}`);
  if (Number.isNaN(rounded)) return Number(n.toFixed(scale));
  return n < 0 ? -rounded : rounded;
};

const toPlainString = (n: number) =>
  n.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits: 20,
  });

/** Jumlah digit bermakna (tanpa nol di depan bagian bulat). */
export const countDigits = ({ int, dec }: NumberParts) =>
  int.replace(/^0+/, '').length + dec.length;

export const parseParts = (
  raw: string,
  opts: NumberFormatOptions
): NumberParts => {
  const { prefix, suffix, decimalSeparator, decimalScale } = opts;
  let s = raw;
  if (prefix !== '' && s.includes(prefix)) s = s.replace(prefix, '');
  if (suffix !== '' && s.endsWith(suffix)) s = s.slice(0, -suffix.length);

  const negative = opts.allowNegative && s.includes('-');
  let int = '';
  let dec = '';
  let hasDec = false;

  for (const ch of s) {
    if (isDigit(ch)) {
      if (hasDec) dec += ch;
      else int += ch;
    } else if (ch === decimalSeparator && decimalScale !== 0 && !hasDec) {
      hasDec = true;
    }
  }

  int = int.replace(/^0+(?=\d)/, '');
  if (decimalScale !== undefined) dec = dec.slice(0, decimalScale);
  if (hasDec && int === '') int = '0';

  return { negative, int, dec, hasDec };
};

export const formatParts = (
  { negative, int, dec, hasDec }: NumberParts,
  opts: NumberFormatOptions
) => {
  if (int === '' && !hasDec) return negative ? '-' : '';
  const { thousandSeparator, prefix, suffix, decimalSeparator } = opts;
  const grouped =
    thousandSeparator !== false && thousandSeparator !== ''
      ? int.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
      : int;
  return (
    (negative ? '-' : '') +
    prefix +
    grouped +
    (hasDec ? decimalSeparator + dec : '') +
    suffix
  );
};

export const partsToNumber = ({ negative, int, dec }: NumberParts) => {
  if (int === '' && dec === '') return null;
  const n = Number(`${negative ? '-' : ''}${int || '0'}.${dec || '0'}`);
  if (Number.isNaN(n)) return null;
  return n === 0 ? 0 : n; // buang -0
};

/** Lengkapi nol desimal sesuai `fixedDecimalScale`. */
export const padParts = (
  parts: NumberParts,
  opts: NumberFormatOptions
): NumberParts => {
  const { decimalScale, fixedDecimalScale } = opts;
  if (fixedDecimalScale !== true || decimalScale === undefined) return parts;
  if (decimalScale === 0 || parts.int === '') return parts;
  return {
    ...parts,
    hasDec: true,
    dec: parts.dec.padEnd(decimalScale, '0'),
  };
};

export const numberToParts = (
  n: number,
  opts: NumberFormatOptions
): NumberParts => {
  const rounded = roundTo(n, opts.decimalScale);
  const [int = '0', dec = ''] = toPlainString(Math.abs(rounded)).split('.');
  return padParts(
    { negative: rounded < 0, int, dec, hasDec: dec.length > 0 },
    opts
  );
};

export const formatNumber = (
  n: number | null | undefined,
  opts: NumberFormatOptions
) => {
  if (n === null || n === undefined || !Number.isFinite(n)) return '';
  return formatParts(numberToParts(n, opts), opts);
};

/**
 * Ubah teks tempelan (mis. `1,234.56` atau `1.234,56`) ke bentuk kanonik:
 * tanpa pemisah ribuan, desimal memakai `decimalSeparator`.
 */
export const normalizePasted = (text: string, decimalSeparator: string) => {
  const cleaned = text.replace(/[^0-9.,-]/g, '');
  const lastDot = cleaned.lastIndexOf('.');
  const lastComma = cleaned.lastIndexOf(',');
  let decimalIndex = -1;

  if (lastDot !== -1 && lastComma !== -1) {
    decimalIndex = Math.max(lastDot, lastComma);
  } else if (lastDot !== -1 || lastComma !== -1) {
    const sep = lastDot !== -1 ? '.' : ',';
    const index = Math.max(lastDot, lastComma);
    const occurrences = cleaned.split(sep).length - 1;
    const digitsAfter = cleaned.slice(index + 1).replace(/\D/g, '').length;
    const looksLikeThousands = occurrences > 1 || digitsAfter === 3;
    if (sep === decimalSeparator ? occurrences === 1 : !looksLikeThousands) {
      decimalIndex = index;
    }
  }

  let out = '';
  for (let i = 0; i < cleaned.length; i++) {
    const ch = cleaned.charAt(i);
    if (isDigit(ch) || ch === '-') out += ch;
    else if (i === decimalIndex) out += decimalSeparator;
  }
  return out;
};

/**
 * Keypad HP (`inputMode="decimal"`) cuma menampilkan pemisah desimal sesuai
 * locale perangkat — HP berbahasa Inggris hanya punya `.`, padahal `.` di
 * sini pemisah ribuan. Karena pemisah ribuan selalu disisipkan otomatis dan
 * tidak pernah diketik manual, satu karakter `.`/`,` yang baru diketik
 * dianggap sebagai pemisah desimal.
 *
 * `prev` = teks sebelum perubahan, `raw` = teks sesudah, `caret` = posisi
 * kursor sesudah perubahan. Mengembalikan `raw` yang sudah dikoreksi.
 */
export const coerceTypedDecimal = (
  prev: string,
  raw: string,
  caret: number,
  opts: NumberFormatOptions
) => {
  if (opts.decimalScale === 0) return raw;
  if (raw.length !== prev.length + 1 || caret < 1) return raw;
  const typed = raw.charAt(caret - 1);
  if (typed !== '.' && typed !== ',') return raw;
  if (typed === opts.decimalSeparator) return raw;
  if (raw.slice(0, caret - 1) + raw.slice(caret) !== prev) return raw;
  return raw.slice(0, caret - 1) + opts.decimalSeparator + raw.slice(caret);
};

// Jalankan: npm run test   (node --test bawaan, tanpa dependency tambahan)
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_SIGNIFICANT_DIGITS,
  coerceTypedDecimal,
  countDigits,
  formatNumber,
  formatParts,
  normalizePasted,
  padParts,
  parseParts,
  partsToNumber,
  roundTo,
  type NumberFormatOptions,
} from '../src/components/input/input-number-helpers.ts';

const ID: NumberFormatOptions = {
  thousandSeparator: '.',
  decimalSeparator: ',',
  prefix: '',
  suffix: '',
  allowNegative: true,
};

const reformat = (raw: string, opts: NumberFormatOptions = ID) =>
  formatParts(parseParts(raw, opts), opts);
const toNum = (raw: string, opts: NumberFormatOptions = ID) =>
  partsToNumber(parseParts(raw, opts));

describe('parse + format saat mengetik', () => {
  it('menyisipkan pemisah ribuan', () => {
    assert.equal(reformat('1234567'), '1.234.567');
    assert.equal(reformat('1.234567'), '1.234.567');
    assert.equal(toNum('1.234.567'), 1234567);
  });

  it('menjaga desimal yang belum selesai diketik', () => {
    assert.equal(reformat('12,'), '12,');
    assert.equal(toNum('12,'), 12);
    assert.equal(reformat(',5'), '0,5');
    assert.equal(reformat('0,0'), '0,0');
  });

  it('membatasi digit desimal dengan decimalScale', () => {
    const opts = { ...ID, decimalScale: 2 };
    assert.equal(reformat('1234,5678', opts), '1.234,56');
    assert.equal(toNum('1234,5678', opts), 1234.56);
  });

  it('decimalScale 0 membuang pemisah desimal', () => {
    const opts = { ...ID, decimalScale: 0 };
    assert.equal(reformat('12,5', opts), '125');
  });

  it('hanya memakai pemisah desimal pertama', () => {
    assert.equal(reformat('1,2,3'), '1,23');
  });

  it('membuang nol di depan', () => {
    assert.equal(reformat('000123'), '123');
    assert.equal(reformat('0'), '0');
  });

  it('menangani negatif', () => {
    assert.equal(reformat('-1234'), '-1.234');
    assert.equal(reformat('-'), '-');
    assert.equal(toNum('-'), null);
    assert.equal(reformat('-1234', { ...ID, allowNegative: false }), '1.234');
  });

  it('-0 dikirim sebagai 0', () => {
    assert.ok(Object.is(toNum('-0'), 0));
  });

  it('kosong = null', () => {
    assert.equal(reformat(''), '');
    assert.equal(toNum(''), null);
  });

  it('prefix dan suffix', () => {
    const opts = { ...ID, prefix: 'Rp ', suffix: ' %' };
    assert.equal(reformat('1234', opts), 'Rp 1.234 %');
    assert.equal(reformat('Rp 1.2345 %', opts), 'Rp 12.345 %');
    assert.equal(toNum('Rp 12.345 %', opts), 12345);
    assert.equal(reformat('-Rp 5', opts), '-Rp 5 %');
  });

  it('format US', () => {
    const opts = { ...ID, thousandSeparator: ',', decimalSeparator: '.' };
    assert.equal(reformat('1234567.5', opts), '1,234,567.5');
    assert.equal(toNum('1,234,567.5', opts), 1234567.5);
  });

  it('tanpa pemisah ribuan', () => {
    assert.equal(
      reformat('1234567', { ...ID, thousandSeparator: false }),
      '1234567'
    );
  });
});

describe('formatNumber (nilai dari luar)', () => {
  it('memformat number', () => {
    assert.equal(formatNumber(1234567.89, ID), '1.234.567,89');
    assert.equal(formatNumber(-1500, ID), '-1.500');
    assert.equal(formatNumber(null, ID), '');
    assert.equal(formatNumber(Number.NaN, ID), '');
  });

  it('fixedDecimalScale melengkapi nol', () => {
    const opts = { ...ID, decimalScale: 2, fixedDecimalScale: true };
    assert.equal(formatNumber(1500, opts), '1.500,00');
    assert.equal(formatNumber(1.5, opts), '1,50');
  });

  it('tidak menampilkan notasi ilmiah untuk angka kecil', () => {
    assert.equal(formatNumber(0.0000001, ID), '0,0000001');
  });

  it('membulatkan sesuai decimalScale', () => {
    assert.equal(formatNumber(1.005, { ...ID, decimalScale: 2 }), '1,01');
    assert.equal(formatNumber(0.1 + 0.2, { ...ID, decimalScale: 2 }), '0,3');
  });
});

describe('roundTo', () => {
  it('menghindari jebakan float toFixed', () => {
    assert.equal(roundTo(1.005, 2), 1.01);
    assert.equal(roundTo(-1.005, 2), -1.01);
    assert.equal(roundTo(2.345, 2), 2.35);
    assert.equal(roundTo(1e-7, 2), 0);
    assert.equal(roundTo(1234.5, 0), 1235);
    assert.equal(roundTo(1.23456), 1.23456);
  });
});

describe('padParts (blur)', () => {
  it('melengkapi nol desimal hanya kalau fixedDecimalScale', () => {
    const fixed = { ...ID, decimalScale: 2, fixedDecimalScale: true };
    const parts = parseParts('12,5', fixed);
    assert.equal(formatParts(padParts(parts, fixed), fixed), '12,50');
    assert.equal(formatParts(padParts(parts, ID), ID), '12,5');
  });

  it('tidak mengisi isian kosong', () => {
    const fixed = { ...ID, decimalScale: 2, fixedDecimalScale: true };
    assert.equal(
      formatParts(padParts(parseParts('', fixed), fixed), fixed),
      ''
    );
  });
});

describe('batas presisi', () => {
  it('menghitung digit bermakna', () => {
    assert.equal(countDigits(parseParts('0,05', ID)), 2);
    assert.equal(countDigits(parseParts('1.234,5', ID)), 5);
  });

  it(`${MAX_SIGNIFICANT_DIGITS} digit masih presisi di number`, () => {
    const raw = '9'.repeat(MAX_SIGNIFICANT_DIGITS);
    assert.equal(String(toNum(raw)), raw);
  });
});

describe('normalizePasted', () => {
  it('membaca berbagai format', () => {
    assert.equal(normalizePasted('1,234.56', ','), '1234,56');
    assert.equal(normalizePasted('1.234,56', ','), '1234,56');
    assert.equal(normalizePasted('Rp 1.234', ','), '1234');
    assert.equal(normalizePasted('1.234.567', ','), '1234567');
    assert.equal(normalizePasted('12.5', ','), '12,5');
    assert.equal(normalizePasted('12,5', ','), '12,5');
    assert.equal(normalizePasted('-3,000', '.'), '-3000');
    assert.equal(normalizePasted('abc', ','), '');
  });
});

describe('coerceTypedDecimal (keypad HP)', () => {
  it('titik yang baru diketik jadi pemisah desimal', () => {
    assert.equal(coerceTypedDecimal('12', '12.', 3, ID), '12,');
    assert.equal(coerceTypedDecimal('1.234', '1.234.', 6, ID), '1.234,');
  });

  it('pemisah desimal yang benar dibiarkan', () => {
    assert.equal(coerceTypedDecimal('12', '12,', 3, ID), '12,');
  });

  it('bukan ketikan satu karakter = dibiarkan', () => {
    assert.equal(coerceTypedDecimal('12', '1.234', 5, ID), '1.234');
    assert.equal(coerceTypedDecimal('1.234', '1234', 3, ID), '1234');
  });

  it('decimalScale 0 tidak dikoreksi', () => {
    const opts = { ...ID, decimalScale: 0 };
    assert.equal(coerceTypedDecimal('12', '12.', 3, opts), '12.');
  });

  it('format US: koma yang diketik jadi titik', () => {
    const opts = { ...ID, thousandSeparator: ',', decimalSeparator: '.' };
    assert.equal(coerceTypedDecimal('12', '12,', 3, opts), '12.');
  });
});

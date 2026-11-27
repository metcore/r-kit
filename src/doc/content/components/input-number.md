---
title: Input Number
description: Isian angka dengan format ribuan, desimal, prefix, dan suffix.
group: Form
playground: /playground/input-number
---

Turunan dari `Input` untuk angka yang perlu diformat — nominal uang,
persentase, berat, dan sejenisnya. Semua prop `Input` (`label`, `hint`,
`errorMessages`, `size`, `clearAble`, dll.) tetap berlaku.

Bawaannya mengikuti format Indonesia: titik untuk ribuan, koma untuk
desimal (`1.234.567,89`).

## Impor

```tsx
import { InputNumber } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [nominal, setNominal] = useState<number | null>(null);

<InputNumber label="Nominal" value={nominal} onChange={setNominal} />;
```

Nilainya bertipe **`number | null`** — `null` berarti isian kosong. Yang
tampil di layar sudah diformat, tapi `onChange` selalu mengirim angka murni.
`onChange` hanya terpanggil kalau angkanya berubah, bukan saat format saja
yang berubah (mis. mengetik `12,` belum mengubah nilai `12`).

## Desimal

```tsx
<InputNumber label="Berat (kg)" decimalScale={2} />
<InputNumber label="Harga" decimalScale={2} fixedDecimalScale />
```

`decimalScale` membatasi jumlah digit di belakang koma saat mengetik.
`fixedDecimalScale` melengkapi nol saat blur, jadi `1500` tampil
`1.500,00`. `decimalScale={0}` = hanya bilangan bulat.

## Prefix & Suffix

```tsx
<InputNumber label="Gaji" prefix="Rp " decimalScale={0} />
<InputNumber label="Diskon" suffix=" %" decimalScale={2} max={100} />
```

## Rata Kanan

Untuk nominal uang atau angka yang dibandingkan dalam satu kolom form,
ratakan ke kanan supaya digit satuan sejajar. Label dan hint tetap rata kiri.

```tsx
<InputNumber label="Total" prefix="Rp " align="right" />
```

## Batas Nilai

```tsx
<InputNumber label="Jumlah" min={1} max={999} allowNegative={false} />
```

`min` dan `max` diterapkan saat blur, bukan per ketikan, supaya user tetap
bisa mengetik angka yang sementara di luar batas (mis. `5` dalam perjalanan
ke `50` dengan `min={10}`).

## Format Lain

```tsx
<InputNumber thousandSeparator="," decimalSeparator="." />
<InputNumber thousandSeparator={false} />
```

## Tempel (Paste)

Teks yang ditempel dinormalisasi otomatis: `1,234.56`, `1.234,56`, dan
`Rp 1.234` semuanya terbaca dengan benar.

## Keypad HP

Keypad `inputMode="decimal"` hanya menampilkan pemisah desimal sesuai bahasa
perangkat; HP berbahasa Inggris cuma punya tombol `.`. Karena pemisah ribuan
selalu disisipkan otomatis, satu karakter `.` atau `,` yang diketik selalu
dianggap pemisah desimal — `12.5` di keypad Inggris tetap jadi `12,5`.

## Batas Digit

Maksimal **15 digit** (bulat + desimal). Ketikan atau tempelan yang
melewatinya ditolak, karena `number` JavaScript tidak presisi di atas itu dan
angka yang tampil bisa berbeda dengan nilai yang dikirim. Untuk NIK, nomor
rekening, atau ID panjang lain, pakai [Input](/docs/input) biasa — itu
teks, bukan angka.

## Props

Selain props di bawah, semua props [Input](/docs/input) kecuali
`type`, `value`, `defaultValue`, dan `onChange` diteruskan.

| Prop                | Tipe                                                 | Bawaan  | Keterangan                          |
| ------------------- | ---------------------------------------------------- | ------- | ----------------------------------- |
| `value`             | `number \| null`                                     | —       | Mode terkendali. `null` = kosong    |
| `defaultValue`      | `number \| null`                                     | —       | Nilai awal mode tak terkendali      |
| `onChange`          | `(value: number \| null, formatted: string) => void` | —       | Dipanggil saat angka berubah        |
| `decimalScale`      | `number`                                             | bebas   | Maksimal digit desimal. `0` = bulat |
| `fixedDecimalScale` | `boolean`                                            | `false` | Lengkapi nol desimal saat blur      |
| `thousandSeparator` | `string \| false`                                    | `"."`   | Pemisah ribuan                      |
| `decimalSeparator`  | `string`                                             | `","`   | Pemisah desimal                     |
| `prefix`            | `string`                                             | —       | Teks di depan angka                 |
| `suffix`            | `string`                                             | —       | Teks di belakang angka              |
| `min`               | `number`                                             | —       | Batas bawah (saat blur)             |
| `max`               | `number`                                             | —       | Batas atas (saat blur)              |
| `allowNegative`     | `boolean`                                            | `true`  | Mengizinkan angka negatif           |
| `align`             | `left \| right`                                      | `left`  | Perataan angka di dalam isian       |

## Catatan

- Elemen `<input>`-nya bertipe `text` dengan `inputMode="decimal"` (atau
  `numeric` kalau `decimalScale={0}`), bukan `type="number"` — tipe
  `number` tidak bisa menampilkan pemisah ribuan.
- Dengan `react-hook-form`, pakai `Controller`:
  `<InputNumber value={field.value} onChange={field.onChange} />`.

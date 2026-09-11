---
title: DayOfMonthPicker
description: Memilih tanggal ke berapa dalam sebulan.
group: Form
playground: /playground/day-of-month-picker
---

Salah satu dari empat pemilih ringkas yang berbagi bentuk prop sama:
`MonthPicker`, `YearPicker`, `DayPicker`, dan `DayOfMonthPicker`.

## Impor

```tsx
import { DayOfMonthPicker } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<DayOfMonthPicker label="Day Of Month Picker" onChange={(nilai) => simpan(nilai)} />
```

## Tiga Mode

Prop `mode` menentukan berapa banyak yang boleh dipilih:

```tsx
<DayOfMonthPicker mode="single" />    // satu pilihan, bawaan
<DayOfMonthPicker mode="multiple" />  // banyak pilihan
<DayOfMonthPicker mode="range" />     // rentang antara dua nilai
```

Bentuk nilai pada `onChange` menyesuaikan mode yang dipakai.

## Perubahan yang Ditunda

Pilihan bersifat sementara sampai tombol konfirmasi ditekan. `onApply`
memberi nilai akhirnya, sedangkan `onChange` mengikuti setiap perubahan:

```tsx
<DayOfMonthPicker
  onApply={(nilai) => simpan(nilai)}
  confirmLabel="Terapkan"
  cancelLabel="Batal"
/>
```

## Nilai Awal

```tsx
<DayOfMonthPicker defaultValue={15} />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `mode` | `single \| multiple \| range` | `single` | Banyaknya pilihan yang diizinkan |
| `defaultValue` | mengikuti `mode` | — | Nilai awal |
| `onChange` | `(value) => void` | — | Dipanggil saat pilihan berubah |
| `onApply` | `(value) => void` | — | Dipanggil saat tombol konfirmasi ditekan |
| `title` | `string` | — | Judul di dalam panel |
| `cancelLabel` | `string` | — | Teks tombol batal |
| `confirmLabel` | `string` | — | Teks tombol konfirmasi |
| `direction` | `horizontal \| vertical` | — | Arah susunan panel |
| `placeholder` | `string` | — | Teks saat belum ada pilihan |
| `size` | `InputSize` | `md` | Ukuran isian |
| `label`, `hint`, `description` | `string` | — | Prop form baku |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `tooltip` | `string` | — | Keterangan saat disentuh |
| `required` | `boolean` | `false` | Menandai wajib diisi |
| `disabled` | `boolean` | `false` | Menonaktifkan |

## Catatan

Keempat pemilih ini memakai `usePickerState` di baliknya. Hook itu ikut
diekspor bila kamu perlu membangun pemilih serupa:

```tsx
import { usePickerState } from '@herca/r-kit/clients';
```

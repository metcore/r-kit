---
title: DatePicker
description: Memilih satu tanggal atau rentang tanggal lewat kalender.
group: Form
playground: /playground/date-picker
---

## Impor

```tsx
import { DatePicker } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [tanggal, setTanggal] = useState<Date | null>(null);

<DatePicker label="Tanggal mulai" value={tanggal} onChange={setTanggal} />;
```

## Rentang Tanggal

Mode rentang memakai prop yang berbeda — `rangeValue` dan
`onRangeChange`, bukan `value` dan `onChange`:

```tsx
import type { DateRange } from '@herca/r-kit/clients';

const [rentang, setRentang] = useState<DateRange>({ start: null, end: null });

<DatePicker
  mode="range"
  rangeValue={rentang}
  onRangeChange={setRentang}
/>;
```

## Membatasi Tanggal

```tsx
<DatePicker minDate={new Date()} maxDate={new Date(2026, 11, 31)} />
```

## Format Tampilan

```tsx
<DatePicker format="dd/MM/yyyy" />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `mode` | `single \| range` | `single` | Satu tanggal atau rentang |
| `value` | `Date \| null` | — | Nilai untuk mode `single` |
| `onChange` | `(date: Date \| null) => void` | — | Dipanggil pada mode `single` |
| `rangeValue` | `DateRange` | — | Nilai untuk mode `range` |
| `onRangeChange` | `(range: DateRange) => void` | — | Dipanggil pada mode `range` |
| `format` | `DateFormat` | — | Format tampilan tanggal |
| `minDate` | `Date` | — | Tanggal paling awal yang bisa dipilih |
| `maxDate` | `Date` | — | Tanggal paling akhir yang bisa dipilih |
| `isClearable` | `boolean` | `false` | Menampilkan tombol hapus pilihan |
| `open` | `boolean` | — | Mengendalikan buka tutup panel |
| `onOpenChange` | `(open: boolean) => void` | — | Dipanggil saat panel dibuka atau ditutup |
| `align` | `start \| center \| end` | — | Perataan panel terhadap isian |
| `size` | `sm \| md \| lg` | `md` | Ukuran isian |
| `placeholder` | `string` | — | Teks saat belum ada pilihan |
| `label`, `hint`, `description` | `string` | — | Prop form baku |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `calendarProps` | `CalendarOverrideProps` | — | Meneruskan prop ke kalender di dalamnya |
| `autoWidth` | `boolean` | — | Lebar mengikuti isi |
| `showController` | `boolean` | — | Menampilkan tombol navigasi bulan |

## Catatan

Memakai `value` pada mode `range` — atau sebaliknya — membuat pilihan
tidak pernah tampil. Pastikan pasangan propnya sesuai modenya.

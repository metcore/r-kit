---
title: Calendar
description: Kalender bulanan untuk memilih tanggal dan menampilkan agenda.
group: Components
playground: /playground/calendar
---

Kalender mentah yang juga dipakai di balik [DatePicker](/docs/date-picker).
Gunakan langsung bila kamu perlu menampilkan kalender di halaman, bukan
di dalam panel.

## Impor

```tsx
import { Calendar } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [tanggal, setTanggal] = useState<Date | null>(new Date());

<Calendar variant="compact" value={tanggal} onChange={setTanggal} />;
```

## Mode Rentang

```tsx
const [rentang, setRentang] = useState({ start: null, end: null });

<Calendar
  mode="range"
  value={rentang.start}
  rangeValue={rentang}
  onChange={pilihTanggal}
/>;
```

Berbeda dari `DatePicker`, di sini `onChange` tetap dipakai — kamu yang
menyusun logika rentangnya sendiri.

## Menonaktifkan Tanggal

```tsx
<Calendar
  disabledDates={[new Date(2026, 2, 14), new Date(2026, 2, 15)]}
  styleConfig={{ disabled: { background: '#fee4e2', text: '#f04438' } }}
/>
```

Bulan dihitung dari nol: `2` berarti Maret.

## Penanda Titik

```tsx
<Calendar
  dayConfigs={[
    { date: new Date(2026, 2, 10), dots: [{ color: '#3b82f6' }] },
  ]}
/>
```

## Agenda

Varian penuh menampilkan agenda sebagai bilah lintas hari:

```tsx
<Calendar
  events={[
    {
      title: 'Sprint Planning',
      subtitle: 'Tim Produk',
      color: 'primary',
      startDate: '2026-03-02',
      endDate: '2026-03-06',
    },
  ]}
  useLimitEvent={false}
  onEventClick={(event) => buka(event)}
/>
```

Tanggal agenda berupa string `YYYY-MM-DD`, bukan objek `Date`.

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `Date \| null` | — | Tanggal terpilih |
| `onChange` | `(date: Date) => void` | — | Dipanggil saat tanggal diklik |
| `mode` | `single \| range` | `single` | Satu tanggal atau rentang |
| `rangeValue` | `DateRangeProps` | — | Rentang aktif |
| `variant` | `compact \| default` | `default` | Kerapatan tampilan |
| `size` | `sm \| md \| lg` | — | Ukuran kalender |
| `disabledDates` | `Date[]` | — | Tanggal yang tidak bisa dipilih |
| `disabled` | `(date: Date) => boolean` | — | Aturan penonaktifan dinamis |
| `dayConfigs` | `CalendarDayConfig[]` | — | Penanda titik per tanggal |
| `styleConfig` | `CalendarStyleConfig` | — | Warna keadaan terpilih dan nonaktif |
| `events` | `CalendarEvent[]` | — | Agenda yang ditampilkan |
| `useLimitEvent` | `boolean` | — | Membatasi jumlah agenda per hari |
| `onEventClick` | `(event) => void` | — | Dipanggil saat agenda diklik |
| `defaultMonth`, `defaultYear` | `number` | — | Bulan dan tahun awal |
| `showNavigator` | `boolean` | — | Menampilkan tombol pindah bulan |
| `showHeader` | `boolean` | — | Menampilkan kepala kalender |
| `daysOfWeek`, `months` | `string[]` | — | Nama hari dan bulan kustom |
| `onMonthChange`, `onYearChange` | `(n: number) => void` | — | Dipanggil saat periode berpindah |

## Catatan

Untuk memilih tanggal di dalam form, [DatePicker](/docs/date-picker)
lebih tepat karena sudah membungkus kalender ini dengan isian dan panel.

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

## Tampilan Minggu

```tsx
const AGENDA_MINGGU: CalendarEvent[] = [
  {
    title: 'Kultim di GBK',
    color: 'info',
    startDate: '2026-03-01',
    endDate: '2026-03-03',
  },
  {
    title: 'Sprint Planning',
    color: 'success',
    startDate: '2026-03-02',
    endDate: '2026-03-02',
    startDateTime: new Date(2026, 2, 2, 9, 0),
    endDateTime: new Date(2026, 2, 2, 10, 0),
  },
];

<Calendar type="week" events={AGENDA_MINGGU} showDefaultController />;
```

`type="week"` menampilkan grid per jam (00:00–23:00) untuk tujuh hari.
Agenda dengan `startDateTime` dan `endDateTime` — dan `startDate` sama dengan
`endDate` — dikelompokkan ke baris jam mulainya. Agenda yang berada di jam
yang sama ditumpuk penuh lebar (bukan dibagi kolom), dan baris jam itu
melebar otomatis untuk menampungnya; kalau lebih dari dua agenda di jam yang
sama, dua pertama tampil dan sisanya masuk tombol "+N more". Agenda lain
(lintas hari, atau tanpa `startDateTime`/`endDateTime`) tetap tampil di
baris "All Day" paling atas, sama seperti bilah agenda pada tampilan bulan.

Klik area kosong pada grid memanggil `backdropOnClick` dengan `fullDate`
yang sudah termasuk jam slot yang diklik — berguna untuk mengisi waktu awal
saat membuka form tambah jadwal. Tampilan minggu hanya berlaku untuk
`variant="default"`.

## Tampilan Hari

```tsx
const AGENDA_HARI: CalendarEvent[] = [
  {
    title: 'Kultim di GBK',
    color: 'info',
    startDate: '2026-03-02',
    endDate: '2026-03-02',
  },
  {
    title: 'Sprint Planning',
    color: 'success',
    startDate: '2026-03-02',
    endDate: '2026-03-02',
    startDateTime: new Date(2026, 2, 2, 9, 0),
    endDateTime: new Date(2026, 2, 2, 10, 0),
  },
];

<Calendar type="day" events={AGENDA_HARI} showDefaultController />;
```

Sama seperti `type="week"`, hanya satu kolom hari saja. Aturan
`startDateTime`/`endDateTime`, baris "All Day", `backdropOnClick`, dan
pengelompokan agenda per jam (termasuk batas dua-lalu-"+more") berlaku sama
persis — bedanya cuma jumlah kolom hari yang ditampilkan.

## Tampilan Tahun

```tsx
const PENANDA: CalendarDayConfig[] = [
  {
    date: new Date(2026, 2, 10),
    dots: [{ color: '#3b82f6' }, { color: '#ef4444' }],
  },
  { date: new Date(2026, 2, 12), dots: [{ color: '#10b981' }] },
];

<Calendar
  type="year"
  defaultYear={2026}
  value={tanggal}
  onChange={setTanggal}
  dayConfigs={PENANDA}
  showDefaultController
/>;
```

`type="year"` menampilkan dua belas kalender bulan (Januari–Desember
`currentYear`) dalam grid, masing-masing memakai tampilan `variant="compact"`
yang sama seperti `Calendar` biasa. `value`, `dayConfigs`, `disabledDates`,
dan `styleConfig` berlaku untuk seluruh dua belas bulan sekaligus, jadi
tanggal terpilih atau penanda titik otomatis muncul di bulan yang sesuai.
Tidak ada bilah agenda (`events` diabaikan) karena `variant="compact"`
memang tidak menampilkannya — pakai `type="month"` untuk itu. Sama seperti
minggu dan hari, tampilan tahun hanya berlaku untuk `variant="default"` pada
`Calendar` itu sendiri.

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
| `backdropOnClick` | `(day) => void` | — | Dipanggil saat area kosong tanggal/slot diklik |
| `type` | `week \| month \| year \| day \| agenda` | `month` | Tampilan aktif; saat ini `month`, `week`, `day`, dan `year` yang terimplementasi |
| `onTypeChange` | `(type) => void` | — | Dipanggil saat tampilan berpindah lewat dropdown bawaan |
| `showDefaultController` | `boolean` | — | Menampilkan tombol "Today" dan dropdown pemilih tampilan |
| `defaultMonth`, `defaultYear` | `number` | — | Bulan dan tahun awal |
| `showNavigator` | `boolean` | — | Menampilkan tombol pindah bulan |
| `showHeader` | `boolean` | — | Menampilkan kepala kalender |
| `daysOfWeek`, `months` | `string[]` | — | Nama hari dan bulan kustom |
| `onMonthChange`, `onYearChange` | `(n: number) => void` | — | Dipanggil saat periode berpindah |

## Catatan

Untuk memilih tanggal di dalam form, [DatePicker](/docs/date-picker)
lebih tepat karena sudah membungkus kalender ini dengan isian dan panel.

# DatePicker Component Documentation

Komponen `DatePicker` dipakai untuk memilih tanggal dengan 2 mode:

- `single` → pilih 1 tanggal
- `range` → pilih rentang tanggal (start–end)

Komponen ini sudah mendukung:

- beberapa format tanggal
- controlled & uncontrolled usage
- custom trigger
- controlled open state
- kustomisasi `Calendar` di mode single maupun range
- preset controller untuk range (Last Week, Last 7 Days, dll)

---

## Quick Start

```tsx
import { DatePicker } from '@/components/date-picker';
```

Paling sederhana:

```tsx
<DatePicker />
```

---

## Basic Usage

### 1) Single date

```tsx
<DatePicker format="DD-MM-YYYY" />
```

### 2) Range date

```tsx
<DatePicker mode="range" format="DD-MM-YYYY" />
```

### 3) Range without quick controller

```tsx
<DatePicker mode="range" showController={false} />
```

---

## Date Format

Format yang didukung:

- `DD-MM-YYYY`
- `DD/MM/YYYY`
- `DD MMM YYYY`
- `DD MMMM YYYY`
- `YYYY-MM-DD`
- `MM/DD/YYYY`

Tipe juga mendefinisikan format dengan waktu (`HH:mm:ss`), tapi parsing input manual di komponen saat ini fokus ke format tanggal (date-only).

---

## Modes

## `single`

- Input bisa diketik manual
- Tanggal juga bisa dipilih dari kalender
- Saat pilih tanggal dari kalender, dropdown otomatis tertutup

## `range`

- Input utama bersifat read-only
- Pemilihan dilakukan dari kalender start/end
- Nilai range disimpan saat klik tombol **Apply**
- Tombol **Cancel** menutup dropdown tanpa commit perubahan ke `onRangeChange`
- Jika `showController={true}`, preset range tersedia di panel kiri

---

## Controlled Usage

### Single (controlled)

```tsx
const [date, setDate] = useState<Date | null>(new Date());

<DatePicker value={date} onChange={setDate} />;
```

### Range (controlled)

```tsx
const [range, setRange] = useState({
  start: null as Date | null,
  end: null as Date | null,
});

<DatePicker mode="range" rangeValue={range} onRangeChange={setRange} />;
```

---

## Open State Control

```tsx
const [open, setOpen] = useState(false);

<DatePicker open={open} onOpenChange={setOpen} />;
```

Cocok untuk skenario:

- membuka DatePicker dari tombol eksternal
- sinkronisasi state popup dengan UI lain

---

## Custom Trigger

Gunakan `trigger` kalau ingin mengganti input default.

```tsx
<DatePicker
  trigger={<button className="btn">Pick date</button>}
  format="DD MMM YYYY"
/>;
```

---

## Calendar Customization

DatePicker expose override props untuk `Calendar`:

- `calendarProps` → untuk mode `single`
- `startDateCalendarProps` → kalender kiri di mode `range`
- `endDateCalendarProps` → kalender kanan di mode `range`

Contoh disable weekend di mode single:

```tsx
const disabledDates = [
  new Date(2026, 3, 4),
  new Date(2026, 3, 5),
  // ...
];

<DatePicker calendarProps={{ disabledDates }} />;
```

Contoh style/behavior berbeda antar kalender range:

```tsx
<DatePicker
  mode="range"
  startDateCalendarProps={{ showHeader: true }}
  endDateCalendarProps={{ showHeader: true }}
/>;
```

---

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `format` | `DateFormat` | `"DD-MM-YYYY"` | Format tampilan/input tanggal |
| `mode` | `"single" \| "range"` | `"single"` | Mode pemilihan tanggal |
| `value` | `Date \| null` | `undefined` | Controlled value untuk mode single |
| `rangeValue` | `DateRange` | `undefined` | Controlled value untuk mode range |
| `onChange` | `(date: Date \| null) => void` | `undefined` | Callback saat value single berubah |
| `onRangeChange` | `(range: DateRange) => void` | `undefined` | Callback saat range di-apply |
| `trigger` | `ReactNode` | `undefined` | Custom trigger pengganti input default |
| `open` | `boolean` | `undefined` | Controlled open/close dropdown |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback perubahan open state |
| `calendarProps` | `CalendarOverrideProps` | `undefined` | Override props `Calendar` di mode single |
| `startDateCalendarProps` | `CalendarRangeOverrideProps` | `undefined` | Override kalender start di mode range |
| `endDateCalendarProps` | `CalendarRangeOverrideProps` | `undefined` | Override kalender end di mode range |
| `wrapperClassName` | `string` | `undefined` | ClassName untuk dropdown content |
| `containerClassName` | `string` | `undefined` | ClassName untuk wrapper terluar |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Ukuran DatePicker & konten |
| `showController` | `boolean` | `true` | Tampilkan preset controller di mode range |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Align dropdown terhadap trigger |

---

## Type Reference

```ts
export interface DateRange {
  start: Date | null;
  end: Date | null;
}
```

```ts
export type DatePickerMode = 'single' | 'range';
```

```ts
export type DateFormat =
  | 'DD-MM-YYYY'
  | 'DD/MM/YYYY'
  | 'DD MMM YYYY'
  | 'DD MMMM YYYY'
  | 'YYYY-MM-DD'
  | 'MM/DD/YYYY'
  | 'DD-MM-YYYY HH:mm:ss'
  | 'DD/MM/YYYY HH:mm:ss'
  | 'DD MMM YYYY HH:mm:ss'
  | 'DD MMMM YYYY HH:mm:ss'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'MM/DD/YYYY HH:mm:ss'
  | 'DD MMMM YYYY - HH:mm:ss'
  | 'DD MMM YYYY - HH:mm:ss';
```

---

## Behavior Notes

1. Di mode `range`, callback `onRangeChange` dipanggil saat klik **Apply**.
2. Di mode `single`, mengetik input yang belum valid/full bisa mengirim `null` via `onChange`.
3. `open` bersifat optional. Jika tidak diberikan, DatePicker mengelola open state sendiri.
4. Untuk format berbasis nama bulan (`MMM` / `MMMM`), input manual menerima nama bulan yang terdaftar di helper komponen.

---

## Best Practices

- Gunakan **controlled mode** untuk form kompleks (validasi, reset, submit terpusat).
- Gunakan `calendarProps.disabledDates` untuk blacklist tanggal tertentu.
- Untuk UX mobile yang lebih rapi, biasanya `showController={false}` pada mode range.
- Simpan nilai dalam tipe `Date` di state, formatkan hanya untuk tampilan.


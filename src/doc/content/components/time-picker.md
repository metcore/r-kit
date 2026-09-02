---
title: TimePicker
description: Memilih waktu lewat roller jam, menit, dan detik.
group: Form
playground: /playground/time-picker
---

## Impor

```tsx
import { TimePicker } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [waktu, setWaktu] = useState('09:00');

<TimePicker label="Jam mulai" value={waktu} onChange={setWaktu} />;
```

Nilainya berupa string, bukan objek `Date`.

## Menentukan Kolom yang Tampil

```tsx
<TimePicker showHours showMinutes showSeconds />
```

Bawaannya hanya jam dan menit; detik dimatikan.

Setiap roller berputar tanpa henti: lewati batas atas (mis. jam 23) balik
lagi ke 00, dan sebaliknya — jadi bisa diputar terus ke arah manapun tanpa
pernah mentok.

## Format 12 Jam

```tsx
<TimePicker use12Hour showAmPm />
```

## Perubahan yang Ditunda

`onApply` dipanggil hanya saat tombol konfirmasi ditekan, sedangkan
`onChange` dipanggil setiap roller digeser. Tombol batal menutup panel
tanpa memanggil `onChange`/`onApply` — roller kembali ke nilai terakhir
yang tersimpan begitu panel dibuka lagi:

```tsx
<TimePicker
  onApply={(waktu) => simpan(waktu)}
  cancelLabel="Batalkan"
  confirmLabel="Terapkan"
/>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `string` | — | Mode terkendali |
| `defaultValue` | `string` | — | Nilai awal |
| `onChange` | `(val: string) => void` | — | Dipanggil setiap roller bergeser |
| `onApply` | `(val: string) => void` | — | Dipanggil saat tombol konfirmasi ditekan |
| `showHours` | `boolean` | `true` | Menampilkan kolom jam |
| `showMinutes` | `boolean` | `true` | Menampilkan kolom menit |
| `showSeconds` | `boolean` | `false` | Menampilkan kolom detik |
| `showAmPm` | `boolean` | `false` | Menampilkan kolom AM/PM |
| `use12Hour` | `boolean` | `false` | Memakai format 12 jam |
| `initialPosition` | `string` | — | Posisi roller saat pertama dibuka |
| `cancelLabel` | `string` | `Batalkan` | Teks tombol batal (menutup tanpa menyimpan) |
| `confirmLabel` | `string` | — | Teks tombol konfirmasi |
| `placeholder` | `string` | — | Teks saat belum ada pilihan |
| `size` | `InputSize` | `md` | Ukuran isian |
| `label`, `hint`, `tooltip` | `string` | — | Prop form baku |
| `errorMessages` | `string` | — | Mengaktifkan keadaan salah |
| `required` | `boolean` | `false` | Menandai wajib diisi |
| `disabled` | `boolean` | `false` | Menonaktifkan |

## Catatan

Berbeda dari komponen lain, `errorMessages` di sini hanya menerima
`string` — bukan larik.

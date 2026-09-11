# Dokumentasi

Komponen **TimePicker** adalah input pemilih waktu dengan tampilan roller (jam / menit / detik / AM-PM)
yang muncul di dalam dropdown. Struktur field-nya memakai `InputGroup` supaya label, hint, tooltip,
dan error konsisten dengan komponen form lainnya.

Fitur utama:

- kolom roller yang bisa dipilih: jam, menit, detik, AM/PM
- format 12 jam atau 24 jam
- pola **draft → apply**: perubahan roller baru tersimpan setelah tombol konfirmasi ditekan
- tombol **Sekarang** untuk mengisi roller dengan waktu saat ini
- label tombol bisa diganti (`nowLabel`, `confirmLabel`) untuk kebutuhan dua bahasa
- dropdown dirender lewat Portal dari Radix, jadi tidak terpotong `overflow: hidden`

---

## Import

```tsx
import { TimePicker } from '@herca/r-kit';
```

---

## Basic Usage

```tsx
<TimePicker label="Jam Mulai" onChange={(value) => console.log(value)} />
```

Nilai yang dikirim ke `onChange` berupa string hasil gabungan kolom yang aktif,
misalnya `"09:30"`, `"09:30:15"`, atau `"09:30 AM"`.

---

## Kolom yang Ditampilkan

Setiap kolom bisa dinyalakan/dimatikan sendiri-sendiri.

```tsx
<TimePicker label="Jam & Menit" />
<TimePicker label="Dengan Detik" showSeconds />
<TimePicker label="Hanya Jam" showMinutes={false} />
```

| Prop          | Default | Kolom          |
| ------------- | ------- | -------------- |
| `showHours`   | `true`  | jam            |
| `showMinutes` | `true`  | menit          |
| `showSeconds` | `false` | detik          |
| `showAmPm`    | `false` | AM/PM          |

---

## Format 12 Jam

`use12Hour` mengubah kolom jam menjadi 1–12. Pasangkan dengan `showAmPm` supaya
penanda AM/PM ikut tampil dan masuk ke nilai hasil.

```tsx
<TimePicker label="Jam Rapat" use12Hour showAmPm initialPosition="5:30" />
```

---

## Nilai Awal

Ada dua prop yang berbeda peran:

- `defaultValue` — nilai yang **sudah terpilih**, langsung tampil di input.
- `initialPosition` — posisi awal roller **tanpa** mengisi input; dipakai supaya
  dropdown tidak selalu membuka di `00:00`.

```tsx
<TimePicker label="Sudah Terisi" defaultValue="08:15" />
<TimePicker label="Posisi Awal Roller" initialPosition="08:15" />
```

---

## Label Tombol (Dua Bahasa)

Tombol di footer dropdown bisa diganti teksnya. Berguna kalau aplikasimu memakai
i18n dan perlu menampilkan bahasa selain default Indonesia.

```tsx
<TimePicker
  label="Start time"
  nowLabel="Now"
  confirmLabel="Apply"
  placeholder="Select time"
/>
```

Tombol kiri **bukan** tombol batal — tombol itu mengisi roller dengan waktu saat ini,
karena itu default labelnya `"Sekarang"`. Untuk menutup dropdown tanpa menyimpan,
klik di luar dropdown atau tekan `Escape`.

| Prop           | Default       |
| -------------- | ------------- |
| `nowLabel`     | `'Sekarang'`  |
| `confirmLabel` | `'Terapkan'`  |
| `placeholder`  | `'Pilih waktu'` |

---

## Portal

Dropdown dirender lewat `DropdownContent`, yang di dalamnya memakai
`DropdownMenu.Portal` dari Radix. Isinya jadi dipasang di luar hierarki DOM
TimePicker, sehingga tidak terpotong ancestor yang punya `overflow: hidden`.

---

## State Field

```tsx
<TimePicker label="Jam" required />
<TimePicker label="Jam" hint="Format 24 jam" />
<TimePicker label="Jam" tooltip="Jam operasional kantor" />
<TimePicker label="Jam" errorMessages="Jam wajib diisi" />
<TimePicker label="Jam" disabled />
```

---

## Ukuran

```tsx
<TimePicker label="Small" size="sm" />
<TimePicker label="Medium" size="md" />
<TimePicker label="Large" size="lg" />
```

---

## Props

### TimePickerProps

| Prop              | Type                     | Default          | Description                                                       |
| ----------------- | ------------------------ | ---------------- | ----------------------------------------------------------------- |
| showHours         | boolean                  | true             | Tampilkan kolom jam                                               |
| showMinutes       | boolean                  | true             | Tampilkan kolom menit                                             |
| showSeconds       | boolean                  | false            | Tampilkan kolom detik                                             |
| showAmPm          | boolean                  | false            | Tampilkan kolom AM/PM                                             |
| use12Hour         | boolean                  | false            | Pakai format 12 jam pada kolom jam                                |
| defaultValue      | string                   | –                | Nilai awal yang langsung tampil di input                          |
| initialPosition   | string                   | –                | Posisi awal roller tanpa mengisi input                            |
| onChange          | (val: string) => void    | –                | Dipanggil saat pilihan disimpan                                   |
| onApply           | (val: string) => void    | –                | Sama dengan `onChange`, dipanggil setelahnya                      |
| placeholder       | string                   | 'Pilih waktu'    | Placeholder input                                                 |
| nowLabel          | string                   | 'Sekarang'       | Label tombol pengisi waktu saat ini                               |
| confirmLabel      | string                   | 'Terapkan'       | Label tombol simpan                                               |
| label             | string                   | –                | Label field                                                       |
| hint              | string                   | –                | Teks bantuan di bawah field                                       |
| tooltip           | string                   | –                | Tooltip di samping label                                          |
| errorMessages     | string                   | –                | Pesan error                                                       |
| required          | boolean                  | false            | Tandai field wajib isi                                            |
| disabled          | boolean                  | false            | Nonaktifkan field                                                 |
| size              | sm \| md \| lg           | –                | Ukuran field                                                      |

---

## Notes

- Perubahan roller bersifat draft; `onChange` dan `onApply` baru terpanggil setelah tombol konfirmasi ditekan.
- Menutup dropdown tanpa konfirmasi tidak mengubah nilai — draft di-reset ke nilai tersimpan saat dropdown dibuka lagi.
- Prop `value` ada di tipe tapi belum dipakai; komponen ini masih uncontrolled, pakai `defaultValue`.

---

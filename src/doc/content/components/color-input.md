---
title: ColorInput
description: Isian warna dengan panel pemilih dan masukan heksadesimal.
group: Form
playground: /playground/color-picker
---

Isian teks yang menerima nilai heksadesimal, dilengkapi panel pemilih
warna saat kotaknya ditekan.

## Impor

```tsx
import { ColorInput } from '@herca/r-kit/clients';
import type { ColorValue } from '@herca/r-kit/clients';
```

Perhatikan namanya: komponennya bernama **`ColorInput`**, bukan
`ColorPicker`.

## Penggunaan Dasar

```tsx
<ColorInput label="Warna merek" placeholder="#2563EB" />
```

## Mengambil Nilainya

`onChange` tidak memberi string, melainkan objek berisi warna dalam
beberapa bentuk sekaligus:

```tsx
const [warna, setWarna] = useState('#2563EB');

<ColorInput
  onChange={(nilai: ColorValue) => setWarna(nilai.hex)}
/>;
```

Isi `ColorValue`:

| Field | Tipe | Isi |
| --- | --- | --- |
| `hex` | `string` | Nilai heksadesimal, misalnya `#2563EB` |
| `rgb` | `{ r, g, b }` | Komponen merah, hijau, biru |
| `hsv` | `{ h, s, v }` | Hue, saturation, value |
| `alpha` | `number` | Tingkat kepekatan |

## Nilai Awal

```tsx
const warnaDariDb = '#F04438';

<ColorInput value={warnaDariDb} />
```

Jika nilainya berasal dari form atau data hasil fetch, kirim lewat `value`.
Komponen akan menampilkan warna awal tersebut dan ikut berubah saat `value`
diperbarui dari parent.

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `string \| RGB \| HSV \| number` | — | Nilai awal dan sinkronisasi dari parent |
| `defaultColor` | `string` | — | Warna awal internal `BaseColorPicker` |
| `onChange` | `(color: ColorValue) => void` | — | Dipanggil saat warna berubah |
| `size` | `InputSize` | `md` | Ukuran isian |
| `label` | `string` | — | Teks di atas isian |
| `hint` | `string` | — | Keterangan di bawah isian |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `required` | `boolean` | `false` | Menandai wajib diisi |
| `disabled` | `boolean` | `false` | Menonaktifkan |

Prop `Input` lain diteruskan, kecuali `value`, `onChange`, dan
`children` yang dipakai ulang dengan makna berbeda.

Untuk kasus umum seperti edit data dari DB, gunakan `value`.

## Catatan

Direktori sumbernya bernama `collor-picker` — salah eja yang masih ada di
dalam repo. Nama ekspornya tetap `ColorInput`, jadi salah eja itu tidak
terlihat dari sisi pemakai.

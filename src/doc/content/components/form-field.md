---
title: FormField
description: Blok bangunan label, keterangan, dan pesan kesalahan di balik seluruh isian.
group: Form
---

Setiap isian di kit ini — `Input`, `Select`, `Checkbox`, dan lainnya —
menyusun label, petunjuk, serta pesan kesalahannya memakai komponen ini.
Kamu jarang memerlukannya langsung, kecuali sedang membungkus isian
buatan sendiri agar tampil seragam.

## Impor

```tsx
import {
  FormField,
  FormLabel,
  FormHint,
  FormDescription,
  FormErrorMessages,
} from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<FormField>
  <FormLabel required htmlFor="warna">
    Warna merek
  </FormLabel>

  <input id="warna" className="rounded-md border px-3 py-2" />

  <FormHint>Masukkan nilai heksadesimal.</FormHint>
</FormField>
```

## Menampilkan Kesalahan

```tsx
<FormField>
  <FormLabel htmlFor="warna">Warna merek</FormLabel>
  <input id="warna" />
  <FormErrorMessages messages={['Nilai tidak dikenali.']} />
</FormField>
```

`messages` menerima satu teks atau larik teks. Bila kosong, tidak ada
yang dirender.

## Ukuran Seragam

Seluruh bagian menerima `size` yang sama, sehingga label, petunjuk, dan
pesan kesalahan ikut menyesuaikan:

```tsx
<FormField>
  <FormLabel size="sm">Catatan</FormLabel>
  <FormHint size="sm">Maksimal 100 karakter.</FormHint>
</FormField>
```

## Props — FormLabel

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `htmlFor` | `string` | — | Menautkan label ke id isian |
| `required` | `boolean` | `false` | Menambahkan tanda bintang merah |
| `size` | `sm \| md \| lg \| null` | — | Ukuran teks |
| `tooltip` | `string` | — | Keterangan saat disentuh |
| `className` | `string` | — | Kelas tambahan |

## Props — FormHint & FormDescription

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `size` | `sm \| md \| lg \| null` | — | Ukuran teks |
| `className` | `string` | — | Kelas tambahan |

## Props — FormErrorMessages

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `messages` | `string \| string[]` | — | Pesan kesalahan yang ditampilkan |
| `size` | `sm \| md \| lg \| null` | — | Ukuran teks |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Untuk isian biasa, gunakan prop `label`, `hint`, dan `errorMessages` pada
komponennya langsung. Komponen ini hanya diperlukan ketika kamu merakit
isian sendiri di luar yang sudah disediakan kit.

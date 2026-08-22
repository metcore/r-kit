---
title: InputGroup
description: Menempelkan ikon, teks, atau tombol pada isian teks.
group: Form
playground: /playground/input-group
---

Pengganti resmi prop `leftAddon` dan `rightAddon` pada `Input` yang sudah
usang. Susunannya eksplisit, sehingga bebas menempatkan apa pun di kiri
maupun kanan isian.

## Impor

```tsx
import {
  InputGroup,
  InputGroupControl,
  InputGroupText,
} from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<InputGroup label="Harga">
  <InputGroupText>Rp</InputGroupText>
  <InputGroupControl placeholder="0" />
</InputGroup>
```

`InputGroupControl` adalah isian sesungguhnya. `InputGroupText` adalah
bagian tempel yang tidak bisa diketik.

## Menempel di Kanan

```tsx
<InputGroup label="Berat">
  <InputGroupControl placeholder="0" />
  <InputGroupText>kg</InputGroupText>
</InputGroup>
```

## Ikon sebagai Tempelan

```tsx
<InputGroup>
  <InputGroupText>
    <Icon name="search" size={18} />
  </InputGroupText>
  <InputGroupControl placeholder="Cari…" />
</InputGroup>
```

## Petunjuk & Kesalahan

Prop form dipasang di `InputGroup`, bukan di `InputGroupControl`:

```tsx
<InputGroup
  required
  label="Domain"
  hint="Tanpa http:// di depan."
  errorMessages={['Domain tidak valid.']}
>
  <InputGroupText>https://</InputGroupText>
  <InputGroupControl />
</InputGroup>
```

## Props — InputGroup

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `label` | `string` | — | Teks di atas isian |
| `hint` | `string` | — | Keterangan di bawah isian |
| `description` | `string` | — | Keterangan di bawah label |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `isError` | `boolean` | `false` | Keadaan salah tanpa pesan |
| `required` | `boolean` | `false` | Menandai wajib diisi |
| `disabled` | `boolean` | `false` | Menonaktifkan seluruh kelompok |
| `size` | `InputSize` | `md` | Ukuran isian |
| `variant` | `InputGroupVariant` | — | Gaya kelompok |
| `tooltip` | `string` | — | Keterangan saat disentuh |

Seluruh prop `<div>` lain diteruskan apa adanya.

## Catatan

`InputGroupControl` meneruskan prop `<input>` biasa, termasuk `value`,
`onChange`, dan `type`.

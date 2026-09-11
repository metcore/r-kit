---
title: Avatar
description: Menampilkan identitas seseorang lewat foto atau inisial.
group: Components
playground: /playground/avatar
---

## Impor

```tsx
import { Avatar } from '@herca/r-kit';
```

## Penggunaan Dasar

Tanpa `url`, komponen menampilkan inisial dari `name`:

```tsx
<Avatar name="Herca Pratama" />
```

## Dengan Foto

```tsx
<Avatar url="/foto-profil.jpg" name="Herca Pratama" />
```

`name` tetap diisi karena dipakai sebagai teks alternatif gambar.

## Bentuk

```tsx
<Avatar variant="circle" name="Herca" />
<Avatar variant="rounded" name="Herca" />
<Avatar variant="square" name="Herca" />
```

Berbeda dari komponen lain, `variant` di sini mengatur **bentuk**, bukan
bobot visual.

## Ukuran

```tsx
<Avatar size="xs" name="Herca" />
<Avatar size="xxl" name="Herca" />
```

## Tumpukan Tim

```tsx
<div className="flex -space-x-3">
  <Avatar name="Herca Pratama" className="ring-2 ring-white" />
  <Avatar name="Siti Rahayu" color="success" className="ring-2 ring-white" />
  <Avatar name="+5" color="gray" className="ring-2 ring-white" />
</div>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `name` | `string` | — | Nama; dipakai untuk inisial dan teks alternatif |
| `url` | `string` | — | Alamat gambar |
| `alt` | `string` | — | Teks alternatif, menimpa `name` |
| `variant` | `circle \| square \| rounded` | `circle` | Bentuk avatar |
| `size` | `xs \| sm \| md \| lg \| xl \| xxl` | `md` | Ukuran avatar |
| `color` | `AvatarColorType` | — | Warna latar avatar inisial |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Warna hanya berpengaruh pada avatar inisial. Saat `url` terisi, gambar
menutupi seluruh latar.

Terdapat tipe `AvatarGroupProps` di dalam kit, tetapi komponen
`AvatarGroup` belum ada. Susun tumpukan avatar secara manual seperti
contoh di atas.

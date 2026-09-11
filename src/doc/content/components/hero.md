---
title: Hero
description: Panel gradien untuk kepala halaman.
group: Components
---

Panel lebar dengan gradien lembut, dipakai sebagai kepala halaman.
Isinya bebas.

## Impor

```tsx
import { Hero } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<Hero>
  <p className="text-xs text-gray-800">Components</p>
  <h1 className="text-4xl font-semibold text-gray-900">Button</h1>
  <p className="text-sm text-gray-800">
    Menjalankan aksi atau berpindah halaman.
  </p>
</Hero>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `className` | `string` | — | Kelas tambahan |

Seluruh prop `<div>` lain diteruskan apa adanya.

## Catatan

Komponen ini sengaja tidak mengatur isinya sama sekali — hanya
menyediakan latar bergradien, sudut membulat, dan padding.

Bila menaruh elemen ber-`z-index` di dalamnya, bungkus `Hero` dengan
`relative z-0`. Tanpa itu, `z-index` anak akan bersaing langsung dengan
elemen lain di halaman, termasuk header yang menempel.

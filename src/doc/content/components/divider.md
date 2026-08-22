---
title: Divider
description: Garis pemisah antar bagian konten.
group: Foundation
---

Garis tipis untuk memisahkan bagian. Sengaja dibuat sesederhana mungkin —
hanya dua prop.

## Impor

```tsx
import { Divider } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<Divider />
```

## Arah

```tsx
<Divider orientation="horizontal" />
<Divider orientation="vertical" />
```

Varian `vertical` mengambil tinggi penuh dari induknya, jadi induk itu
harus punya tinggi yang jelas:

```tsx
<div className="flex h-10 items-center gap-3">
  <span>Kiri</span>
  <Divider orientation="vertical" />
  <span>Kanan</span>
</div>
```

## Mengubah Warna

Warna garis diatur lewat kelas border:

```tsx
<Divider className="border-gray-300" />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `orientation` | `horizontal \| vertical` | `horizontal` | Arah garis |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Komponen ini memasang `aria-hidden="true"`, sehingga pembaca layar
melewatinya. Bila pemisahan itu bermakna secara struktur, gunakan elemen
semantik seperti `<hr>` atau `<section>`, bukan komponen ini.

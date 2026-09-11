---
title: Kbd
description: Menampilkan tombol papan tik dalam teks.
group: Components
---

Dipakai untuk menuliskan pintasan papan tik, biasanya di dalam menu atau
keterangan.

## Impor

```tsx
import { Kbd } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<Kbd>Esc</Kbd>
```

## Menyusun Kombinasi

```tsx
<span className="flex items-center gap-1">
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</span>
```

## Ukuran, Varian, Warna

```tsx
<Kbd size="sm">Esc</Kbd>
<Kbd variant="outline">Esc</Kbd>
<Kbd color="primary">Esc</Kbd>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `size` | `sm \| md \| lg` | `md` | Ukuran |
| `variant` | `default \| outline \| ghost` | `default` | Gaya |
| `color` | `neutral \| primary \| success \| danger \| info \| warning` | `neutral` | Warna |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Daftar warna `Kbd` berbeda dari `BaseColor` — tidak ada `secondary`,
`orange`, maupun `purple`, dan ada `neutral` yang tidak dimiliki komponen
lain.

Komponen merender elemen `<kbd>`, sehingga maknanya terbaca benar oleh
pembaca layar.

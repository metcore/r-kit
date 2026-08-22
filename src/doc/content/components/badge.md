---
title: Badge
description: Label kecil untuk menandai status, kategori, atau jumlah.
group: Components
playground: /playground/badge
---

## Impor

```tsx
import { Badge } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<Badge color="success">Aktif</Badge>
```

## Warna

Menerima sembilan warna baku:

```tsx
<Badge color="primary">Baru</Badge>
<Badge color="danger">Ditolak</Badge>
<Badge color="warning">Menunggu</Badge>
```

## Varian Titik

`variant="dot"` membuang teks dan menyisakan bulatan kecil, berguna
sebagai penanda status di samping label:

```tsx
<Badge variant="dot" color="success" />
```

## Warna di Luar Token

```tsx
<Badge hexColor="#744577">Kategori Khusus</Badge>
```

Gunakan seperlunya — warna di luar token membuat tampilan antarproduk
mudah melenceng.

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `color` | `BaseColor` | — | Warna dari token |
| `hexColor` | `string` | — | Warna bebas, menimpa `color` |
| `variant` | `default \| dot` | `default` | Bentuk badge |
| `size` | `sm \| md \| lg` | `md` | Ukuran badge |
| `className` | `string` | — | Kelas tambahan |

Seluruh prop `<div>` lain diteruskan apa adanya.

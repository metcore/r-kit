---
title: Icon
description: Menampilkan salah satu dari 402 ikon bawaan kit.
group: Foundation
playground: /playground/icons
---

Kit membawa **402 ikon**. Semuanya dipanggil lewat satu komponen dengan
menyebut namanya.

## Impor

```tsx
import { Icon } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<Icon name="search" />
```

## Ukuran

Bawaannya 24 piksel.

```tsx
<Icon name="bell" size={16} />
<Icon name="bell" size={32} />
```

## Warna

Bawaannya `currentColor`, sehingga ikon mengikuti warna teks induknya.
Ini yang membuat ikon di dalam tombol otomatis ikut berubah warna:

```tsx
<span className="text-danger-500">
  <Icon name="flag" />
</span>
```

Bila perlu, warnanya bisa ditentukan langsung:

```tsx
<Icon name="flag" color="#f04438" />
```

## Nama Ikon yang Diketik

Tipe `IconNameProps` memuat seluruh nama yang tersedia, sehingga nama
yang salah ketik tertangkap sebelum kode dijalankan:

```tsx
import { Icon, type IconNameProps } from '@herca/r-kit';

const AKSI: { nama: IconNameProps; label: string }[] = [
  { nama: 'pencil', label: 'Ubah' },
  { nama: 'download', label: 'Unduh' },
];
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `name` | `IconNameProps` | — | Nama ikon. Wajib |
| `size` | `number` | `24` | Ukuran dalam piksel |
| `color` | `string` | `currentColor` | Warna ikon |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Nama ikon yang tidak dikenal membuat komponen merender `null` tanpa
melempar galat, sehingga kesalahan mudah terlewat saat dijalankan.
Andalkan `IconNameProps` untuk menangkapnya lebih awal.

Daftar lengkap 402 ikon beserta pencariannya ada di halaman Icon pada
Playground; kartu ikonnya bisa diklik untuk menyalin kode pemakaian.

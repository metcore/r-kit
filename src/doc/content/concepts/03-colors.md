---
title: Warna & Token
description: Sembilan warna BaseColor yang berlaku sama di seluruh komponen.
group: Konsep Inti
playground: /playground/colors
---

Hampir semua komponen menerima prop `color`, dan nilainya selalu berasal
dari daftar yang sama. Sekali hafal, berlaku di mana-mana.

## Sembilan warna

```tsx
type BaseColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'orange'
  | 'purple'
  | 'gray';
```

```tsx
<Button color="primary">Simpan</Button>
<Badge color="success">Aktif</Badge>
<Alert color="danger" title="Gagal menyimpan" />
```

## Makna yang disarankan

| Warna | Dipakai untuk |
| --- | --- |
| `primary` | Aksi utama pada satu layar |
| `secondary` | Aksi pendamping |
| `success` | Hasil berhasil, status aktif |
| `danger` | Kesalahan, aksi merusak |
| `warning` | Peringatan yang belum menggagalkan |
| `info` | Keterangan netral |
| `orange`, `purple` | Penanda kategori bebas |
| `gray` | Keadaan netral atau nonaktif |

Empat warna pertama sebaiknya dipakai sesuai maknanya. `orange` dan
`purple` sengaja tidak bermakna, supaya bebas dipakai menandai kategori.

## Tingkat warna di Tailwind

Setiap keluarga warna tersedia sebagai utility Tailwind dengan pola
`{properti}-{keluarga}-{tingkat}`:

```tsx
<div className="bg-primary-500 text-white" />
<p className="text-danger-500">Terjadi kesalahan</p>
<div className="border border-gray-200" />
```

Tingkatnya berkisar dari `50` (paling terang) sampai `1000` (paling
gelap), tergantung keluarganya. Daftar lengkap beserta nilai heksanya
bisa dilihat di halaman Color pada Playground — kartu warnanya bisa
diklik untuk menyalin nilai heks.

## Mengetik warna sendiri

Tipe `BaseColor` ikut diekspor, berguna saat membungkus komponen:

```tsx
import type { BaseColor } from '@herca/r-kit';

interface Props {
  status: BaseColor;
}
```

## Warna di luar daftar

Sebagian komponen menerima `hexColor` untuk warna bebas di luar sembilan
warna baku:

```tsx
<Badge hexColor="#744577">Kategori Khusus</Badge>
```

Gunakan seperlunya. Warna di luar token membuat tampilan antarproduk
mudah melenceng.

---
title: Tabel dengan Data API
description: Menampilkan data dari server lengkap dengan paginasi, pencarian, dan pengurutan.
group: Panduan
playground: /playground/api-table
---

`ApiTable` mengurus siklus pengambilan data — paginasi, pencarian,
pengurutan, penyaringan — sehingga kamu cukup menjelaskan sumber datanya
dan bentuk kolomnya.

## Bentuk paling sederhana

```tsx
import { ApiTable, useApiTable } from '@herca/r-kit/clients';
import type { ApiTableColumn } from '@herca/r-kit/clients';

interface Pengguna {
  id: number;
  nama: string;
  email: string;
}

const KOLOM: ApiTableColumn<Pengguna>[] = [
  { key: 'nama', header: 'Nama', sortable: true },
  { key: 'email', header: 'Email' },
];

export default function TabelPengguna() {
  const t = useApiTable<Pengguna>({
    url: '/api/pengguna',
    dataPath: 'data',
    totalPath: 'meta.total',
  });

  return <ApiTable t={t} columns={KOLOM} />;
}
```

Hook mengembalikan seluruh keadaan tabel, dan komponen membacanya lewat
satu prop `t`. Pemisahan ini memungkinkan kamu menaruh kontrol pencarian
atau penyaring di luar tabel.

## Menunjuk data di dalam respons

Bentuk respons tiap API berbeda. `dataPath` dan `totalPath` menunjuk
lokasi larik data dan jumlah totalnya, memakai notasi titik:

```tsx
useApiTable({
  url: '/api/pengguna',
  dataPath: 'data.items',   // { data: { items: [...] } }
  totalPath: 'data.total',
});
```

Bila jumlah total dikirim lewat header, gunakan `totalHeader`:

```tsx
useApiTable({
  url: '/api/pengguna',
  totalHeader: 'X-Total-Count',
});
```

## Kolom

```tsx
const KOLOM: ApiTableColumn<Pengguna>[] = [
  {
    key: 'nama',
    header: 'Nama',
    sortable: true,
    width: 240,
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (nilai) => <Badge color="success">{String(nilai)}</Badge>,
  },
  {
    key: 'dibuat',
    header: 'Dibuat',
    hideBelow: 'md',
  },
];
```

| Prop kolom | Kegunaan |
| --- | --- |
| `key` | Nama field pada baris data |
| `header` | Judul kolom; menerima elemen, bukan hanya teks |
| `sortable` | Menyalakan pengurutan lewat klik pada judul |
| `sortKey` | Nama field pengurutan bila berbeda dari `key` |
| `align` | `left`, `center`, atau `right` |
| `width` | Lebar tetap kolom |
| `render` | Mengganti tampilan sel |
| `hideBelow` | Menyembunyikan kolom di bawah lebar layar tertentu |

## Pengaturan lain yang tersedia

```tsx
useApiTable({
  url: '/api/pengguna',
  defaultPageSize: 25,      // bawaan 10
  searchDebounce: 500,      // bawaan 350 ms
  pageMode: 'page',         // 'page' atau 'offset'
  keepPreviousData: true,   // tahan data lama saat memuat halaman baru
  retry: 2,                 // ulangi bila permintaan gagal
  enabled: sudahSiap,       // tunda permintaan sampai bernilai true
  extraParams: { divisi: 'keuangan' },
});
```

`keepPreviousData` bernilai `true` secara bawaan, sehingga tabel tidak
berkedip kosong setiap berpindah halaman.

## Menunda permintaan

`enabled` berguna saat tabel bergantung pada nilai yang belum siap,
misalnya id dari halaman induk:

```tsx
const t = useApiTable({
  url: `/api/tim/${timId}/anggota`,
  enabled: timId !== undefined,
});
```

## Menyimpan keadaan tabel ke URL

Dengan `urlSync`, halaman aktif, kata kunci, dan pengurutan tersimpan di
query string sehingga tautannya bisa dibagikan dan tahan muat ulang:

```tsx
const t = useApiTable({
  url: '/api/pengguna',
  urlSync: true,
});
```

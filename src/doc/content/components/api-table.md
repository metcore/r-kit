---
title: ApiTable
description: Tabel yang mengambil data dari server lengkap dengan paginasi dan pencarian.
group: Data Display
playground: /playground/api-table
---

Ringkasan pemakaiannya ada di panduan
[Tabel dengan Data API](/docs/api-table-guide). Halaman ini merinci
propnya.

## Impor

```tsx
import { ApiTable, useApiTable } from '@herca/r-kit/clients';
import type { ApiTableColumn } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const t = useApiTable<Pengguna>({
  url: '/api/pengguna',
  dataPath: 'data',
  totalPath: 'meta.total',
});

<ApiTable t={t} columns={KOLOM} />;
```

Hook memegang seluruh keadaan tabel; komponen membacanya lewat satu prop
`t`. Pemisahan ini memungkinkan kontrol pencarian atau penyaring
diletakkan di luar tabel.

## Konfigurasi useApiTable

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `url` | `string` | — | Alamat sumber data. Wajib |
| `dataPath` | `string` | — | Letak larik data dalam respons, notasi titik |
| `totalPath` | `string` | — | Letak jumlah total dalam respons |
| `totalHeader` | `string` | — | Nama header berisi jumlah total |
| `defaultPageSize` | `number` | `10` | Jumlah baris per halaman |
| `pageMode` | `page \| offset` | `page` | Gaya parameter paginasi |
| `searchDebounce` | `number` | `350` | Jeda sebelum pencarian dikirim, milidetik |
| `keepPreviousData` | `boolean` | `true` | Menahan data lama saat memuat |
| `enabled` | `boolean` | `true` | Menunda permintaan bila `false` |
| `retry` | `number \| boolean` | `0` | Jumlah pengulangan saat gagal |
| `retryDelay` | `number` | `500` | Jeda antar pengulangan, milidetik |
| `params` | objek | — | Parameter tetap |
| `extraParams` | objek | — | Parameter tambahan |
| `defaultFilters` | objek | — | Nilai awal penyaring |
| `urlSync` | `boolean \| objek` | — | Menyimpan keadaan tabel ke query string |

## Kolom

| Prop kolom | Tipe | Keterangan |
| --- | --- | --- |
| `key` | `string` | Nama field pada baris. Wajib |
| `header` | `ReactNode` | Judul kolom |
| `sortable` | `boolean` | Menyalakan pengurutan |
| `sortKey` | `string` | Field pengurutan bila berbeda dari `key` |
| `align` | `left \| center \| right` | Perataan isi |
| `width` | `string \| number` | Lebar kolom |
| `render` | `(value, row, index) => ReactNode` | Mengganti tampilan sel |
| `hideBelow` | `HideBelow` | Menyembunyikan di bawah lebar tertentu |
| `className` | `string` | Kelas untuk sel |

## Props — ApiTable

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `t` | hasil `useApiTable` | Keadaan tabel. Wajib |
| `columns` | `ApiTableColumn<T>[]` | Definisi kolom. Wajib |
| `emptyText` | `ReactNode` | Tampilan saat data kosong |
| `rowKey` | `(row, index) => Key` | Kunci unik tiap baris |
| `onRowClick` | `(row, index) => void` | Dipanggil saat baris diklik |

## Catatan

Hook ini juga mengekspor `useTableQuery` untuk kebutuhan yang lebih
rendah tingkatnya.

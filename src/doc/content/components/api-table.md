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

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `t` | hasil `useApiTable` | — | Keadaan tabel. Wajib |
| `columns` | `ApiTableColumn<T>[]` | — | Definisi kolom. Wajib |
| `emptyText` | `ReactNode` | `'No data found.'` | Tampilan saat data kosong |
| `rowKey` | `(row, index) => Key` | — | Kunci unik tiap baris |
| `onRowClick` | `(row, index) => void` | — | Dipanggil saat baris diklik, sekaligus nyalain cursor pointer di baris |
| `renderEmptyData` | `ReactNode` | — | Ganti tampilan bawaan saat data kosong |
| `loadingRowCount` | `number` | `min(pageSize, 8)` | Jumlah baris skeleton saat memuat |
| `rowOptions` | `(row, key, index) => { className? }` | — | Kelas tambahan per baris (mis. highlight baris tertentu) |
| `showPagination` | `boolean` | `false` | Menampilkan bar paginasi di bawah tabel |
| `responsive` | `boolean` | `false` | Di bawah breakpoint `md`, tiap baris jadi kartu tersendiri (bukan tabel horizontal) — lihat Mode Responsif |
| `bordered` | `boolean` | `true` | Garis pembatas antar kolom/baris + border card di luar |
| `striped` | `boolean` | `false` | Warna selang-seling baris genap |
| `hoverable` | `boolean` | `false` | Highlight baris saat hover |

## Mode Responsif

Kalau `responsive` dinyalakan, di bawah `md` tiap baris berubah jadi
kartu terpisah (bukan lagi baris tabel horizontal) — border pembungkus
di luar cuma nyala mulai `md` ke atas, karena di bawahnya tiap kartu baris
udah punya border sendiri. Kalau kolom butuh tata letak khusus buat mode
kartu ini (mis. `className: 'col-span-2'` atau `max-md:flex ...`), itu
cuma masuk akal kalau `responsive` beneran dinyalakan di tabelnya — kalau
enggak, border antar sel bisa jadi gak sejajar.

`ApiTable` sendiri yang nyediain scroll horizontal di dalam kalau
kolomnya kebanyakan buat muat di satu layar — gak perlu bungkus
`overflow-auto` manual dari luar, dan ini berlaku baik `responsive`
dinyalakan atau enggak (di atas breakpoint `md`, mode kartu balik jadi
tabel biasa dan tetap butuh scroll ini kalau kolomnya lebar). Baris
paginasi ditaruh di luar area yang di-scroll itu, jadi tetap kelihatan
utuh (gak ikut ke-drag pas tabelnya di-scroll ke samping).

## Catatan

Hook ini juga mengekspor `useTableQuery` untuk kebutuhan yang lebih
rendah tingkatnya.

Tipe `ApiTableProps` juga punya `showFooter` dan `rowOptionsLabel`,
tapi keduanya belum benar-benar dipakai di implementasi `ApiTable`
saat ini — sengaja gak didokumentasikan di sini sampai itu beres.

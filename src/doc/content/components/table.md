---
title: Table
description: Menampilkan data dalam baris dan kolom.
group: Data Display
playground: /playground/table
---

Tabel statis yang kamu susun sendiri. Untuk data dari server lengkap
dengan paginasi dan pencarian, gunakan [ApiTable](/docs/api-table).

## Impor

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCellHead,
  TableCell,
  TablePagination,
} from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Table variant="row-bordered" className="w-full table-auto">
  <TableHead>
    <TableRow isHeader>
      <TableCellHead value="Nama" />
      <TableCellHead value="Status" />
    </TableRow>
  </TableHead>

  <TableBody>
    {data.map((item, index) => (
      <TableRow key={item.id} isLast={index === data.length - 1}>
        <TableCell value={item.nama} />
        <TableCell>
          <Badge color="success">{item.status}</Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

Sel menerima **`value`** untuk teks biasa, atau **`children`** untuk
elemen. Keduanya tidak boleh dipakai bersamaan.

## Varian

| Nilai | Tampilan |
| --- | --- |
| `basic` | Tanpa garis |
| `bordered` | Garis di seluruh sisi sel |
| `row-bordered` | Garis antar baris saja |
| `wrapped-row-bordered` | Garis antar baris dengan bingkai luar |
| `stripped` | Latar belang-seling |
| `hovered` | Menyorot baris saat disentuh |
| `headed` | Latar abu pada baris kepala |

## Paginasi

```tsx
<TablePagination
  currentPage={halaman}
  totalPage={10}
  selectedPerpage={perHalaman}
  perPages={[10, 25, 50]}
  onChangePerpage={(n) => { setPerHalaman(n); setHalaman(1); }}
  numberOnClick={setHalaman}
  prevOnClick={() => setHalaman((p) => Math.max(p - 1, 1))}
  nextOnClick={() => setHalaman((p) => Math.min(p + 1, 10))}
/>
```

Dua prop mengatur bagian mana yang tampil, dan namanya mudah tertukar:

| Prop | Mengatur |
| --- | --- |
| `showController` | Pemilih jumlah baris di kiri |
| `showNumber` | Nomor halaman beserta tombol maju/mundur di kanan |

## Props — TableCell & TableCellHead

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `value` | `string \| number` | Isi sel; tidak boleh bersama `children` |
| `children` | `ReactNode` | Isi sel; tidak boleh bersama `value` |
| `onClick` | `() => void` | Dipanggil saat sel diklik |
| `sortable` | `boolean` | Hanya pada `TableCellHead` |
| `variant` | `TextVariant` | Skala teks; hanya pada `TableCell` |

## Props — TableRow

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `isHeader` | `boolean` | Menandai baris kepala |
| `isLast` | `boolean` | Menandai baris terakhir |

## Catatan

Bungkus tabel dengan elemen ber-`overflow-x: auto` agar tabel lebar tidak
membuat seluruh halaman bergeser ke samping.

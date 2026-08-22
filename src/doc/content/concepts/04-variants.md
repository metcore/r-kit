---
title: Varian & Ukuran
description: Pola prop variant dan size yang berulang di seluruh komponen.
group: Konsep Inti
---

Selain `color`, dua prop lain muncul berulang: `variant` mengatur bobot
visual, `size` mengatur ukuran. Nilainya tidak seragam di semua komponen,
tetapi polanya sama.

## `variant` — seberapa menonjol

```tsx
<Button variant="default">Simpan</Button>
<Button variant="outline">Batal</Button>
<Button variant="tertiary">Lewati</Button>
```

Urutannya dari paling menonjol ke paling samar. Dalam satu layar,
sebaiknya hanya ada satu tombol `default`; sisanya `outline` atau
`tertiary`.

Nilai `variant` per komponen:

| Komponen | Nilai |
| --- | --- |
| `Button`, `ButtonIcon`, `ButtonGroup` | `default`, `outline`, `tertiary` |
| `Alert`, `Toast` | `solid`, `outline` |
| `Card` | `filled`, `outline` |
| `Badge` | `default`, `dot` |
| `Avatar` | `circle`, `square`, `rounded` |
| `FileView` | `large`, `small` |
| `List`, `Accordion` | `default`, `striped` |

Perhatikan bahwa `variant` pada `Avatar` mengatur **bentuk**, bukan bobot
visual. Nama propnya sama, maknanya menyesuaikan komponen.

## `size` — seberapa besar

```tsx
<Button size="sm">Kecil</Button>
<Button size="md">Sedang</Button>
<Button size="lg">Besar</Button>
```

| Komponen | Nilai |
| --- | --- |
| `Button` | `xxs`, `xs`, `sm`, `md`, `lg` |
| `Badge`, `Chip`, `Card` | `sm`, `md`, `lg` |
| `Avatar` | `xs`, `sm`, `md`, `lg`, `xl`, `xxl` |
| `Modal` | `xs`, `sm`, `md`, `lg`, `full` |

Bawaannya `md` di hampir semua komponen.

## Menggabungkan ketiganya

`color`, `variant`, dan `size` bebas dikombinasikan:

```tsx
<Button color="danger" variant="outline" size="sm">
  Hapus
</Button>
```

## Kalau nilainya tidak ada

Memberi nilai di luar daftar tidak melempar galat saat dijalankan — kelas
untuk nilai itu hanya tidak diterapkan, sehingga komponen tampil tanpa
gaya ukuran atau varian sama sekali. TypeScript akan menolaknya lebih
dulu, jadi jangan abaikan galat tipe di sini.

---
title: Text
description: Menampilkan teks dengan skala tipografi, bobot, dan warna yang seragam.
group: Foundation
playground: /playground/typography
---

`Text` adalah satu-satunya cara menulis teks yang ukurannya mengikuti
skala tipografi kit. Memakai `<p>` biasa tetap bisa, tetapi ukurannya
tidak akan seragam dengan komponen lain.

## Impor

```tsx
import { Text } from '@herca/r-kit';
```

## Penggunaan Dasar

Isi teks bisa lewat `children` atau lewat prop `value`. Keduanya tidak
boleh dipakai bersamaan — TypeScript akan menolaknya.

```tsx
<Text>Halo dunia</Text>
<Text value="Halo dunia" />
```

Prop `value` berguna saat teksnya berasal dari variabel, karena lebih
ringkas dibaca dalam JSX yang padat.

## Skala Tipografi

```tsx
<Text variant="h1">Judul Besar</Text>
<Text variant="p1">Paragraf</Text>
<Text variant="t2">Teks kecil</Text>
```

Sebelas tingkat tersedia, terbagi tiga keluarga:

| Keluarga | Nilai | Dipakai untuk |
| --- | --- | --- |
| Heading | `h1`, `h2`, `h3`, `h4` | Judul halaman dan bagian |
| Paragraf | `p1`, `p2`, `p3` | Isi tulisan |
| Teks kecil | `t1`, `t2`, `t3`, `t4` | Label, keterangan, catatan kaki |

## Elemen HTML yang Dirender

`variant` hanya mengatur tampilan, bukan elemen HTML. Gunakan `as` untuk
menentukan elemennya agar struktur dokumen tetap benar:

```tsx
<Text as="h1" variant="h2">
  Judul yang tampil seukuran h2
</Text>
```

Ini penting untuk aksesibilitas dan SEO: pembaca layar mengikuti elemen,
bukan ukuran visual.

## Bobot & Perataan

```tsx
<Text weight="bold">Tebal</Text>
<Text align="center">Rata tengah</Text>
```

## Memotong Teks Panjang

`numberOfLines` memotong teks setelah sekian baris dan menambahkan
elipsis:

```tsx
<Text numberOfLines={2}>{deskripsiPanjang}</Text>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Isi teks. Tidak boleh bersama `value` |
| `value` | `string \| number \| null` | — | Isi teks. Tidak boleh bersama `children` |
| `as` | `React.ElementType` | `p` | Elemen HTML yang dirender |
| `variant` | `h1`–`h4`, `p1`–`p3`, `t1`–`t4` | `p3` | Tingkat skala tipografi |
| `weight` | `regular \| medium \| semibold \| bold` | `regular` | Ketebalan huruf |
| `color` | `BaseColor` | — | Warna teks dari token |
| `align` | `start \| center \| end \| justify` | — | Perataan teks |
| `numberOfLines` | `1 \| 2 \| 3 \| 4` | — | Memotong teks setelah sekian baris |
| `className` | `string` | — | Kelas tambahan |

## Catatan

`children` dan `value` saling meniadakan pada tingkat tipe. Memberi
keduanya menghasilkan galat TypeScript, bukan galat saat dijalankan.

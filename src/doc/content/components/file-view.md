---
title: FileView
description: Menampilkan berkas beserta nama, jenis, dan ukurannya.
group: Data Display
playground: /playground/file-view
---

Kartu berkas yang jenis dan ikonnya ditebak dari ekstensi `src`.

## Impor

```tsx
import { FileView } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<FileView src="laporan-tahunan.pdf" size={2411724} />
```

`size` dalam **byte**, dan ditampilkan sebagai KB atau MB secara otomatis.

## Jenis Berkas

Ikon menyesuaikan ekstensi: PDF, gambar, spreadsheet, CSV, audio, video,
dan dokumen. Berkas gambar menampilkan pratinjaunya langsung.

```tsx
<FileView src="rekap-absensi.xlsx" size={845000} />
<FileView src="foto-produk.jpg" size={1258291} />
```

## Varian Kecil

```tsx
<FileView variant="small" src="laporan.pdf" size={2411724} />
```

Cocok untuk daftar berkas yang padat.

## Nama Tampilan Kustom

```tsx
<FileView
  name="Kontrak Kerja Sama 2026"
  src="a8f3c1e9-kontrak-final-v3.pdf"
  size={512000}
/>
```

## Tanpa Tombol Unduh

```tsx
<FileView hideDownloadButton src="slip-gaji.pdf" size={128000} />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `src` | `string \| File` | — | Alamat berkas atau objek `File` |
| `name` | `string` | — | Nama tampilan, menimpa nama dari `src` |
| `size` | `number` | — | Ukuran dalam byte |
| `kind` | `FileKind` | — | Memaksa jenis berkas |
| `variant` | `large \| small` | `large` | Kerapatan kartu |
| `color` | warna aksen | — | Warna latar dan garis kartu |
| `hideDownloadButton` | `boolean` | `false` | Menyembunyikan tombol unduh |
| `onDownload` | `() => void` | — | Dipanggil saat tombol unduh ditekan |
| `onExpand` | `(name: string) => void` | — | Dipanggil saat pratinjau dibuka |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Akar kartu memakai sudut membulat tanpa `overflow-hidden`, sehingga
isian warnanya menonjol keluar lengkung di keempat sudut. Prop
`className` diteruskan ke akar, jadi perbaikannya cukup:

```tsx
<FileView className="overflow-hidden" color="primary" src="kontrak.pdf" />
```

Utilitas `formatFileSize` ikut diekspor bila kamu perlu memformat ukuran
berkas di tempat lain.

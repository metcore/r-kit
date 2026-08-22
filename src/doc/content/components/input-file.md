---
title: InputFile
description: Mengunggah berkas dengan pratinjau, batas ukuran, dan progres unggahan.
group: Form
playground: /playground/input-file
---

Komponen paling luas di kelompok Form. Menangani pemilihan berkas,
pratinjau, batas ukuran, penamaan ulang, sampai unggahan ke server.

## Impor

```tsx
import { InputFile } from '@herca/r-kit/clients';
import type { FileItem } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [berkas, setBerkas] = useState<FileItem[]>([]);

<InputFile value={berkas} onChange={setBerkas} />;
```

Nilainya selalu berupa **larik**, bahkan saat hanya satu berkas yang
boleh dipilih.

## Banyak Berkas & Batasnya

```tsx
<InputFile
  multiple
  accept="image/*,.pdf"
  maxSize={5 * 1024 * 1024}
  maxFiles={5}
  value={berkas}
  onChange={setBerkas}
/>
```

`maxSize` dalam **byte**. Pesan kesalahannya bisa diganti lewat
`maxSizeErrorMessage` dan `maxFilesErrorMessage`.

## Varian Tampilan

```tsx
<InputFile variant="medium" />
<InputFile variant="large" />
```

`large` memberi area seret-dan-lepas yang lebih lapang.

## Unggah Langsung ke Server

Dengan `uploadConfig`, berkas dikirim begitu dipilih, lengkap dengan
indikator progres per berkas:

```tsx
<InputFile
  uploadConfig={{ url: '/api/upload', fieldName: 'file' }}
  onUploadSuccess={(hasil) => simpan(hasil)}
/>
```

## Nama Tampilan Kustom

```tsx
<InputFile useCustomName customNamePlaceholder="Beri nama berkas" />
```

Menambahkan kolom teks pada tiap berkas, sehingga user bisa memberi nama
yang lebih mudah dibaca daripada nama berkas aslinya.

## Memisahkan Area Unggah dan Daftar Berkas

Hook `useInputFile` memisahkan kendali dari tampilan, sehingga area unggah
dan daftar pratinjau bisa diletakkan berjauhan:

```tsx
import { useInputFile, InputFilePreview } from '@herca/r-kit/clients';

const berkas = useInputFile({
  accept: 'image/*,.pdf',
  maxSize: 5 * 1024 * 1024,
});

<InputFile inputFile={berkas} label="Unggah dokumen" multiple />
<InputFilePreview inputFile={berkas} mode="compact" />;
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `FileItem[]` | — | Mode terkendali |
| `onChange` | `(files: FileItem[]) => void` | — | Dipanggil saat daftar berubah |
| `multiple` | `boolean` | `false` | Mengizinkan banyak berkas |
| `accept` | `string` | — | Jenis berkas yang diterima |
| `maxSize` | `number` | — | Ukuran maksimum per berkas, dalam byte |
| `maxFiles` | `number` | — | Jumlah berkas maksimum |
| `variant` | `primary \| secondary \| gray \| medium \| large` | — | Gaya area unggah |
| `label` | `string` | — | Teks di atas area unggah |
| `hint` | `string` | — | Keterangan di bawah area unggah |
| `errorMessage` | `string` | — | Pesan kesalahan |
| `maxSizeErrorMessage` | `string` | — | Pesan saat ukuran melebihi batas |
| `maxFilesErrorMessage` | `string` | — | Pesan saat jumlah melebihi batas |
| `buttonLabel` | `string \| ReactNode` | — | Teks tombol pilih berkas |
| `buttonVariant` | varian Button | — | Gaya tombol pilih berkas |
| `buttonColor` | `BaseColor` | — | Warna tombol pilih berkas |
| `useCustomName` | `boolean` | `false` | Menambahkan kolom nama tampilan |
| `customNamePlaceholder` | `string` | — | Placeholder kolom nama |
| `uploadConfig` | `UploadConfig` | — | Mengunggah otomatis ke server |
| `onUploadSuccess` | `(results) => void` | — | Dipanggil saat unggahan berhasil |
| `onRemoveFile` | `(id: string) => void` | — | Dipanggil saat satu berkas dihapus |
| `onClear` | `() => void` | — | Dipanggil saat seluruh berkas dihapus |
| `onDownload` | `({ src, name }) => void` | — | Dipanggil saat tombol unduh ditekan |
| `previewMode` | `detailed \| compact` | — | Kerapatan daftar pratinjau |
| `hideDownloadButton` | `boolean` | `false` | Menyembunyikan tombol unduh |
| `disabled` | `boolean` | `false` | Menonaktifkan |

## Catatan

Setiap `FileItem` sebaiknya punya `id` yang unik. Berkas yang dibuat
sendiri tanpa `id` membuat React kehilangan kunci daftar, dan seluruh
keadaan per berkas — progres unggahan serta nama kustom — menumpuk pada
satu kunci yang sama.

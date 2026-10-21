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

Dengan `mode="uploadFile"`, berkas dikirim begitu dipilih, lengkap dengan
indikator progres per berkas. Nilainya bukan lagi `File`, melainkan
`{ id, url, original_name }` hasil unggahan:

```tsx
const [berkas, setBerkas] = useState<UploadedFileValue[]>([]);

<InputFile
  mode="uploadFile"
  multiple
  value={berkas}
  onChange={setBerkas}
  uploadConfig={{ url: '/api/upload', fieldName: 'file' }}
/>;
```

`uploadConfig` hanya berlaku di mode ini — tanpa `mode="uploadFile"`
berkas tidak pernah dikirim. Saat `multiple`, tiap berkas diunggah
sendiri-sendiri dan semuanya masuk ke `onChange` begitu selesai, tidak
peduli urutan selesainya.

### Ukuran Berkas yang Sudah Ada

Ukuran hanya terbaca sendiri dari berkas yang baru dipilih user. Untuk
berkas yang sudah tersimpan di server, komponen tidak pernah mengukurnya
sendiri — tidak ada permintaan `HEAD`/`Content-Length` — jadi tanpa
`size` barisnya memang tidak ditampilkan. Isi `size` dalam byte kalau
ukurannya perlu terlihat:

```tsx
<InputFile
  mode="uploadFile"
  multiple
  value={[
    {
      id: 12,
      url: 'https://cdn.contoh.id/kontrak.pdf',
      original_name: 'kontrak.pdf',
      size: 182,
    },
  ]}
  onChange={setBerkas}
  uploadConfig={{ url: '/api/upload' }}
/>
```

`size` dibaca saat entry disemai dari `value`. Kalau ukurannya baru
diketahui belakangan sementara `id`, `url`, dan namanya tidak berubah,
nilainya tidak ikut diperbarui — sertakan sejak awal.

### Value yang Datang Belakangan

Form edit yang dirender sebelum data detail selesai di-fetch — nilainya
masuk menyusul lewat `reset()` — tetap mempertahankan `id` tiap lampiran
lama. Komponen tidak lagi mengirim `onChange([])` lebih dulu saat
nilainya berganti dari luar, jadi `id` tidak pernah berubah menjadi
`null` dan backend tidak salah menyimpan lampiran lama sebagai berkas
baru. Perubahan yang datang dari `onChange` komponen sendiri tidak
terpengaruh, sehingga unggahan yang masih berjalan tetap aman.

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
| `mode` | `file \| uploadFile` | `file` | `uploadFile` mengunggah tiap berkas lewat `uploadConfig` |
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

Entry `value` di mode `uploadFile` wajib punya `url` bertipe string;
selain `url`, semua kolom opsional — `original_name` -> `name` ->
`file_name` dipakai berurutan sebagai nama tampilan, dan `size` dalam
byte untuk menampilkan ukuran. Ukurannya diformat mengikuti besarannya,
jadi 182 byte tampil sebagai `182 B`, bukan `0.00 MB`.

Setiap `FileItem` sebaiknya punya `id` yang unik. Berkas yang dibuat
sendiri tanpa `id` membuat React kehilangan kunci daftar, dan seluruh
keadaan per berkas — progres unggahan serta nama kustom — menumpuk pada
satu kunci yang sama.

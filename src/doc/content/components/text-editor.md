---
title: TextEditor
description: Penyunting teks kaya dengan format, tabel, dan penyisipan media.
group: Form
playground: /playground/text-editor
---

Penyunting berbasis Tiptap. Komponen terberat di kit ini, jadi pakai
hanya bila memang butuh format kaya; untuk teks polos gunakan
[Textarea](/docs/textarea).

## Impor

```tsx
import { TextEditor } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<TextEditor label="Isi pengumuman" placeholder="Tulis di sini…" />
```

## Mengambil Isinya

`onChange` memberi objek `Editor` milik Tiptap, bukan string. Ambil
isinya lewat metode editor:

```tsx
import { Editor } from '@tiptap/core';

<TextEditor
  onChange={(editor: Editor) => {
    setIsi(editor.getHTML());
  }}
/>;
```

Tersedia juga `editor.getJSON()` bila kamu ingin menyimpan dalam bentuk
terstruktur.

## Nilai Awal

```tsx
<TextEditor value="<p>Teks awal</p>" />
```

## Tinggi

```tsx
<TextEditor height={400} />
<TextEditor height="fit-content" />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `string` | — | Isi awal dalam bentuk HTML |
| `onChange` | `(editor: Editor) => void` | — | Dipanggil saat isi berubah |
| `plugins` | `Plugins` | — | Mengatur fitur yang aktif di bilah alat |
| `height` | `number \| 'fit-content'` | — | Tinggi area sunting |
| `size` | `sm \| md \| lg` | `md` | Ukuran bilah alat |
| `label` | `string` | — | Teks di atas penyunting |
| `hint` | `string` | — | Keterangan di bawah penyunting |
| `description` | `string` | — | Keterangan di bawah label |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `placeholder` | `string` | — | Teks saat kosong |
| `required` | `boolean` | `false` | Menandai wajib diisi |
| `disabled` | `boolean` | `false` | Menonaktifkan |

## Catatan

Prop `ui` **sudah usang**. Gunakan `size` dan `disabled` di tingkat atas.

Karena `onChange` memberi objek `Editor` yang identitasnya tetap sama di
setiap perubahan, jangan menaruhnya langsung sebagai dependensi
`useEffect` — ambil nilainya lebih dulu.

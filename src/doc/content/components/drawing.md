---
title: Drawing
description: Kanvas gambar bebas untuk tanda tangan atau coretan.
group: Form
playground: /playground/drawing
---

Kanvas yang menerima masukan tetikus maupun sentuhan, dengan riwayat
undo dan redo.

## Impor

```tsx
import { Drawing } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Drawing label="Tanda tangan" height={200} />
```

## Mengambil Hasilnya

`onChange` memberi gambar sebagai data URL setiap kali coretan berubah:

```tsx
const [gambar, setGambar] = useState('');

<Drawing onChange={setGambar} />;
```

## Mengendalikan Lewat Ref

`DrawingRef` membuka kendali penuh atas kanvas:

```tsx
const kanvas = useRef<DrawingRef>(null);

<Drawing ref={kanvas} />

<Button onClick={() => kanvas.current?.clear()}>Bersihkan</Button>
<Button onClick={() => kanvas.current?.undo()}>Urungkan</Button>
```

Metode yang tersedia: `clear`, `undo`, `redo`, `canUndo`, `canRedo`,
`isEmpty`, `toDataURL`, dan `toBlob`.

## Gaya Coretan

```tsx
<Drawing strokeColor="#1d4ed8" strokeWidth={3} backgroundColor="#f9fafb" />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `initialValue` | `string` | — | Gambar awal berupa data URL |
| `onChange` | `(dataUrl: string) => void` | — | Dipanggil saat coretan berubah |
| `strokeColor` | `string` | — | Warna coretan |
| `strokeWidth` | `number` | — | Ketebalan coretan |
| `backgroundColor` | `string` | — | Warna latar kanvas |
| `width` | `number \| string` | — | Lebar kanvas |
| `height` | `number \| string` | — | Tinggi kanvas |
| `showActions` | `boolean` | — | Menampilkan tombol bersihkan dan undo |
| `placeholder` | `string` | — | Teks saat kanvas kosong |
| `label` | `string` | — | Teks di atas kanvas |
| `hint` | `string` | — | Keterangan di bawah kanvas |
| `description` | `string` | — | Keterangan di bawah label |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `required` | `boolean` | `false` | Menandai wajib diisi |
| `readOnly` | `boolean` | `false` | Hanya bisa dilihat |
| `disabled` | `boolean` | `false` | Menonaktifkan |
| `size` | `FormSizeType` | — | Ukuran kanvas |

## Catatan

`toBlob` menerima callback, bukan mengembalikan Promise:

```tsx
kanvas.current?.toBlob((blob) => {
  if (blob) unggah(blob);
});
```

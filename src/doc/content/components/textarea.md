---
title: Textarea
description: Isian teks banyak baris untuk catatan, deskripsi, atau alasan.
group: Form
playground: /playground/text-area
---

Isian untuk teks panjang. Tingginya menyesuaikan isi, dan bisa dilengkapi
tombol hapus isi.

## Impor

```tsx
import { Textarea } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Textarea label="Alasan" placeholder="Tulis alasan pengajuan…" />
```

## Batas Karakter

```tsx
<Textarea
  label="Alasan"
  maxLength={200}
  hint="Maksimal 200 karakter."
/>
```

## Tombol Hapus Isi

```tsx
const [nilai, setNilai] = useState('');

<Textarea
  clearAble
  value={nilai}
  onChange={(e) => setNilai(e.target.value)}
  onClear={() => setNilai('')}
  clearLabel="Kosongkan"
/>;
```

`onClear` harus kamu tangani sendiri — komponen tidak mengosongkan nilai
secara otomatis, karena nilainya kamu yang pegang.

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `label` | `string` | — | Teks di atas isian |
| `hint` | `string` | — | Keterangan di bawah isian |
| `description` | `string` | — | Keterangan tambahan di bawah label |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `tooltip` | `string` | — | Keterangan yang muncul saat disentuh |
| `clearAble` | `boolean` | `false` | Menampilkan tombol hapus isi |
| `onClear` | `() => void` | — | Dipanggil saat tombol hapus ditekan |
| `clearLabel` | `string` | — | Teks tombol hapus |

Seluruh prop `<textarea>` lain diteruskan apa adanya.

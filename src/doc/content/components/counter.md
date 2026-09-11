---
title: Counter
description: Isian angka dengan tombol tambah dan kurang.
group: Form
playground: /playground/counter
---

Isian untuk angka bulat kecil — jumlah barang, banyak hari, dan
sejenisnya.

## Impor

```tsx
import { Counter } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [jumlah, setJumlah] = useState('1');

<Counter value={jumlah} onChange={setJumlah} />;
```

Nilainya bertipe **`string`**, bukan `number`. Ini disengaja agar keadaan
kosong saat user menghapus isian bisa diwakili tanpa berubah menjadi `0`.

## Tak Terkendali

```tsx
<Counter defaultValue="1" />
```

## Mengizinkan Angka Negatif

Bawaannya nilai tidak bisa turun di bawah nol. `allowMinus` membukanya:

```tsx
<Counter allowMinus defaultValue="0" />
```

## Ukuran & Varian

```tsx
<Counter size="sm" />
<Counter variant="secondary" />
```

## Ikon Kustom

```tsx
<Counter
  iconLeft={<Icon name="minus" size={14} />}
  iconRight={<Icon name="plus" size={14} />}
/>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `string` | — | Mode terkendali |
| `defaultValue` | `string` | `"0"` | Nilai awal mode tak terkendali |
| `onChange` | `(value: string) => void` | — | Dipanggil saat nilai berubah |
| `allowMinus` | `boolean` | `false` | Mengizinkan nilai negatif |
| `size` | `sm \| md \| lg` | `md` | Ukuran |
| `variant` | `primary \| secondary` | `primary` | Gaya tombol |
| `inputWidth` | `string` | — | Lebar kolom angka |
| `iconLeft` | `ReactNode` | — | Ikon tombol kurang |
| `iconRight` | `ReactNode` | — | Ikon tombol tambah |
| `disabled` | `boolean` | `false` | Menonaktifkan |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Karena nilainya `string`, ubah dulu sebelum dipakai berhitung:

```tsx
const angka = Number(jumlah) || 0;
```

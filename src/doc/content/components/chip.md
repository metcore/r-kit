---
title: Chip
description: Label ringkas yang dapat dipilih untuk menyaring atau menandai.
group: Components
playground: /playground/chip
---

## Impor

```tsx
import { Chip, ChipGroup } from '@herca/r-kit/clients';
import type { ChipOptionProps, ChipValue } from '@herca/r-kit/clients';
```

## Chip Tunggal

```tsx
const [terpilih, setTerpilih] = useState(false);

<Chip value="react" selected={terpilih} onClick={() => setTerpilih((s) => !s)}>
  React
</Chip>;
```

## Kelompok

`ChipGroup` menerima daftar opsi sebagai data, bukan sebagai anak:

```tsx
const OPSI: ChipOptionProps[] = [
  { value: 'draft', label: 'Draf' },
  { value: 'review', label: 'Ditinjau' },
];

const [terpilih, setTerpilih] = useState<ChipValue[]>([]);

<ChipGroup options={OPSI} selected={terpilih} onSelect={setTerpilih} />;
```

## Pilih Banyak

```tsx
<ChipGroup multiple options={OPSI} selected={terpilih} onSelect={setTerpilih} />
```

Tanpa `multiple`, memilih chip lain menggantikan pilihan sebelumnya.

## Bisa Dihapus

```tsx
<ChipGroup
  dismissible
  options={opsi}
  onDismiss={(value) => setOpsi((p) => p.filter((o) => o.value !== value))}
/>
```

Penghapusan tidak terjadi otomatis — kamu yang mengubah daftarnya.

## Opsi Berikon

```tsx
const OPSI: ChipOptionProps[] = [
  { value: 'draft', label: 'Draf', icon: <Icon name="document" size={14} /> },
];
```

## Props — Chip

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Isi chip. Wajib |
| `value` | `string \| number` | — | Nilai chip |
| `selected` | `boolean` | `false` | Keadaan terpilih |
| `onClick` | `(value?) => void` | — | Dipanggil saat diklik |
| `dismissible` | `boolean` | `false` | Menampilkan tombol silang |
| `onDismiss` | `(value?) => void` | — | Dipanggil saat silang ditekan |
| `hexColor` | `string` | — | Warna bebas |
| `disabled` | `boolean` | `false` | Menonaktifkan |

## Props — ChipGroup

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `options` | `ChipOptionProps[]` | — | Daftar opsi |
| `selected` | `ChipValue \| ChipValue[]` | — | Pilihan saat ini |
| `onSelect` | `(selected: ChipValue[]) => void` | — | Dipanggil saat pilihan berubah |
| `multiple` | `boolean` | `false` | Mengizinkan banyak pilihan |
| `direction` | `horizontal \| vertical` | `horizontal` | Arah susunan |
| `size` | `sm \| md \| lg` | `md` | Ukuran chip |
| `color` | `BaseColor` | — | Warna saat terpilih |
| `dismissible` | `boolean` | `false` | Menampilkan tombol silang di tiap chip |
| `onDismiss` | `(value: ChipValue) => void` | — | Dipanggil saat satu chip dihapus |
| `reorderable` | `boolean` | `false` | Mengizinkan urutan diubah |
| `onReorder` | `(options) => void` | — | Dipanggil saat urutan berubah |
| `scrollable` | `boolean` | `false` | Membuat daftar bisa digulir |
| `header`, `footer` | `ReactNode` | — | Konten di atas dan bawah daftar |

## Catatan

`onSelect` selalu memberi **larik**, bahkan pada mode pilih satu.

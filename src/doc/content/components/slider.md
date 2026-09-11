---
title: Slider
description: Memilih satu nilai atau rentang nilai dengan menggeser.
group: Form
playground: /playground/slider
---

## Impor

```tsx
import { Slider } from '@herca/r-kit/clients';
```

## Nilai Tunggal

```tsx
const [nilai, setNilai] = useState(40);

<Slider value={nilai} onChange={setNilai} min={0} max={100} />;
```

## Rentang Nilai

Dengan `range`, nilainya menjadi pasangan angka:

```tsx
const [rentang, setRentang] = useState<[number, number]>([20, 80]);

<Slider range value={rentang} onChange={setRentang} />;
```

Tipe `onChange` ikut berubah mengikuti `range`, jadi TypeScript akan
menolak bila bentuk state-nya tidak cocok.

## Langkah

```tsx
<Slider min={0} max={1000} step={50} />
```

## Penanda

```tsx
<Slider
  min={0}
  max={100}
  marks={[
    { value: 0, label: 'Rendah' },
    { value: 50, label: 'Sedang' },
    { value: 100, label: 'Tinggi' },
  ]}
/>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `range` | `boolean` | `false` | Mengubah menjadi mode rentang |
| `value` | `number` atau `[number, number]` | — | Mode terkendali |
| `defaultValue` | `number` atau `[number, number]` | — | Nilai awal |
| `onChange` | `(value) => void` | — | Dipanggil saat nilai berubah |
| `min` | `number` | — | Nilai terkecil |
| `max` | `number` | — | Nilai terbesar |
| `step` | `number` | — | Kelipatan perubahan |
| `marks` | `SliderMark[]` | — | Penanda pada lintasan |
| `label` | `string` | — | Teks di atas slider |
| `hint` | `string` | — | Keterangan di bawah slider |
| `description` | `string` | — | Keterangan di bawah label |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `required` | `boolean` | `false` | Menandai wajib diisi |
| `disabled` | `boolean` | `false` | Menonaktifkan |
| `colors` | `SliderColorTokens` | — | Menimpa warna bagian slider |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Terdapat prop bernama `tooltiop` — salah eja dari `tooltip`. Keduanya ada
di tipe; gunakan `tooltip` yang ejaannya benar.

---
title: Radio
description: Memilih tepat satu opsi dari beberapa pilihan.
group: Form
playground: /playground/radio-button
---

Dipakai saat user harus memilih **satu** dari beberapa pilihan yang
saling meniadakan. Bila boleh memilih lebih dari satu, gunakan
[Checkbox](/docs/checkbox).

## Impor

```tsx
import { Radio, RadioGroup } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
import type { RadioButtonValue } from '@herca/r-kit/clients';

const [metode, setMetode] = useState<RadioButtonValue>('transfer');

<RadioGroup value={metode} onValueChange={setMetode}>
  <Radio value="transfer" />
  <Radio value="tunai" />
</RadioGroup>;
```

## Mengetik Nilainya

`RadioButtonValue` bertipe `string | number | boolean`. Mengetik state
sebagai `string` saja akan ditolak TypeScript saat dipasangkan ke
`onValueChange`:

```tsx
const [nilai, setNilai] = useState<RadioButtonValue>('a'); // ✅
const [nilai, setNilai] = useState('a');                   // ❌ terlalu sempit
```

## Ukuran & Warna

```tsx
<RadioGroup size="lg" color="success">…</RadioGroup>
```

Keduanya diturunkan ke seluruh anak, jadi cukup ditulis sekali di
kelompoknya.

## Props — Radio

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `string \| number` | — | Nilai opsi |
| `checked` | `boolean` | — | Mode terkendali |
| `onCheckedChange` | `(checked: boolean) => void` | — | Dipanggil saat berubah |
| `size` | `sm \| md \| lg` | `md` | Ukuran lingkaran |
| `color` | `BaseColor` | `primary` | Warna saat terpilih |
| `disabled` | `boolean` | `false` | Menonaktifkan |
| `name`, `id` | `string` | — | Atribut form |

## Props — RadioGroup

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `RadioButtonValue` | — | Mode terkendali |
| `defaultValue` | `string` | — | Nilai awal |
| `onValueChange` | `(value: RadioButtonValue) => void` | — | Dipanggil saat berubah |
| `size`, `color` | — | — | Diturunkan ke semua anak |
| `disabled` | `boolean` | `false` | Menonaktifkan seluruh kelompok |
| `name` | `string` | — | Nama field dalam form |

## Catatan

Berbeda dari `Checkbox` yang sudah pindah ke `onChange`, `Radio` masih
memakai `onCheckedChange` dan `RadioGroup` memakai `onValueChange`.
Penamaan callback di kit ini memang belum seragam.

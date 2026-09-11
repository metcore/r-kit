---
title: Checkbox
description: Memilih satu, beberapa, atau tidak sama sekali dari daftar pilihan.
group: Form
playground: /playground/checkbox
---

Bisa dipakai sendiri, atau dikelompokkan lewat `CheckboxGroup` agar
nilainya terkumpul dalam satu larik.

## Impor

```tsx
import { Checkbox, CheckboxGroup } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [dicentang, setDicentang] = useState(false);

<Checkbox
  label="Saya menyetujui syarat"
  onChange={setDicentang}
/>;
```

Perhatikan bahwa `onChange` menerima **nilai boolean langsung**, bukan
event DOM. Ini berbeda dari `Input`.

## Kelompok

```tsx
const [terpilih, setTerpilih] = useState<CheckboxValue[]>([]);

<CheckboxGroup value={terpilih} onChange={setTerpilih}>
  <Checkbox value="react" label="React" />
  <Checkbox value="vue" label="Vue" />
  <Checkbox value="svelte" label="Svelte" />
</CheckboxGroup>;
```

Setiap anak wajib punya `value` yang unik — itulah yang masuk ke larik.

## Arah Susunan

```tsx
<CheckboxGroup direction="horizontal">…</CheckboxGroup>
```

Bawaannya `vertical`.

## Keadaan Setengah Tercentang

`icon="minus"` menggantikan tanda centang dengan tanda minus, biasanya
untuk induk yang sebagian anaknya tercentang:

```tsx
<Checkbox icon="minus" label="Pilih sebagian" />
```

## Props — Checkbox

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `label` | `string` | — | Teks di samping kotak |
| `description` | `string` | — | Keterangan di bawah label |
| `hint` | `string` | — | Keterangan tambahan |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `value` | `string \| number` | — | Nilai dalam kelompok |
| `checked` | `boolean` | — | Mode terkendali |
| `defaultChecked` | `boolean` | — | Nilai awal mode tak terkendali |
| `onChange` | `(checked: boolean) => void` | — | Dipanggil saat berubah |
| `size` | `sm \| md \| lg` | `md` | Ukuran kotak |
| `color` | `BaseColor` | `primary` | Warna saat tercentang |
| `icon` | `check \| minus` | `check` | Tanda di dalam kotak |
| `disabled` | `boolean` | `false` | Menonaktifkan |
| `tooltip` | `string` | — | Keterangan saat disentuh |

## Props — CheckboxGroup

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `CheckboxValue[]` | — | Mode terkendali |
| `defaultValue` | `CheckboxValue[]` | — | Nilai awal |
| `onChange` | `(value: CheckboxValue[]) => void` | — | Dipanggil saat berubah |
| `direction` | `horizontal \| vertical` | `vertical` | Arah susunan |
| `size`, `color`, `icon` | — | — | Diturunkan ke semua anak |
| `disabled` | `boolean` | `false` | Menonaktifkan seluruh kelompok |

## Catatan

Dua prop berikut **sudah usang**: `onCheckedChange` pada `Checkbox` dan
`onValueChange` pada `CheckboxGroup`. Keduanya digantikan `onChange`.

```tsx
<Checkbox onCheckedChange={setNilai} />  // usang
<Checkbox onChange={setNilai} />         // gunakan ini
```

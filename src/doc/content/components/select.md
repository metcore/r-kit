---
title: Select
description: Memilih satu atau beberapa opsi dari daftar, termasuk daftar panjang dari API.
group: Form
playground: /playground/select
---

Komponen dengan permukaan prop paling luas di kit ini. Bagian di bawah
menyusunnya dari yang paling sering dipakai.

## Impor

```tsx
import { Select } from '@herca/r-kit/clients';
import type { SelectOption } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const OPSI: SelectOption[] = [
  { value: 'tahunan', label: 'Cuti tahunan' },
  { value: 'sakit', label: 'Cuti sakit' },
];

<Select label="Jenis cuti" options={OPSI} />;
```

## Pilih Banyak

```tsx
<Select multiple options={OPSI} value={terpilih} onChange={setTerpilih} />
```

## Pencarian & Hapus Pilihan

```tsx
<Select isSearchable isClearable options={OPSI} />
```

## Opsi Berkelompok

Selain larik opsi, `options` juga menerima larik kelompok:

```tsx
<Select
  options={[
    {
      label: 'Cuti',
      options: [
        { value: 'tahunan', label: 'Cuti tahunan' },
        { value: 'sakit', label: 'Cuti sakit' },
      ],
    },
    {
      label: 'Izin',
      options: [{ value: 'dinas', label: 'Perjalanan dinas' }],
    },
  ]}
/>
```

## Opsi dengan Keterangan & Ikon

```tsx
const OPSI: SelectOption[] = [
  {
    value: 'tahunan',
    label: 'Cuti tahunan',
    description: 'Memotong kuota 12 hari per tahun',
    icon: 'calendar',
  },
];
```

## Tampilan Opsi Kustom

```tsx
<Select
  options={OPSI}
  renderOption={(opsi, { selected }) => (
    <div className={selected ? 'font-semibold' : undefined}>
      {opsi.label}
    </div>
  )}
/>
```

## Daftar Panjang dari API

Untuk daftar yang dimuat bertahap, `onLoadMore` dipanggil saat gulir
mendekati ujung:

```tsx
<Select
  options={opsi}
  isLoadingMore={sedangMemuat}
  onLoadMore={muatBerikutnya}
  treshold={200}
/>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `options` | `SelectOption[] \| SelectGroup[]` | — | Daftar opsi atau kelompok |
| `value` | opsi, larik opsi, atau nilai mentah | — | Pilihan saat ini |
| `onChange` | `(value) => void` | — | Dipanggil saat pilihan berubah |
| `multiple` | `boolean` | `false` | Mengizinkan lebih dari satu pilihan |
| `isSearchable` | `boolean` | `false` | Menampilkan kolom pencarian |
| `isClearable` | `boolean` | `false` | Menampilkan tombol hapus pilihan |
| `placeholder` | `string` | — | Teks saat belum ada pilihan |
| `searchPlaceholder` | `string` | — | Teks pada kolom pencarian |
| `label` | `string` | — | Teks di atas isian |
| `hint` | `string` | — | Keterangan di bawah isian |
| `description` | `string` | — | Keterangan di bawah label |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `required` | `boolean` | `false` | Menandai wajib diisi |
| `disabled` | `boolean` | `false` | Menonaktifkan |
| `renderOption` | `(option, state) => ReactNode` | — | Mengganti tampilan tiap opsi |
| `renderValue` | `(option) => ReactNode` | — | Mengganti tampilan nilai terpilih |
| `onLoadMore` | `() => void` | — | Dipanggil saat gulir mendekati ujung |
| `isLoadingMore` | `boolean` | `false` | Menandai sedang memuat tambahan |
| `treshold` | `number` | — | Jarak piksel pemicu `onLoadMore` |
| `getOptionByValue` | `(value) => SelectOption` | — | Mencari opsi dari nilai mentah |

## Catatan

Lima prop berikut **sudah usang**:

| Usang | Gunakan |
| --- | --- |
| `isMulti` | `multiple` |
| `isDisabled` | `disabled` |
| `trigger` | — |
| `triggerClassName` | — |
| `searchQuery` | `searchValue` |

Nilai `value` boleh berupa objek opsi utuh maupun nilai mentahnya saja.
Bila memakai nilai mentah, sediakan `getOptionByValue` agar komponen tahu
label mana yang harus ditampilkan.

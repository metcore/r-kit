---
title: List
description: Menyusun item sejenis secara berurutan.
group: Data Display
playground: /playground/list
---

## Impor

```tsx
import { List, ListItem } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<List>
  <ListItem>Surat Keputusan Direksi 2026</ListItem>
  <ListItem>Panduan Onboarding Karyawan</ListItem>
</List>
```

## Belang-seling

```tsx
<List variant="striped">…</List>
```

## Baris yang Bisa Diklik

Dengan `onClick`, `ListItem` dirender sebagai `<button>` lengkap dengan
gaya hover dan fokus papan tik:

```tsx
<ListItem onClick={() => buka(dokumen)}>{dokumen.nama}</ListItem>
```

## Baris Disorot

```tsx
<ListItem active>Kebijakan Kerja Hibrida</ListItem>
```

## Konten Bebas

`ListItem` menerima elemen apa pun, bukan hanya teks:

```tsx
<ListItem>
  <div className="flex items-center justify-between">
    <Text variant="t2">Notifikasi email</Text>
    <Switch />
  </div>
</ListItem>
```

## Props — List

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `variant` | `default \| striped` | `default` | Gaya baris |
| `children` | `ReactNode` | — | Daftar `ListItem`. Wajib |

## Props — ListItem

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Isi baris. Wajib |
| `onClick` | `() => void` | — | Membuat baris bisa diklik |
| `active` | `boolean` | `false` | Menyorot baris |
| `className` | `string` | — | Kelas tambahan |

## Catatan

`List` mengisi sendiri prop `index` dan `isLast` ke tiap anaknya, jadi
kedua prop itu tidak perlu kamu berikan.

Karena itu pula, anak `List` harus berupa `ListItem` — bukan elemen DOM
biasa. Menaruh `<div>` atau `<button>` langsung sebagai anak membuat
prop internal itu bocor ke DOM dan memunculkan peringatan React.

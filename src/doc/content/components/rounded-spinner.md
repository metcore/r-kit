---
title: RoundedSpinner
description: Indikator memuat berbentuk lingkaran berputar.
group: Foundation
---

Indikator bahwa sesuatu sedang berjalan. Dipakai di dalam `Button` saat
prop `loading` menyala, dan bisa juga dipakai sendiri.

## Impor

```tsx
import { RoundedSpinner } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<RoundedSpinner />
```

## Warna

Menerima sembilan warna yang sama dengan komponen lain:

```tsx
<RoundedSpinner color="primary" />
<RoundedSpinner color="danger" />
<RoundedSpinner color="gray" />
```

## Ukuran & Ketebalan

Berbeda dari kebanyakan komponen, ukurannya diberikan sebagai angka
piksel, bukan `sm`/`md`/`lg`:

```tsx
<RoundedSpinner size={16} stroke={2} />
<RoundedSpinner size={48} stroke={5} />
```

## Kecepatan Putaran

`duration` dalam milidetik. Angka lebih besar berarti berputar lebih
lambat:

```tsx
<RoundedSpinner duration={1500} />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `size` | `number` | — | Diameter dalam piksel |
| `radius` | `number` | — | Jari-jari lingkaran |
| `stroke` | `number` | — | Ketebalan garis |
| `duration` | `number` | — | Lama satu putaran, dalam milidetik |
| `color` | `BaseColor` | `primary` | Warna spinner |

## Catatan

Di dalam `Button`, spinner ini muncul otomatis lewat prop `loading` dan
ukurannya menyesuaikan `size` tombol. Tidak perlu memasangnya sendiri:

```tsx
<Button loading color="primary">Menyimpan…</Button>
```

---
title: Indicator
description: Menempelkan penanda kecil pada sudut elemen lain.
group: Components
---

Menempelkan bulatan atau angka di sudut elemen, biasanya untuk menandai
notifikasi yang belum dibaca.

## Impor

```tsx
import { Indicator } from '@herca/r-kit';
```

## Penggunaan Dasar

Tanpa `value`, penanda tampil sebagai bulatan polos:

```tsx
<Indicator color="danger">
  <Icon name="bell" size={22} />
</Indicator>
```

## Dengan Angka

```tsx
<Indicator color="danger" value={12}>
  <Icon name="bell" size={22} />
</Indicator>
```

## Posisi

```tsx
<Indicator color="info" position="bottom-left" value={3}>
  <Avatar name="Herca" />
</Indicator>
```

## Denyut

`pulse` menambahkan animasi berdenyut untuk menarik perhatian:

```tsx
<Indicator pulse color="danger" value={1}>
  <Icon name="bell" size={22} />
</Indicator>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `color` | `danger \| success \| warning \| info \| gray` | — | Warna penanda. Wajib |
| `value` | `number \| string` | — | Isi penanda; kosong berarti bulatan polos |
| `size` | `sm \| md \| lg` | `md` | Ukuran penanda |
| `position` | `IndicatorPosition` | `top-right` | Sudut tempat penanda menempel |
| `pulse` | `boolean` | `false` | Menyalakan animasi berdenyut |
| `children` | `ReactNode` | — | Elemen yang ditempeli. Wajib |
| `indicatorClassName` | `string` | — | Kelas untuk penanda |

## Catatan

Daftar warnanya lebih sempit dari `BaseColor` — hanya lima nilai, tanpa
`primary`. `ButtonIcon` menyediakan prop `indicatorProps` yang memakai
komponen ini di baliknya.

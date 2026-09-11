---
title: BrandLogo
description: Menampilkan logo beserta nama produk.
group: Components
---

Dipakai di kepala sidebar. Nama produk bisa disembunyikan agar cocok
dengan sidebar yang sedang menciut.

## Impor

```tsx
import { BrandLogo } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
import logo from './logo.png';

<BrandLogo brandLogo={logo} name="Herca Admin" />;
```

## Menyembunyikan Nama

Tanpa `name`, hanya gambarnya yang tampil:

```tsx
<BrandLogo brandLogo={logo} />
```

Pola ini dipakai bersama keadaan sidebar:

```tsx
const { state } = useSidebar();

<BrandLogo
  brandLogo={logo}
  name={state === 'expanded' ? 'Herca Admin' : undefined}
/>;
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `brandLogo` | `string` | — | Alamat gambar logo. Wajib |
| `name` | `string` | — | Nama produk di samping logo |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Ukuran gambar dikunci di 32×32 piksel. Bila logomu tidak persegi,
sediakan versi persegi agar tidak gepeng.

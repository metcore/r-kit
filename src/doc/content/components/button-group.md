---
title: ButtonGroup
description: Menyatukan beberapa tombol yang saling berkaitan.
group: Components
playground: /playground/button-group
---

## Impor

```tsx
import { ButtonGroup, ButtonGroupItem } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<ButtonGroup>
  <ButtonGroupItem>Harian</ButtonGroupItem>
  <ButtonGroupItem>Mingguan</ButtonGroupItem>
  <ButtonGroupItem>Bulanan</ButtonGroupItem>
</ButtonGroup>
```

Sudut membulat hanya di ujung kiri dan kanan, sehingga seluruh kelompok
terbaca sebagai satu kesatuan.

## Varian & Warna

Ditulis sekali di kelompoknya, lalu diturunkan ke semua anak:

```tsx
<ButtonGroup variant="outline" color="primary" size="sm">
  …
</ButtonGroup>
```

## Arah Vertikal

```tsx
<ButtonGroup direction="vertical">…</ButtonGroup>
```

## Berisi Ikon

```tsx
<ButtonGroupItem>
  <Icon name="plus" size={12} />
</ButtonGroupItem>
```

## Props — ButtonGroup

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `variant` | `default \| outline \| tertiary` | — | Diturunkan ke semua anak |
| `color` | `BaseColor` | — | Diturunkan ke semua anak |
| `size` | ukuran `Button` | — | Diturunkan ke semua anak |
| `direction` | `horizontal \| vertical` | `horizontal` | Arah susunan |
| `children` | `ReactNode` | — | Daftar `ButtonGroupItem`. Wajib |

## Props — ButtonGroupItem

Menerima seluruh prop `Button` **kecuali** `size` dan `variant`, karena
keduanya sudah ditentukan kelompoknya agar tetap seragam.

## Catatan

Memberi `size` atau `variant` langsung pada `ButtonGroupItem` akan
ditolak TypeScript. Atur di `ButtonGroup`.

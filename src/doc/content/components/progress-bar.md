---
title: ProgressBar
description: Menampilkan kemajuan sebuah proses.
group: Components
playground: /playground/progress-bar
---

## Impor

```tsx
import { ProgressBar } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<ProgressBar value={40} />
```

`value` diisi angka 0 sampai 100.

## Warna

```tsx
<ProgressBar value={30} color="danger" />
<ProgressBar value={80} color="success" />
```

## Tooltip Persentase

```tsx
<ProgressBar useTooltip value={40} />
<ProgressBar useTooltip tooltipSide="bottom" value={40} />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value` | `number` | — | Kemajuan 0–100. Wajib |
| `color` | `BaseColor` | `primary` | Warna bilah |
| `useTooltip` | `boolean` | `false` | Menampilkan persentase saat disentuh |
| `tooltipSide` | `top \| bottom` | `top` | Arah tooltip |
| `className` | `string` | — | Kelas untuk lintasan |
| `valueClassName` | `string` | — | Kelas untuk bilah terisi |

## Catatan

Komponen ini tidak punya mode tak tentu. Untuk proses yang panjangnya
tidak diketahui, gunakan [RoundedSpinner](/docs/rounded-spinner).

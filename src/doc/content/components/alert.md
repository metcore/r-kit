---
title: Alert
description: Menyampaikan pesan status yang penting bagi user.
group: Feedback
playground: /playground/alert
---

Pesan yang menetap di dalam halaman. Untuk pesan sesaat yang muncul lalu
hilang, gunakan [Toast](/docs/toast).

## Impor

```tsx
import { Alert } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Alert color="danger" title="Gagal menyimpan" />
```

## Dengan Deskripsi & Ikon

```tsx
<Alert
  color="warning"
  icon="exclamation-mark"
  title="Kuota hampir habis"
  description="Sisa 2 hari cuti tahunan."
/>
```

## Varian

```tsx
<Alert variant="solid" color="info" title="Versi baru tersedia" />
<Alert variant="outline" color="info" title="Versi baru tersedia" />
```

## Bisa Ditutup

```tsx
<Alert dismissible color="success" title="Perubahan tersimpan" />
```

## Melebar Penuh

```tsx
<Alert block color="info" title="Pemberitahuan" />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `title` | `string` | — | Judul pesan |
| `description` | `string` | — | Keterangan di bawah judul |
| `color` | `AlertColor` | — | Warna pesan |
| `variant` | `solid \| outline` | `solid` | Gaya latar |
| `icon` | `IconNameProps` | — | Ikon di kiri |
| `dismissible` | `boolean` | `false` | Menampilkan tombol tutup |
| `block` | `boolean` | `false` | Melebar penuh mengikuti induk |

## Catatan

`Alert` diekspor sebagai named export dari `@herca/r-kit/clients`.
Modulnya juga punya default export, tetapi gunakan bentuk named agar
konsisten dengan komponen lain.

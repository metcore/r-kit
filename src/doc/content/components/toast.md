---
title: Toast
description: Pesan singkat yang muncul sesaat lalu menghilang.
group: Feedback
playground: /playground/toast
---

Ada dua cara memakainya: sebagai kartu statis di dalam halaman, atau
sebagai pesan mengambang lewat `useToast`.

## Impor

```tsx
import { Toast, ToastProvider, useToast } from '@herca/r-kit/clients';
```

## Pesan Mengambang

Pasang provider sekali di akar aplikasi:

```tsx
<ToastProvider position="top-right">
  <App />
</ToastProvider>
```

Lalu panggil dari komponen mana pun:

```tsx
const toast = useToast();

<Button
  onClick={() =>
    toast.show({
      color: 'success',
      icon: 'check',
      title: 'Pengajuan disetujui',
      description: 'Cuti Anda tercatat di kalender tim.',
      duration: 3000,
    })
  }
>
  Setujui
</Button>;
```

Posisi yang tersedia: `top-right` (bawaan), `top-left`, `top-center`,
`bottom-right`, `bottom-left`, `bottom-center`.

## Kartu Statis

```tsx
<Toast
  color="danger"
  title="Gagal menyimpan"
  description="Periksa koneksi lalu coba lagi."
/>
```

## Tombol Aksi

```tsx
<Toast
  color="danger"
  title="Gagal menyimpan"
  description="Periksa koneksi lalu coba lagi."
  actionLabel="Coba lagi"
  onClickAction={simpanUlang}
/>
```

## Varian Outline

```tsx
<Toast variant="outline" color="info" title="Versi baru tersedia" />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `title` | `string` | — | Judul pesan. Wajib |
| `description` | `string` | — | Keterangan. Wajib |
| `color` | `BaseColor` | — | Warna pesan |
| `variant` | `outline` | — | Gaya latar |
| `icon` | `IconNameProps` | — | Ikon di kiri |
| `iconSize` | `number` | — | Ukuran ikon |
| `actionLabel` | `string` | — | Teks tombol aksi |
| `onClickAction` | `() => void` | — | Dipanggil saat tombol aksi ditekan |
| `onClose` | `() => void` | — | Menampilkan tombol silang |
| `duration` | `number` | — | Lama tampil, dalam milidetik |

## Catatan

Berbeda dari komponen lain, `title` dan `description` keduanya **wajib**
diisi.

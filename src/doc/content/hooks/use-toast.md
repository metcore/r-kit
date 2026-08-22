---
title: useToast
description: Menampilkan pesan toast mengambang.
group: Hooks
playground: /playground/toast
---

## Impor

```tsx
import { useToast } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const toast = useToast();

toast.show({
  color: 'success',
  title: 'Pengajuan disetujui',
  description: 'Cuti Anda tercatat di kalender tim.',
  duration: 3000,
});
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `show` | `(props: ToastProps) => void` | Menampilkan satu toast |

## Catatan

Harus dipanggil di dalam `ToastProvider`. Di luar itu, hook melempar galat.

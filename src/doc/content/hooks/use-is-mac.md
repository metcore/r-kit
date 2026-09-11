---
title: useIsMac
description: Mengetahui apakah perangkat memakai tombol Command.
group: Hooks
---

Dipakai untuk memilih antara simbol ⌘ dan teks "Ctrl" saat menampilkan
pintasan papan tik.

## Impor

```tsx
import { useIsMac } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const mac = useIsMac();

<Kbd>{mac ? '⌘' : 'Ctrl'}</Kbd>
<Kbd>K</Kbd>;
```

## Kembalian

| Tipe | Keterangan |
| --- | --- |
| `boolean` | `true` bila perangkat Mac, iPhone, iPad, atau iPod |

## Catatan

Selalu bernilai `false` pada render pertama dan saat dirender di server,
agar markup keduanya sama. Nilai sebenarnya baru muncul setelah komponen
terpasang.

Deteksi dilakukan lewat `navigator.userAgentData.platform` bila tersedia,
dengan `navigator.platform` dan user agent sebagai cadangan.

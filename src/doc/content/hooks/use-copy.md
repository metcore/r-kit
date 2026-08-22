---
title: useCopy
description: Menyalin teks ke papan klip beserta penanda "tersalin" sesaat.
group: Hooks
---

## Impor

```tsx
import { useCopy } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const { copy, copied } = useCopy();

<button onClick={() => void copy('npm install @herca/r-kit')}>
  {copied ? 'Tersalin!' : 'Salin'}
</button>;
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `copy` | `(text: string) => Promise<void>` | Menyalin teks ke papan klip |
| `copied` | `boolean` | Bernilai `true` selama 1,5 detik setelah menyalin |

## Catatan

`copy` mengembalikan Promise. Bila dipanggil langsung di dalam `onClick`
tanpa `await`, tandai dengan `void` agar aturan lint floating promise
tidak mengeluh.

Penanda `copied` kembali `false` otomatis setelah 1,5 detik — kamu tidak
perlu meresetnya sendiri.

Papan klip hanya tersedia pada konteks aman (HTTPS atau `localhost`).

---
title: useTableQuery
description: Mengambil data tabel pada tingkat yang lebih rendah.
group: Hooks
playground: /playground/api-table
---

## Impor

```tsx
import { useTableQuery } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const query = useTableQuery({ url: '/api/pengguna' });
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `query` | `hasil permintaan` | Data, keadaan memuat, dan galat |

## Catatan

Dipakai di balik `useApiTable`. Gunakan langsung hanya bila kamu membangun tabel sendiri.

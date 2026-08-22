---
title: useApiTable
description: Mengelola pengambilan data tabel dari server.
group: Hooks
playground: /playground/api-table
---

## Impor

```tsx
import { useApiTable } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const t = useApiTable<Pengguna>({
  url: '/api/pengguna',
  dataPath: 'data',
  totalPath: 'meta.total',
});

<ApiTable t={t} columns={KOLOM} />;
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `t` | `UseApiTableResult` | Seluruh keadaan tabel, diteruskan ke `ApiTable` |

## Catatan

Daftar lengkap konfigurasinya ada di halaman [ApiTable](/docs/api-table).

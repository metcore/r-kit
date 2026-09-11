---
title: useAsyncLoader
description: Memuat opsi Select secara bertahap.
group: Hooks
playground: /playground/select
---

## Impor

```tsx
import { useAsyncLoader } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const loader = useAsyncLoader({ loadOptions });
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `loader` | `keadaan pemuatan` | Opsi, keadaan memuat, dan pemicu muat berikutnya |

## Catatan

Dipakai `AsyncSelect` di baliknya.

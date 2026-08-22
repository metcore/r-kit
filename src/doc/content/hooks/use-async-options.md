---
title: useAsyncOptions
description: Mengelola daftar opsi Select yang datang dari API.
group: Hooks
playground: /playground/select
---

## Impor

```tsx
import { useAsyncOptions } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const options = useAsyncOptions({ loadOptions });
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `options` | `daftar opsi` | Opsi yang sudah dimuat beserta keadaannya |

## Catatan

Pasangan dari `useAsyncLoader`, dipakai `AsyncSelect`.

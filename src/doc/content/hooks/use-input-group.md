---
title: useInputGroup
description: Membaca konteks InputGroup dari dalam.
group: Hooks
playground: /playground/input-group
---

## Impor

```tsx
import { useInputGroup } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const group = useInputGroup();
const didalamGroup = group !== null;
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `group` | `konteks atau `null`` | Bernilai `null` bila dipanggil di luar `InputGroup` |

## Catatan

Dipakai `Button` agar menyesuaikan bentuknya saat berada di dalam `InputGroup`. Tidak melempar galat di luar konteks — ia mengembalikan `null`.

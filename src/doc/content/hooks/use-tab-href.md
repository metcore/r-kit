---
title: useTabHref
description: Membangun alamat untuk tiap pemicu tab.
group: Hooks
playground: /playground/tabs
---

## Impor

```tsx
import { useTabHref } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const href = useTabHref('akun');
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `href` | `string` | Alamat yang menyertakan `?tab-{id}` |

## Catatan

Dipakai `TabsTrigger` agar tab bisa dibuka di tab peramban baru.

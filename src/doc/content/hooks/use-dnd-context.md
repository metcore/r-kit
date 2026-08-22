---
title: useDndContext
description: Membaca konteks papan seret-dan-lepas.
group: Hooks
playground: /playground/dnd
---

## Impor

```tsx
import { useDndContext } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const dnd = useDndContext();
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `items` | `DndItemsRecord` | Isi papan per kolom |
| `handleDragStart` | `fungsi` | Dipanggil saat seretan dimulai |
| `handleDragEnter` | `fungsi` | Dipanggil saat memasuki posisi baru |
| `handleDragEnd` | `fungsi` | Dipanggil saat seretan selesai |

## Catatan

Harus dipanggil di dalam `DndBoard`. Berguna untuk membangun kolom atau item dengan tampilan sendiri.

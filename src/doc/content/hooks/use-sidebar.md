---
title: useSidebar
description: Membaca dan mengubah keadaan sidebar.
group: Hooks
playground: /playground/sidebar
---

## Impor

```tsx
import { useSidebar } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const { state, isHovered, toggleSidebar, isMobile } = useSidebar();
const terbuka = state === 'expanded' || isHovered;
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `state` | `'expanded' | 'collapsed'` | Keadaan sidebar saat ini |
| `open` | `boolean` | Sama dengan `state === 'expanded'` |
| `setOpen` | `(open: boolean) => void` | Mengubah keadaan |
| `toggleSidebar` | `() => void` | Membalik keadaan |
| `isMobile` | `boolean` | Layar berada di bawah ambang mobile |
| `openMobile` | `boolean` | Keadaan sidebar versi mobile |
| `setOpenMobile` | `(open: boolean) => void` | Mengubah keadaan versi mobile |
| `isHovered` | `boolean` | Kursor sedang berada di atas sidebar |
| `setIsHovered` | `(hovered: boolean) => void` | Mengubah keadaan sentuh |

## Catatan

Harus dipanggil di dalam `SidebarProvider`. Di luar itu, hook melempar galat.

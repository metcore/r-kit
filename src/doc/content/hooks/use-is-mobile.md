---
title: useIsMobile
description: Mengetahui apakah lebar layar berada di bawah ambang mobile.
group: Hooks
---

## Impor

```tsx
import { useIsMobile } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const mobile = useIsMobile();

return mobile ? <MenuRingkas /> : <MenuLengkap />;
```

## Kembalian

| Tipe | Keterangan |
| --- | --- |
| `boolean` | `true` bila lebar jendela kurang dari 768px |

## Catatan

Ambangnya tetap di **768px** dan belum bisa diatur lewat parameter.

Nilainya `false` pada render pertama, lalu diperbarui setelah komponen
terpasang. Ini disengaja agar markup server dan klien tidak berbeda,
tetapi berarti ada satu render dengan nilai yang belum tentu benar.
Hindari memakainya untuk sesuatu yang tidak boleh berkedip.

Untuk perbedaan tampilan yang murni visual, kelas responsif Tailwind
lebih tepat karena tidak perlu menunggu JavaScript berjalan.

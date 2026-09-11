---
title: Tooltip
description: Keterangan singkat yang muncul saat elemen disentuh kursor.
group: Components
---

Dibangun di atas Radix Tooltip. Terdiri dari tiga bagian yang harus
dipakai bersama.

## Impor

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@herca/r-kit/clients';
```

## Pasang Provider Sekali

`TooltipProvider` cukup dipasang sekali di akar aplikasi:

```tsx
<TooltipProvider>
  <App />
</TooltipProvider>
```

## Penggunaan Dasar

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <ButtonIcon icon="download" aria-label="Unduh" />
  </TooltipTrigger>
  <TooltipContent>Unduh berkas</TooltipContent>
</Tooltip>
```

`asChild` pada pemicu membuat tooltip menempel pada elemenmu sendiri,
bukan pada pembungkus tambahan.

## Arah Munculnya

```tsx
<TooltipContent side="bottom">Unduh berkas</TooltipContent>
```

Nilai yang tersedia: `top`, `right`, `bottom`, `left`.

## Props

Ketiga komponen meneruskan prop Radix Tooltip apa adanya. Yang paling
sering dipakai:

| Prop | Komponen | Keterangan |
| --- | --- | --- |
| `asChild` | `TooltipTrigger` | Meneruskan pemicu ke elemen anak |
| `side` | `TooltipContent` | Arah kemunculan |
| `sideOffset` | `TooltipContent` | Jarak dari pemicu |
| `align` | `TooltipContent` | Perataan terhadap pemicu |
| `delayDuration` | `Tooltip` | Jeda sebelum muncul |

## Catatan

Beberapa komponen sudah menyediakan prop `tooltip` sendiri — `Button`,
`Checkbox`, `Switch`, dan sebagian isian form. Untuk kasus itu tidak
perlu merangkai ketiga komponen ini secara manual.

Tooltip tidak muncul pada perangkat sentuh. Jangan menaruh informasi
yang penting hanya di dalamnya.

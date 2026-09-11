---
title: Collapsible
description: Menyembunyikan dan menampilkan satu blok konten.
group: Components
---

Dibangun di atas Radix Collapsible. Untuk daftar panel yang lebih
terstruktur, gunakan [Accordion](/docs/accordion).

## Impor

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Collapsible>
  <CollapsibleTrigger>Lihat rincian</CollapsibleTrigger>
  <CollapsibleContent>
    Rincian perhitungan tagihan bulan ini.
  </CollapsibleContent>
</Collapsible>
```

## Terkendali

```tsx
const [terbuka, setTerbuka] = useState(false);

<Collapsible open={terbuka} onOpenChange={setTerbuka}>
  …
</Collapsible>;
```

## Props

Ketiga komponen meneruskan prop Radix Collapsible apa adanya:

| Prop | Komponen | Keterangan |
| --- | --- | --- |
| `open` | `Collapsible` | Mode terkendali |
| `defaultOpen` | `Collapsible` | Keadaan awal |
| `onOpenChange` | `Collapsible` | Dipanggil saat dibuka atau ditutup |
| `disabled` | `Collapsible` | Menonaktifkan |
| `asChild` | `CollapsibleTrigger` | Meneruskan pemicu ke elemen anak |

## Catatan

`SidebarMenuGroup` memakai komponen ini di baliknya untuk membuka tutup
kelompok menu.

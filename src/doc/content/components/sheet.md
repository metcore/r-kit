---
title: Sheet
description: Panel yang muncul dari sisi layar tanpa meninggalkan halaman.
group: Navigation
playground: /playground/sheet
---

## Impor

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
} from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Buka Panel</Button>
  </SheetTrigger>

  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filter Data</SheetTitle>
      <SheetDescription>Persempit hasil pencarian.</SheetDescription>
    </SheetHeader>

    <SheetBody>…</SheetBody>

    <SheetFooter>
      <SheetClose asChild>
        <Button>Terapkan</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## Arah Munculnya

```tsx
<SheetContent side="left">…</SheetContent>
```

Nilai: `right` (bawaan), `left`, `top`, `bottom`.

## Terkendali

```tsx
const [terbuka, setTerbuka] = useState(false);

<Sheet open={terbuka} onOpenChange={setTerbuka}>…</Sheet>;
```

## Keadaan Tersimpan di URL

Seperti `Tabs`, `Sheet` menerima `id` dan `urlReplace` untuk menyimpan
keadaan buka tutup ke query string:

```tsx
<Sheet id="filter" urlReplace={false}>…</Sheet>
```

## Props — Sheet

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `id` | `string` | — | Pengenal untuk sinkronisasi URL |
| `urlReplace` | `boolean` | — | Cara riwayat browser ditulis |
| `open` | `boolean` | — | Mode terkendali |
| `defaultOpen` | `boolean` | — | Keadaan awal |
| `onOpenChange` | `(open: boolean) => void` | — | Dipanggil saat dibuka atau ditutup |
| `modal` | `boolean` | `true` | Mengunci interaksi di luar panel |

## Props — SheetContent

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `side` | `right \| left \| top \| bottom` | `right` | Sisi kemunculan |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Saat terbuka, `Sheet` mengunci scroll halaman. Bila header aplikasimu
memakai `position: sticky` dan halaman di-scroll oleh window, header akan
lepas. Lihat [Layout Aplikasi](/docs/app-layout).

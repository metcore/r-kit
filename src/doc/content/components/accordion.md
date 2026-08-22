---
title: Accordion
description: Menyembunyikan dan menampilkan panel konten.
group: Data Display
playground: /playground/accordion
---

## Impor

```tsx
import { Accordion, AccordionItem } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Accordion renderHeader={<Text weight="semibold">Kebijakan Cuti</Text>}>
  <AccordionItem>Cuti diajukan 3 hari kerja sebelumnya.</AccordionItem>
  <AccordionItem>Kuota direset setiap 1 Januari.</AccordionItem>
</Accordion>
```

`renderHeader` adalah bagian yang selalu terlihat dan berfungsi sebagai
pemicu buka tutup.

## Terkendali

```tsx
const [terbuka, setTerbuka] = useState(false);

<Accordion isOpen={terbuka} onCollapse={setTerbuka} renderHeader={header}>
  …
</Accordion>;
```

## Belang-seling

```tsx
<Accordion variant="striped" renderHeader={header}>…</Accordion>
```

## Baris Disorot

```tsx
<AccordionItem active>Baris yang sedang disorot</AccordionItem>
```

## Props — Accordion

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `renderHeader` | `ReactNode` | — | Bagian yang selalu terlihat |
| `isOpen` | `boolean` | — | Mode terkendali |
| `onCollapse` | `(isOpen: boolean) => void` | — | Dipanggil saat dibuka atau ditutup |
| `variant` | `default \| striped` | `default` | Gaya baris |
| `children` | `ReactNode` | — | Daftar `AccordionItem` |

## Props — AccordionItem

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Isi baris. Wajib |
| `active` | `boolean` | `false` | Menyorot baris |

## Catatan

`Accordion` tidak meneruskan prop `className`. Untuk mengatur tampilan
luarnya, bungkus dengan elemen sendiri.

Kartu pembungkusnya memakai sudut membulat tanpa `overflow-hidden`,
sehingga sudut baris di dalamnya dapat menonjol keluar lengkung — paling
terlihat saat accordion tertutup. Bungkus dengan
`[&_.rounded-xl]:overflow-hidden` bila mengganggu.

---
title: Card
description: Wadah konten dengan kepala, badan, media, dan kaki.
group: Components
playground: /playground/card
---

Wadah paling sering dipakai. Terdiri dari lima bagian yang bebas
dikombinasikan.

## Impor

```tsx
import {
  Card,
  CardHeader,
  CardBody,
  CardMedia,
  CardFooter,
} from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<Card>
  <CardHeader divider>Ringkasan Pengajuan</CardHeader>
  <CardBody>Tiga pengajuan menunggu persetujuan Anda.</CardBody>
</Card>
```

## Garis Pemisah

`divider` menambahkan garis di bawah kepala atau di atas kaki:

```tsx
<Card>
  <CardHeader divider>Judul</CardHeader>
  <CardBody>Isi</CardBody>
  <CardFooter divider>Kaki</CardFooter>
</Card>
```

## Dengan Media

```tsx
<Card>
  <CardMedia image="/foto-produk.jpg" alt="Foto produk" />
  <CardBody>Keterangan produk</CardBody>
</Card>
```

## Varian & Warna

```tsx
<Card variant="filled" color="primary">…</Card>
<Card variant="outline" color="danger">…</Card>
```

## Ukuran

`size` mengatur kerapatan padding di seluruh bagian:

```tsx
<Card size="sm">…</Card>
```

## Props — Card

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `variant` | `filled \| outline` | — | Gaya kartu |
| `color` | `BaseColor` | — | Warna aksen |
| `size` | `sm \| md \| lg` | `md` | Kerapatan padding |
| `className` | `string` | — | Kelas tambahan |

## Props — CardHeader & CardFooter

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `divider` | `boolean` | `false` | Menampilkan garis pemisah |
| `className` | `string` | — | Kelas tambahan |

## Catatan

`Card` meneruskan `size` ke anak-anaknya, sehingga padding seluruh bagian
seragam tanpa perlu diatur satu per satu.

Akar `Card` memakai sudut membulat tanpa `overflow-hidden`. Bila kamu
menaruh elemen berlatar warna yang bersudut siku di dalamnya, sudut itu
akan menonjol keluar lengkung. Tambahkan `overflow-hidden` sendiri bila
perlu.

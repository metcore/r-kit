---
title: Button
description: Menjalankan aksi, mengirim form, atau berpindah halaman.
group: Components
playground: /playground/button
---

## Impor

```tsx
import { Button } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Button color="primary">Simpan</Button>
```

## Varian

```tsx
<Button variant="default">Simpan</Button>
<Button variant="outline">Batal</Button>
<Button variant="tertiary">Lewati</Button>
```

Dalam satu layar sebaiknya hanya ada satu tombol `default`.

## Ukuran

```tsx
<Button size="xxs">XXS</Button>
<Button size="lg">Besar</Button>
```

## Keadaan Memuat

```tsx
<Button loading color="primary">Menyimpan…</Button>
```

Spinner muncul otomatis dan ukurannya menyesuaikan `size`.

## Selebar Induk

```tsx
<Button block>Lanjutkan</Button>
```

## Sebagai Tautan

Dua cara, dengan tujuan berbeda:

```tsx
// tautan biasa, memuat ulang halaman
<Button href="https://herca.id">Situs Herca</Button>

// tautan router, tanpa memuat ulang
<Button asChild>
  <Link to="/pengguna">Lihat Pengguna</Link>
</Button>
```

## Dengan Ikon

```tsx
<Button className="gap-2" color="primary">
  <Icon name="plus" size={16} />
  Tambah Data
</Button>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `variant` | `default \| outline \| tertiary` | `default` | Bobot visual |
| `color` | `BaseColor` | `primary` | Warna tombol |
| `size` | `xxs \| xs \| sm \| md \| lg` | `md` | Ukuran tombol |
| `block` | `boolean` | `false` | Melebar penuh mengikuti induk |
| `loading` | `boolean` | `false` | Menampilkan spinner |
| `active` | `boolean` | `false` | Keadaan tertekan |
| `disabled` | `boolean` | `false` | Menonaktifkan |
| `asChild` | `boolean` | `false` | Meneruskan gaya ke elemen anak |
| `href` | `string` | — | Merender `<a>` alih-alih `<button>` |
| `type` | `button \| submit` | `button` | Tipe tombol |
| `tooltip` | `string` | — | Keterangan saat disentuh |
| `className` | `string` | — | Kelas tambahan |

## Catatan

`ButtonProps` adalah gabungan dua bentuk: `ButtonAsButtonProps` dan
`ButtonAsAnchorProps`. Memberi `href` memindahkan tipenya ke bentuk
anchor, sehingga prop khusus tombol seperti `type` tidak lagi berlaku.

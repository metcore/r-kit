---
title: Komposisi dengan asChild
description: Meneruskan gaya komponen ke elemen lain memakai prop asChild.
group: Konsep Inti
---

Kadang kamu butuh tampilan sebuah komponen, tetapi elemen yang berbeda.
Tombol yang sebenarnya tautan, misalnya. Prop `asChild` menyelesaikan ini.

## Masalahnya

Membungkus tombol di dalam tautan menghasilkan dua elemen bersarang,
dengan perilaku fokus dan aksesibilitas yang membingungkan:

```tsx
<Link to="/pengguna">
  <Button>Lihat Pengguna</Button>
</Link>
```

## Penyelesaiannya

Dengan `asChild`, komponen tidak merender elemennya sendiri. Ia
meneruskan seluruh kelas dan propnya ke anak tunggalnya:

```tsx
import { Link } from 'react-router-dom';
import { Button } from '@herca/r-kit/clients';

<Button asChild color="primary">
  <Link to="/pengguna">Lihat Pengguna</Link>
</Button>;
```

Hasilnya satu elemen `<a>` yang tampil persis seperti tombol.

## Aturan yang harus dipatuhi

`asChild` memakai Slot dari Radix UI, dan Slot menuntut **tepat satu
elemen anak**:

```tsx
<Button asChild>
  <Link to="/a">Satu</Link>
  <Link to="/b">Dua</Link>
</Button>
// ❌ galat: Slot hanya menerima satu anak
```

Anaknya juga harus elemen yang bisa menerima `className` dan `ref`.
Komponen buatan sendiri perlu meneruskan keduanya.

## Komponen lain yang memakainya

Pola ini muncul di beberapa tempat, dan tidak selalu bernama `asChild`:

```tsx
// SidebarMenuItem memakai asChild secara bawaan
<SidebarMenuItem>
  <Link to="/dashboard">Dashboard</Link>
</SidebarMenuItem>

// DropdownTrigger selalu asChild
<DropdownTrigger>
  <Button>Aksi</Button>
</DropdownTrigger>
```

`SidebarMenuItem` menyalakan `asChild` secara bawaan. Bila kamu hanya
ingin menaruh teks tanpa elemen pembungkus, matikan lebih dulu:

```tsx
<SidebarMenuItem asChild={false}>Overview</SidebarMenuItem>
```

## Alternatif untuk tautan sederhana

`Button` juga menerima `href` langsung. Ini menghasilkan `<a>` biasa,
cocok untuk tautan keluar yang tidak melewati router:

```tsx
<Button href="https://herca.id">Situs Herca</Button>
```

Untuk navigasi di dalam aplikasi, tetap gunakan `asChild` bersama
komponen `Link` milik router agar halaman tidak dimuat ulang.

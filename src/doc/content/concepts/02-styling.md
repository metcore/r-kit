---
title: Styling & className
description: Cara menimpa gaya bawaan komponen memakai className dan utilitas cn.
group: Konsep Inti
---

r-kit tidak menyembunyikan Tailwind. Hampir semua komponen meneruskan
`className` ke elemen terluarnya, dan kelas yang kamu berikan **menang**
atas kelas bawaan.

```tsx
<Button className="w-full rounded-none">Simpan</Button>
```

## Kenapa kelasmu menang

Di balik layar komponen memakai `cn`, yang menggabungkan
[clsx](https://github.com/lukeed/clsx) dengan
[tailwind-merge](https://github.com/dcastil/tailwind-merge). Bagian
tailwind-merge inilah yang penting: ia mengenali kelas Tailwind yang
saling bertentangan dan hanya menyisakan yang terakhir.

```tsx
cn('px-4 py-2', 'px-8');
// → 'py-2 px-8'   px-4 dibuang, bukan digabung
```

Tanpa itu, `px-4 px-8` akan sama-sama ada di DOM dan hasil akhirnya
bergantung pada urutan di berkas CSS — sesuatu yang tidak bisa kamu atur.

## Memakai `cn` sendiri

Utilitas yang sama ikut diekspor, berguna saat membangun komponen
turunan:

```tsx
import { cn } from '@herca/r-kit';

function KartuStatistik({ className, ...props }) {
  return (
    <div
      className={cn('rounded-xl border p-6', className)}
      {...props}
    />
  );
}
```

Letakkan `className` di posisi **terakhir** agar pemakai komponenmu tetap
bisa menimpa gaya bawaanmu.

## Yang tidak bisa ditimpa dengan className

Sebagian komponen punya bagian dalam yang tidak dijangkau `className` di
akar. Untuk itu tersedia prop terpisah, misalnya `contentClassName`,
`wrapperClassName`, atau `selectedFilesClassName`. Halaman referensi tiap
komponen mencantumkan prop mana saja yang tersedia.

Bila prop yang kamu butuhkan tidak ada, gunakan varian arbitrer Tailwind
dari elemen induk:

```tsx
<div className="[&_button]:rounded-full">
  <ButtonGroup>…</ButtonGroup>
</div>
```

Cara ini bekerja, tetapi bergantung pada struktur internal komponen.
Anggap sebagai jalan terakhir, bukan pilihan pertama.

## Gaya yang datang dari `@herca/r-kit/style`

Berkas CSS paket memuat definisi token warna, font, dan beberapa keyframe
animasi. Ia harus diimpor sekali di titik masuk aplikasi. Tanpa itu,
komponen tetap merender tetapi tampil tanpa warna dan tanpa animasi.

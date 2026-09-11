---
title: Dropdown
description: Menyembunyikan sekumpulan aksi di balik satu pemicu.
group: Navigation
playground: /playground/dropdown
---

Dibangun di atas Radix DropdownMenu. Isinya dirender lewat portal,
sehingga menu selalu tampil di atas kartu maupun panel.

## Impor

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownPanel,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent,
} from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Dropdown>
  <DropdownTrigger>
    <Button color="primary">Aksi</Button>
  </DropdownTrigger>

  <DropdownContent>
    <DropdownItem>Lihat detail</DropdownItem>
    <DropdownItem>Duplikat</DropdownItem>
    <DropdownSeparator />
    <DropdownItem>Hapus</DropdownItem>
  </DropdownContent>
</Dropdown>
```

`DropdownTrigger` selalu memakai `asChild`, jadi pemicunya bisa komponen
apa pun.

## Item Sebagai Tautan

```tsx
<DropdownItem href="/pengguna/12">Lihat profil</DropdownItem>
```

## Submenu

```tsx
<DropdownSub>
  <DropdownSubTrigger>
    <div className="flex w-full items-center justify-between px-3 py-2">
      Pindahkan ke
      <Icon name="angle-right-small" size={16} />
    </div>
  </DropdownSubTrigger>

  <DropdownSubContent>
    <DropdownItem>Proyek A</DropdownItem>
  </DropdownSubContent>
</DropdownSub>
```

## Panel Berisi Form

`DropdownPanel` menampung konten bebas tanpa gaya item yang bisa diklik:

```tsx
<DropdownContent>
  <DropdownPanel className="flex w-64 flex-col gap-2">
    <Input label="Email" />
    <Button>Masuk</Button>
  </DropdownPanel>
</DropdownContent>
```

## Posisi

```tsx
<DropdownContent align="end" side="bottom" sideOffset={8}>…</DropdownContent>
```

## Props

Seluruh komponen meneruskan prop Radix DropdownMenu. Yang paling sering
dipakai:

| Prop | Komponen | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `align` | `DropdownContent` | — | `start`, `center`, atau `end` |
| `side` | `DropdownContent` | — | `top`, `right`, `bottom`, `left` |
| `sideOffset` | `DropdownContent` | `15` | Jarak dari pemicu |
| `href` | `DropdownItem` | — | Merender item sebagai tautan |
| `disabled` | `DropdownItem` | `false` | Menonaktifkan item |
| `modal` | `Dropdown` | `true` | Mengunci scroll saat menu terbuka |

## Catatan

Menu terbuka pada `pointerdown`, bukan `click`. Ini penting saat menulis
pengujian otomatis.

Dalam mode `modal` bawaan, scroll halaman dikunci selama menu terbuka.
Efeknya pada header yang menempel dibahas di
[Layout Aplikasi](/docs/app-layout).

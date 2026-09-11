---
title: ButtonIcon
description: Tombol berisi ikon saja untuk aksi cepat yang hemat ruang.
group: Components
playground: /playground/button-icon
---

## Impor

```tsx
import { ButtonIcon } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<ButtonIcon icon="pencil" aria-label="Ubah" />
```

Selalu isi `aria-label`. Tanpa teks, pembaca layar tidak punya petunjuk
apa pun tentang fungsi tombol ini.

## Bentuk Bulat

```tsx
<ButtonIcon rounded icon="plus" aria-label="Tambah" />
```

## Ukuran Ikon Terpisah

`size` mengatur kotak tombol, `iconSize` mengatur ikonnya:

```tsx
<ButtonIcon size="lg" iconSize={20} icon="download" aria-label="Unduh" />
```

## Dengan Penanda

```tsx
<ButtonIcon
  icon="bell"
  aria-label="Notifikasi"
  indicatorProps={{ color: 'danger', value: '9+', size: 'sm' }}
/>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `icon` | `IconNameProps` | — | Nama ikon. Wajib |
| `aria-label` | `string` | — | Nama tombol bagi pembaca layar |
| `size` | `ButtonIconSize` | `md` | Ukuran kotak tombol |
| `iconSize` | `number` | — | Ukuran ikon dalam piksel |
| `rounded` | `boolean` | `false` | Membuat tombol bulat penuh |
| `indicatorProps` | prop `Indicator` tanpa `children` | — | Menempelkan penanda |
| `variant`, `color`, `loading`, `disabled` | — | — | Sama seperti `Button` |

## Catatan

Seluruh prop `Button` berlaku, kecuali `children` dan `size` yang diganti
oleh `icon` dan `ButtonIconSize`.

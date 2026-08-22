---
title: Breadcrumbs
description: Menunjukkan posisi halaman di dalam hierarki situs.
group: Navigation
playground: /playground/breadcrumb
---

## Impor

```tsx
import { Breadcrumbs } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<Breadcrumbs
  items={[
    { label: 'Beranda', href: '/' },
    { label: 'Pengaturan', href: '/pengaturan' },
    { label: 'Profil Perusahaan' },
  ]}
/>
```

Item terakhir selalu dirender sebagai teks biasa, karena ia mewakili
halaman yang sedang dibuka. Jangan beri `href` padanya.

## Pemisah Kustom

```tsx
<Breadcrumbs separator="angle-right-small" items={items} />
```

Menerima nama ikon apa pun dari komponen `Icon`.

## Bersama Router

`Breadcrumbs` memberi `href` ke `linkComponent`, sedangkan `Link` milik
react-router menerima `to`. Jembatani lewat adaptor kecil:

```tsx
import { Link } from 'react-router-dom';

function RouterLink({ href, ...props }) {
  return <Link to={href ?? '#'} {...props} />;
}

<Breadcrumbs linkComponent={RouterLink} items={items} />;
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `items` | `BreadcrumbItem[]` | — | Daftar tingkat. Wajib |
| `separator` | `IconNameProps` | `caret-right` | Ikon pemisah |
| `linkComponent` | `ElementType \| string` | `a` | Komponen untuk tautan |
| `separatorClassName` | `string` | — | Kelas untuk pemisah |

Tiap `BreadcrumbItem` berisi `label` wajib dan `href` opsional.

## Catatan

Item tanpa `href` yang bukan item terakhir tetap tampil berwarna seperti
tautan, tetapi tidak bisa diklik.

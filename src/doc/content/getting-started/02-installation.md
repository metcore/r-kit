---
title: Instalasi
description: Memasang @herca/r-kit beserta peer dependency dan berkas stylenya.
group: Memulai
---

## Pasang paket

```bash
npm install @herca/r-kit
```

```bash
pnpm add @herca/r-kit
```

```bash
yarn add @herca/r-kit
```

```bash
bun add @herca/r-kit
```

## Peer dependency

r-kit tidak membawa React maupun Tailwind sendiri. Ketiganya harus sudah
ada di proyekmu:

| Paket | Versi |
| --- | --- |
| `react` | `^19.1.1` |
| `react-dom` | `^19.1.1` |
| `tailwindcss` | `^4.0.0` |

Perhatikan bahwa yang dibutuhkan adalah **Tailwind v4**, bukan v3.
Keduanya berbeda cara konfigurasinya.

## Impor style

Satu baris ini wajib ada, dan cukup ditulis sekali di titik masuk
aplikasi. Tanpa ini komponen akan tampil tanpa gaya sama sekali.

```tsx
import '@herca/r-kit/style';
```

## Tiga jalur impor yang tersedia

Paket ini hanya membuka tiga jalur. Menulis jalur lain akan gagal, karena
`exports` di `package.json` tidak memetakannya.

```tsx
import { Badge } from '@herca/r-kit';          // komponen sederhana
import { Button } from '@herca/r-kit/clients'; // komponen interaktif
import '@herca/r-kit/style';                   // berkas CSS
```

Pemisahan antara jalur pertama dan kedua adalah hal yang paling sering
keliru saat memakai kit ini. Penjelasan lengkapnya ada di
[Dua Entry Point](/docs/entry-points).

## TypeScript

Definisi tipe sudah ikut di dalam paket, jadi tidak perlu memasang
`@types/…` apa pun. Tipe prop bisa diimpor bila kamu perlu membungkus
komponen:

```tsx
import { Button } from '@herca/r-kit/clients';
import type { ButtonProps } from '@herca/r-kit/clients';

export function TombolSimpan(props: ButtonProps) {
  return <Button color="primary" {...props} />;
}
```

Setelah ini, coba rakit layar pertamamu di
[Mulai Cepat](/docs/quick-start).

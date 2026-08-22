---
title: CodeBlock
description: Menampilkan potongan kode dengan penyorotan sintaks.
group: Components
---

Menyorot kode memakai Shiki. Penyorotan berjalan asinkron, sehingga blok
tampil kosong sepersekian detik sebelum kodenya muncul.

## Impor

```tsx
import { CodeBlock } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<CodeBlock code={"const a = 1;"} />
```

## Bahasa

```tsx
<CodeBlock code={kode} lang="json" />
```

Bahasa yang didukung: `tsx` (bawaan), `ts`, `js`, `jsx`, `json`, `css`,
`html`, `md`, dan `toml`.

## Tema

```tsx
<CodeBlock code={kode} theme="light-plus" />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `code` | `string` | — | Kode yang ditampilkan. Wajib |
| `lang` | lihat daftar di atas | `tsx` | Bahasa untuk penyorotan |
| `theme` | `dark-plus \| light-plus` | `dark-plus` | Tema warna |

## Catatan

Komponen ini tidak menyediakan tombol salin. Bila memerlukannya,
bungkus sendiri:

```tsx
import { useCopy } from '@herca/r-kit/clients';

const { copy, copied } = useCopy();

<div className="relative">
  <button onClick={() => void copy(kode)}>
    {copied ? 'Tersalin' : 'Salin'}
  </button>
  <CodeBlock code={kode} />
</div>;
```

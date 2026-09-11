---
title: Image
description: Menampilkan gambar dengan srcSet otomatis dan pratinjau ukuran penuh.
group: Components
playground: /playground/image
---

## Impor

```tsx
import { Image } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Image src="/foto-produk.jpg" alt="Foto produk" width={640} height={400} />
```

`alt` wajib. Ukuran juga wajib: berikan `width` dan `height`, **atau**
`fill` — tidak boleh keduanya, dan tidak boleh tidak sama sekali.

## Mengisi Penuh Induk

```tsx
<div className="relative h-56 w-full overflow-hidden rounded-lg">
  <Image fill src="/foto-produk.jpg" alt="Foto produk" />
</div>
```

Dengan `fill`, gambar diposisikan absolut, sehingga induknya wajib punya
`position: relative` dan tinggi yang jelas.

## Placeholder Buram

```tsx
<Image
  src="/foto.jpg"
  alt="Foto"
  width={640}
  height={400}
  placeholder="blur"
  blurDataURL={BLUR_DATA_URL}
/>
```

`blurDataURL` wajib bila `placeholder="blur"`. TypeScript memaksakan ini.

## Prioritas Muat

```tsx
<Image priority src="/hero.jpg" alt="Banner" width={1200} height={600} />
```

Menyisipkan `<link rel="preload">` dan memuat gambar secara eager.
Pakai hanya untuk gambar utama di layar pertama.

## Loader Kustom

```tsx
import { Image, cloudinaryLoader } from '@herca/r-kit/clients';

<Image
  loader={cloudinaryLoader}
  src="folder/foto.jpg"
  alt="Foto"
  width={640}
  height={400}
/>;
```

Tiga loader bawaan tersedia: `cloudinaryLoader`, `imgixLoader`, dan
`selfHostedLoader`. Loader sendiri juga bisa:

```tsx
const loaderSaya = ({ src, width, quality }) =>
  `https://cdn.herca.id${src}?w=${width}&q=${quality ?? 75}`;
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `src` | `string` | — | Alamat gambar. Wajib |
| `alt` | `string` | — | Teks alternatif. Wajib |
| `width`, `height` | `number` | — | Wajib bila `fill` tidak dipakai |
| `fill` | `boolean` | `false` | Mengisi penuh induk secara absolut |
| `sizes` | `string` | — | Lebar tampil per breakpoint |
| `quality` | `number` | `75` | Diteruskan ke loader |
| `priority` | `boolean` | `false` | Memuat lebih awal |
| `placeholder` | `empty \| blur` | `empty` | Tampilan selagi memuat |
| `blurDataURL` | `string` | — | Wajib bila `placeholder="blur"` |
| `loader` | `ImageLoader` | — | Membangun URL tiap kandidat srcSet |

## Catatan

Mengklik gambar membuka pratinjau ukuran penuh di dalam modal. Perilaku
ini menyala selalu dan belum bisa dimatikan lewat prop.

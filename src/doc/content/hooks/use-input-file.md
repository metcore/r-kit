---
title: useInputFile
description: Memisahkan kendali berkas dari tampilannya.
group: Hooks
playground: /playground/input-file
---

## Impor

```tsx
import { useInputFile } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const berkas = useInputFile({
  accept: 'image/*,.pdf',
  maxSize: 5 * 1024 * 1024,
});

<InputFile inputFile={berkas} label="Unggah dokumen" multiple />
<InputFilePreview inputFile={berkas} mode="compact" />;
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `inputFile` | `UseInputFileReturn` | Diteruskan ke `InputFile` dan `InputFilePreview` |

## Catatan

Berguna ketika area unggah dan daftar pratinjau perlu diletakkan berjauhan di halaman.

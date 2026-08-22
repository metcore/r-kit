---
title: Modal
description: Jendela yang muncul di atas halaman untuk satu tugas atau konfirmasi.
group: Components
playground: /playground/modal
---

## Impor

```tsx
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [terbuka, setTerbuka] = useState(false);

<Modal isOpen={terbuka} onClose={() => setTerbuka(false)}>
  <ModalHeader>
    <ModalTitle>Ubah Profil</ModalTitle>
  </ModalHeader>

  <ModalBody>Perbarui data profil Anda di sini.</ModalBody>

  <ModalFooter className="justify-end gap-2">
    <Button variant="outline" color="gray" onClick={tutup}>Batal</Button>
    <Button onClick={tutup}>Simpan</Button>
  </ModalFooter>
</Modal>;
```

Modal selalu terkendali — `isOpen` wajib diisi.

## Judul Lewat Prop

Untuk konfirmasi singkat, `title` dan `description` bisa diberikan
langsung tanpa menyusun `ModalHeader`:

```tsx
<Modal
  size="xs"
  isOpen={terbuka}
  onClose={tutup}
  title="Hapus dokumen?"
  description="Dokumen yang dihapus tidak dapat dikembalikan."
>
  <ModalFooter className="justify-end gap-2">
    <Button variant="outline" color="gray" onClick={tutup}>Batal</Button>
    <Button color="danger" onClick={tutup}>Hapus</Button>
  </ModalFooter>
</Modal>
```

## Ukuran

| Nilai | Lebar maksimum |
| --- | --- |
| `xs` | 327px |
| `sm` | 480px |
| `md` | 700px (bawaan) |
| `lg` | 1000px |
| `full` | Selebar layar |

## Posisi

```tsx
<Modal position="top" isOpen={terbuka} onClose={tutup}>…</Modal>
```

Nilai: `center` (bawaan), `top`, `bottom`.

## Mencegah Penutupan

Untuk proses yang tidak boleh diputus di tengah jalan:

```tsx
<Modal
  isOpen={terbuka}
  onClose={tutup}
  showCloseButton={false}
  closeOnOverlayClick={false}
>
  …
</Modal>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | — | Menentukan modal tampil atau tidak. Wajib |
| `onClose` | `() => void` | — | Dipanggil saat modal diminta menutup |
| `children` | `ReactNode` | — | Isi modal. Wajib |
| `title` | `string` | — | Judul, alternatif dari `ModalHeader` |
| `description` | `string` | — | Keterangan di bawah judul |
| `size` | `xs \| sm \| md \| lg \| full` | `md` | Lebar maksimum |
| `position` | `center \| top \| bottom` | `center` | Posisi di layar |
| `showCloseButton` | `boolean` | `true` | Menampilkan tombol silang |
| `closeOnOverlayClick` | `boolean` | `true` | Menutup saat area gelap diklik |
| `closable` | `boolean` | — | Mengizinkan modal ditutup |

## Catatan

Saat modal terbuka, scroll halaman dikunci lewat `overflow: hidden` pada
`body`. Bila header aplikasimu memakai `position: sticky` dan halaman
di-scroll oleh window, header akan lepas dan menghilang. Cara
menghindarinya dijelaskan di [Layout Aplikasi](/docs/app-layout).

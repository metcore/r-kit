---
title: Tabs
description: Membagi konten sederajat ke beberapa panel.
group: Navigation
playground: /playground/tabs
---

## Impor

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Tabs id="pengaturan" defaultValue="akun">
  <TabsList>
    <TabsTrigger value="akun">Akun</TabsTrigger>
    <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
  </TabsList>

  <TabsContent value="akun">Isi tab akun</TabsContent>
  <TabsContent value="notifikasi">Isi tab notifikasi</TabsContent>
</Tabs>
```

`id` **wajib** dan harus unik dalam satu halaman — alasannya dijelaskan
di bawah.

## Tab Aktif Tersimpan di URL

Setiap `Tabs` tak-terkendali menyimpan tab aktifnya ke query string
sebagai `?tab-{id}`. Karena itu `id` wajib unik: dua `Tabs` dengan `id`
sama akan saling menimpa.

Tautannya jadi bisa dibagikan dan tahan muat ulang.

## Riwayat Browser

`urlReplace` hanya menentukan cara riwayat ditulis, bukan apakah URL
disinkronkan:

| Nilai | Perilaku |
| --- | --- |
| `true` (bawaan) | `history.replace` — tombol Back langsung keluar halaman |
| `false` | `history.push` — tiap pergantian tab menambah satu langkah riwayat |

```tsx
<Tabs id="tagihan" defaultValue="belum-bayar" urlReplace={false}>…</Tabs>
```

## Terkendali dari Luar

```tsx
const [tab, setTab] = useState('akun');

<Tabs id="terkendali" value={tab} onValueChange={setTab}>…</Tabs>;
```

Dalam mode terkendali, sinkronisasi URL dimatikan.

## Orientasi Vertikal

```tsx
<Tabs id="laporan" defaultValue="ringkasan" orientation="vertical">…</Tabs>
```

## Props — Tabs

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `id` | `string` | — | Pengenal unik. Wajib |
| `defaultValue` | `string` | — | Tab awal mode tak terkendali |
| `value` | `string` | — | Mode terkendali |
| `onValueChange` | `(value: string) => void` | — | Dipanggil saat tab berpindah |
| `urlReplace` | `boolean` | `true` | Cara riwayat browser ditulis |
| `orientation` | `horizontal \| vertical` | `horizontal` | Arah daftar tab |
| `unmountOnHide` | `boolean` | `true` | Melepas panel yang tidak aktif |
| `onLoad` | `(value: string) => void` | — | Dipanggil sekali saat pertama dimuat |

## Props — TabsTrigger & TabsContent

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `value` | `string` | Menautkan pemicu ke panel. Wajib |
| `disabled` | `boolean` | Hanya pada `TabsTrigger` |

## Catatan

`TabsTrigger` merender elemen `<a role="tab">`, bukan `<button>`. Ini
penting bila kamu mencari pemicunya lewat selektor.

Dengan `unmountOnHide` bernilai `true`, isi panel yang tidak aktif
dilepas dari DOM sehingga state di dalamnya hilang saat berpindah tab.

---
title: Timeline
description: Menyusun rangkaian peristiwa secara berurutan.
group: Components
playground: /playground/timeline
---

## Impor

```tsx
import { Timeline } from '@herca/r-kit';
```

## Penggunaan Dasar

```tsx
<Timeline
  value={{
    label: '08:15',
    title: 'Pengajuan dibuat',
    subtitle: 'oleh Herca Pratama',
    description: 'Cuti tahunan 3 hari kerja.',
  }}
/>
```

Hanya `title` yang wajib di dalam `value`.

## Merangkai Beberapa Peristiwa

Garis putus-putus digambar **turun** dari titik setiap item. Karena itu
`isFirst` — yang membuang garis tersebut — dipasang pada item
**terakhir**, agar rantainya berhenti di titik terakhir dan tidak
menjuntai:

```tsx
{RIWAYAT.map((item, index) => (
  <Timeline
    key={item.title}
    isFirst={index === RIWAYAT.length - 1}
    color={item.color}
    value={item}
  />
))}
```

Item tunggal juga memakai `isFirst`.

## Warna

```tsx
<Timeline color="success" value={{ title: 'Disetujui' }} />
```

## Badge Status

```tsx
<Timeline
  color="warning"
  badge={{ value: 'Menunggu', color: 'warning', size: 'sm' }}
  value={{ title: 'Menunggu persetujuan' }}
/>
```

## Konten Tambahan

`advanced` menyisipkan elemen bebas di bawah deskripsi:

```tsx
<Timeline
  value={{
    title: 'Dokumen diunggah',
    advanced: () => <Button size="sm">Unduh</Button>,
  }}
/>
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `value.title` | `string` | — | Judul peristiwa. Wajib |
| `value.label` | `string` | — | Penanda kiri, biasanya waktu |
| `value.subtitle` | `string` | — | Baris di bawah judul |
| `value.description` | `string` | — | Keterangan panjang |
| `value.advanced` | `() => ReactNode` | — | Konten tambahan di bawah deskripsi |
| `color` | `TimeLineColor` | `primary` | Warna titik dan garis |
| `badge` | `{ value, color, size }` | — | Badge di samping label |
| `isFirst` | `boolean` | `false` | Membuang garis penghubung ke bawah |
| `classNames` | objek | — | Kelas untuk tiap bagian |
| `children` | `ReactNode` | — | Mengganti seluruh isi, mengabaikan `value` |

## Catatan

Nama prop `isFirst` menyesatkan: yang dimaksud adalah item yang tidak
memiliki penerus, yaitu item **terakhir**.

Titik pada timeline memakai `z-index: 10`. Bila halaman memiliki header
yang menempel, bungkus timeline dengan `relative z-0` agar titiknya tidak
menimpa header saat di-scroll.

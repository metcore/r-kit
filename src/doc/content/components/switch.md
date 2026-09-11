---
title: Switch
description: Sakelar hidup-mati untuk pengaturan yang langsung berlaku.
group: Form
playground: /playground/switch
---

Dipakai untuk pengaturan yang berlaku saat itu juga. Bila perubahannya
baru berlaku setelah tombol Simpan ditekan, [Checkbox](/docs/checkbox)
lebih tepat.

## Impor

```tsx
import { Switch } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [aktif, setAktif] = useState(false);

<Switch checked={aktif} onCheckedChange={setAktif} />;
```

## Tak Terkendali

```tsx
<Switch defaultChecked />
```

## Ukuran & Warna

```tsx
<Switch size="sm" />
<Switch color="success" defaultChecked />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `checked` | `boolean` | — | Mode terkendali |
| `defaultChecked` | `boolean` | — | Nilai awal mode tak terkendali |
| `onCheckedChange` | `(checked: boolean) => void` | — | Dipanggil saat berubah |
| `size` | `sm \| md \| lg` | `md` | Ukuran sakelar |
| `color` | `BaseColor` | `primary` | Warna saat menyala |
| `disabled` | `boolean` | `false` | Menonaktifkan |
| `required` | `boolean` | `false` | Menandai wajib diisi |
| `name` | `string` | — | Nama field dalam form |
| `id` | `string` | — | Id elemen |
| `tooltip` | `string` | — | Keterangan saat disentuh |
| `className` | `string` | — | Kelas tambahan |

## Catatan

Berbeda dari `Checkbox` yang memakai `onChange`, `Switch` memakai
`onCheckedChange`. Penamaan ini memang belum seragam di seluruh kit.

`Switch` tidak punya prop `label`. Pasangkan sendiri dengan teks bila
perlu:

```tsx
<div className="flex items-center justify-between">
  <Text variant="t2">Notifikasi email</Text>
  <Switch checked={aktif} onCheckedChange={setAktif} />
</div>
```

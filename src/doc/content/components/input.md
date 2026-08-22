---
title: Input
description: Isian teks satu baris dengan label, petunjuk, dan pesan kesalahan.
group: Form
playground: /playground/input-field
---

Isian teks paling dasar. Semua prop bawaan `<input>` diteruskan, ditambah
empat prop form yang berlaku sama di seluruh isian kit.

## Impor

```tsx
import { Input } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<Input label="Nama lengkap" placeholder="Herca Pratama" />
```

## Petunjuk & Kesalahan

```tsx
<Input
  required
  label="Email"
  hint="Undangan dikirim ke alamat ini."
  errorMessages={['Format email tidak sesuai.']}
/>
```

`hint` tampil abu di bawah isian dan tersembunyi ketika `errorMessages`
terisi, sehingga keduanya tidak pernah bertumpuk.

## Terkendali

```tsx
const [nilai, setNilai] = useState('');

<Input value={nilai} onChange={(e) => setNilai(e.target.value)} />;
```

Karena `Input` meneruskan prop `<input>` asli, `onChange` menerima event
DOM biasa — bukan nilai langsung.

## Jenis Isian

```tsx
<Input type="password" label="Kata sandi" />
<Input type="number" label="Jumlah" />
<Input type="email" label="Email" />
```

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `label` | `string` | — | Teks di atas isian |
| `hint` | `string` | — | Keterangan di bawah isian |
| `description` | `string` | — | Keterangan tambahan di bawah label |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `required` | `boolean` | `false` | Menambahkan tanda bintang pada label |
| `disabled` | `boolean` | `false` | Menonaktifkan isian |
| `inputSize` | `number` | — | Lebar isian dalam karakter |
| `className` | `string` | — | Kelas tambahan |

Seluruh prop `<input>` lain — `type`, `value`, `onChange`, `placeholder`,
`maxLength`, dan sebagainya — diteruskan apa adanya.

## Catatan

Empat prop berikut **sudah usang**: `leftAddon`, `rightAddon`,
`leftAddonClassName`, dan `rightAddonClassName`. Gunakan
[InputGroup](/docs/input-group) untuk menempelkan ikon atau teks pada
isian.

```tsx
// usang
<Input leftAddon={<Icon name="search" />} />

// gunakan ini
<InputGroup>
  <InputGroupText><Icon name="search" /></InputGroupText>
  <InputGroupControl />
</InputGroup>
```

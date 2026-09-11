---
title: Mulai Cepat
description: Merakit satu layar form sederhana memakai Card, Input, dan Button.
group: Memulai
---

Halaman ini merakit satu layar kecil yang utuh: kartu berisi form dengan
dua isian dan sepasang tombol. Semua yang dipakai di sini akan muncul lagi
di banyak tempat.

## Siapkan titik masuk

Impor style sekali saja, di berkas paling atas aplikasi.

```tsx
import '@herca/r-kit/style';
```

## Rakit layarnya

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@herca/r-kit';
import { Button, Input } from '@herca/r-kit/clients';

export default function FormUndangan() {
  return (
    <Card>
      <CardHeader divider>Undang Anggota Tim</CardHeader>

      <CardBody className="flex flex-col gap-4">
        <Input label="Nama lengkap" placeholder="Herca Pratama" />
        <Input
          label="Email"
          placeholder="nama@herca.id"
          hint="Undangan dikirim ke alamat ini."
        />
      </CardBody>

      <CardFooter divider className="flex justify-end gap-2">
        <Button variant="outline" color="gray">
          Batal
        </Button>
        <Button color="primary">Kirim Undangan</Button>
      </CardFooter>
    </Card>
  );
}
```

## Perhatikan dua jalur impornya

`Card` datang dari `@herca/r-kit`, sedangkan `Button` dan `Input` dari
`@herca/r-kit/clients`. Ini bukan kebetulan: `Card` hanya menyusun tata
letak, sementara `Button` dan `Input` menyimpan state dan menangani
interaksi. Aturan lengkapnya di [Dua Entry Point](/docs/entry-points).

## Tambahkan validasi

Prop `errorMessages` mengubah tampilan isian menjadi keadaan salah
sekaligus menampilkan pesannya.

```tsx
const [email, setEmail] = useState('');
const salah = email !== '' && !email.includes('@');

<Input
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  errorMessages={salah ? ['Format email tidak sesuai.'] : undefined}
/>;
```

## Ganti warnanya

Hampir semua komponen menerima prop `color` dengan nilai yang sama:
`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `orange`,
`purple`, dan `gray`.

```tsx
<Button color="danger">Hapus</Button>
<Button color="success">Setujui</Button>
```

## Selanjutnya

- [Dua Entry Point](/docs/entry-points) — komponen mana ada di jalur impor yang mana
- [Styling & className](/docs/styling) — cara menimpa gaya bawaan
- Buka **Playground** untuk melihat seluruh komponen dalam keadaan hidup

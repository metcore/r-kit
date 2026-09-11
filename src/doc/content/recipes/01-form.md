---
title: Membangun Form
description: Merangkai isian, label, petunjuk, dan pesan kesalahan menjadi satu form utuh.
group: Panduan
playground: /playground/input-field
---

Komponen form di r-kit berbagi empat prop yang sama: `label`, `hint`,
`errorMessages`, dan `required`. Sekali paham polanya, seluruh isian
berperilaku serupa.

## Anatomi satu isian

```tsx
import { Input } from '@herca/r-kit/clients';

<Input
  required
  label="Email"
  placeholder="nama@herca.id"
  hint="Undangan dikirim ke alamat ini."
/>;
```

- `label` — teks di atas isian.
- `required` — menambahkan tanda bintang merah pada label.
- `hint` — keterangan abu di bawah isian, hilang saat ada kesalahan.
- `errorMessages` — mengubah isian menjadi keadaan salah.

## Menampilkan kesalahan

`errorMessages` menerima satu teks atau larik teks. Selama nilainya
kosong atau `undefined`, isian tetap normal.

```tsx
const [email, setEmail] = useState('');
const [disentuh, setDisentuh] = useState(false);

const galat: string[] = [];
if (disentuh && email === '') galat.push('Email wajib diisi.');
if (disentuh && email !== '' && !email.includes('@'))
  galat.push('Format email tidak sesuai.');

<Input
  required
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={() => setDisentuh(true)}
  errorMessages={galat.length > 0 ? galat : undefined}
/>;
```

Menahan validasi sampai isian tersentuh mencegah form tampak penuh
kesalahan sebelum user sempat mengetik apa pun.

## Form yang lebih lengkap

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@herca/r-kit';
import {
  Button,
  Checkbox,
  Input,
  Select,
  Textarea,
} from '@herca/r-kit/clients';

<Card>
  <CardHeader divider>Ajukan Cuti</CardHeader>

  <CardBody className="flex flex-col gap-4">
    <Input required label="Nama lengkap" />

    <Select
      label="Jenis cuti"
      options={[
        { label: 'Cuti tahunan', value: 'tahunan' },
        { label: 'Cuti sakit', value: 'sakit' },
      ]}
    />

    <Textarea
      label="Alasan"
      hint="Jelaskan singkat, maksimal 200 karakter."
      maxLength={200}
    />

    <Checkbox label="Saya sudah berkoordinasi dengan atasan" />
  </CardBody>

  <CardFooter divider className="flex justify-end gap-2">
    <Button variant="outline" color="gray">Batal</Button>
    <Button color="primary">Ajukan</Button>
  </CardFooter>
</Card>;
```

## Isian yang menyimpan nilainya sendiri

Sebagian komponen menyimpan nilai secara internal bila kamu tidak
memberikan `value`. Berikan `defaultValue` untuk nilai awal, atau
`value` bersama `onChange` bila ingin mengendalikannya penuh.

```tsx
<Counter defaultValue="1" />                    // tak terkendali
<Counter value={jumlah} onChange={setJumlah} /> // terkendali
```

Campuran keduanya — memberi `value` tanpa `onChange` — membuat isian
tampak macet karena nilainya tidak pernah berubah.

## Menggabungkan isian dengan elemen lain

`InputGroup` menempelkan ikon, teks, atau tombol pada isian:

```tsx
import {
  InputGroup,
  InputGroupControl,
  InputGroupText,
} from '@herca/r-kit/clients';

<InputGroup>
  <InputGroupText>Rp</InputGroupText>
  <InputGroupControl placeholder="0" />
</InputGroup>;
```

## Isian lain yang tersedia

`Checkbox`, `Radio`, `Switch`, `Slider`, `Counter`, `Textarea`,
`InputOTP`, `InputFile`, `ColorInput`, `Drawing`, `TextEditor`, serta
enam pemilih waktu: `DatePicker`, `TimePicker`, `MonthPicker`,
`YearPicker`, `DayPicker`, dan `DayOfMonthPicker`.

Semuanya menerima `label`, `hint`, dan `errorMessages` dengan makna yang
sama.

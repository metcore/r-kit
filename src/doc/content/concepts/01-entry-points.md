---
title: Dua Entry Point
description: Kenapa komponen terbagi ke @herca/r-kit dan @herca/r-kit/clients, serta cara memilihnya.
group: Konsep Inti
---

Ini hal yang paling sering keliru saat memakai r-kit. Paket ini punya dua
jalur impor, dan menaruh komponen di jalur yang salah membuat impor gagal.

```tsx
import { Badge } from '@herca/r-kit';          // 16 komponen
import { Button } from '@herca/r-kit/clients'; // 42 komponen
```

## Aturannya

Pemisahannya mengikuti satu pertanyaan: **apakah komponen ini menyimpan
state atau menangani interaksi?**

- **Tidak** — komponen hanya menerima prop lalu menggambar. Tempatnya di
  `@herca/r-kit`.
- **Ya** — komponen memakai hook React, memasang event listener, atau
  membungkus Radix UI. Tempatnya di `@herca/r-kit/clients`.

Pemisahan ini penting bagi kerangka kerja yang membedakan komponen server
dan klien, seperti Next.js App Router. Komponen dari jalur pertama aman
dirender di server; jalur kedua tidak.

## Isi `@herca/r-kit`

Enam belas komponen, semuanya tanpa state:

`Avatar`, `Badge`, `BrandLogo`, `Breadcrumbs`, `Card`, `CodeBlock`,
`Divider`, `Header`, `Hero`, `Icon`, `Indicator`, `Kbd`, `List`,
`RoundedSpinner`, `Text`, `Timeline`.

Ditambah utilitas `cn` dan tipe `BaseColor`.

## Isi `@herca/r-kit/clients`

Empat puluh dua komponen interaktif:

`Accordion`, `Alert`, `ApiTable`, `Button`, `ButtonGroup`, `ButtonIcon`,
`Calendar`, `Checkbox`, `Chip`, `Collapsible`, `ColorInput`, `Counter`,
`DatePicker`, `DayOfMonthPicker`, `DayPicker`, `DndBoard`, `Drawing`,
`Dropdown`, `FileView`, `FormField`, `Image`, `Input`, `InputFile`,
`InputGroup`, `InputOTP`, `Modal`, `MonthPicker`, `ProgressBar`, `Radio`,
`Select`, `Sheet`, `Sidebar`, `Slider`, `Switch`, `Table`, `Tabs`,
`TextEditor`, `Textarea`, `TimePicker`, `Toast`, `Tooltip`, `YearPicker`.

Seluruh **17 hook** juga ada di jalur ini, karena hook menurut definisinya
berjalan di klien.

## Yang sering menjebak

Beberapa komponen terasa "sederhana" tetapi tetap ada di `clients`:

| Komponen | Kenapa di `clients` |
| --- | --- |
| `Button` | Menangani klik, keadaan `loading`, dan mode `asChild` |
| `Tooltip` | Dibangun di atas Radix, memerlukan konteks |
| `Image` | Menyimpan keadaan termuat dan membuka pratinjau |
| `ProgressBar` | Memakai tooltip di dalamnya |

Sebaliknya `Timeline` dan `Breadcrumbs` terlihat kompleks tetapi murni
menggambar, sehingga ada di jalur utama.

Kalau ragu, coba impor dari `@herca/r-kit` lebih dulu. Bila TypeScript
mengeluh `has no exported member`, pindahkan ke `@herca/r-kit/clients`.

## Hanya tiga jalur yang ada

`package.json` memetakan tepat tiga jalur. Menulis jalur lain akan gagal,
sekalipun berkasnya terlihat ada di dalam `dist`:

```tsx
import { Button } from '@herca/r-kit/clients'; // ✅
import '@herca/r-kit/style';                   // ✅

import { Button } from '@herca/r-kit/button';  // ❌ tidak dipetakan
import Toast from '@herca/r-kit/toast-card';   // ❌ tidak dipetakan
```

## Menggabungkan keduanya

Satu berkas boleh mengimpor dari kedua jalur sekaligus:

```tsx
import { Card, CardBody, Text } from '@herca/r-kit';
import { Button } from '@herca/r-kit/clients';
```

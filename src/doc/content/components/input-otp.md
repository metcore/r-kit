---
title: InputOTP
description: Isian kode verifikasi dengan beberapa kotak terpisah.
group: Form
playground: /playground/input-otp
---

Isian untuk kode sekali pakai. Kursor berpindah sendiri antar kotak, dan
menempel kode dari papan klip mengisi seluruh kotak sekaligus.

## Impor

```tsx
import { InputOTP } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
const [kode, setKode] = useState('');

<InputOTP length={6} value={kode} onChange={setKode} />;
```

## Bertindak Saat Lengkap

`onComplete` dipanggil begitu seluruh kotak terisi — cocok untuk
mengirim verifikasi tanpa menunggu tombol ditekan:

```tsx
<InputOTP
  length={6}
  onComplete={(kode) => verifikasi(kode)}
/>
```

## Menyembunyikan Angka

```tsx
<InputOTP mask length={6} />
```

## Pengelompokan & Pemisah

```tsx
<InputOTP length={6} groupSize={3} separator="—" />
```

Kode enam digit akan tampil sebagai dua kelompok berisi tiga kotak,
dipisahkan tanda yang kamu tentukan.

## Props

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `length` | `number` | — | Jumlah kotak |
| `value` | `string` | — | Mode terkendali |
| `onChange` | `(value: string) => void` | — | Dipanggil setiap ketikan |
| `onComplete` | `(value: string) => void` | — | Dipanggil saat semua kotak terisi |
| `mask` | `boolean` | `false` | Menyembunyikan karakter |
| `type` | `InputOTPType` | — | Jenis karakter yang diterima |
| `groupSize` | `number` | — | Banyak kotak per kelompok |
| `separator` | `ReactNode` | — | Pemisah antar kelompok |
| `label` | `string` | — | Teks di atas isian |
| `hint` | `string` | — | Keterangan di bawah isian |
| `description` | `string` | — | Keterangan di bawah label |
| `errorMessages` | `string \| string[]` | — | Mengaktifkan keadaan salah |
| `autoFocus` | `boolean` | `false` | Memfokus kotak pertama saat muncul |
| `disabled` | `boolean` | `false` | Menonaktifkan |
| `readOnly` | `boolean` | `false` | Hanya bisa dibaca |
| `required` | `boolean` | `false` | Menandai wajib diisi |

## Catatan

`onChange` menerima gabungan seluruh kotak sebagai satu string, bukan
karakter per kotak.

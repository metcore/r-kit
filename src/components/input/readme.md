# Dokumentasi

Dokumentasi ini mencakup dua komponen:

- `Input` — input teks umum
- `InputOTP` — input khusus kode OTP / verifikasi

Keduanya terintegrasi dengan `FormField` untuk konsistensi struktur form.

---

## 1. Komponen Input

`Input` adalah komponen input reusable berbasis elemen native `<input>` dengan dukungan:

- label
- hint
- description
- error state
- left & right addon

---

### Import

```ts
import { Input } from "@herca/r-kit/components/input";
```

---

### Contoh Penggunaan Dasar

```tsx
<Input label="Email" placeholder="Masukkan email" required />
```

---

### Left & Right Addon

```tsx
<Input
  label="Cari"
  placeholder="Cari data..."
  leftAddon={<Icon name="search" />}
  rightAddon={<Button>Go</Button>}
/>
```

---

### Error State

#### Otomatis dari `errorMessages`

```tsx
<Input label="Username" errorMessages="Username wajib diisi" />
```

#### Manual dengan `isError`

```tsx
<Input label="Username" isError />
```

---

### Disabled

```tsx
<Input label="Input Tidak Aktif" disabled />
```

---

### Props `InputProps`

| Prop                  | Tipe                        | Keterangan            |
| --------------------- | --------------------------- | --------------------- |
| `label`               | `string`                    | Label input           |
| `hint`                | `string`                    | Teks bantuan          |
| `description`         | `string`                    | Deskripsi tambahan    |
| `errorMessages`       | `string \| string[]`        | Pesan error           |
| `isError`             | `boolean`                   | Paksa error state     |
| `leftAddon`           | `ReactNode`                 | Addon kiri            |
| `rightAddon`          | `ReactNode`                 | Addon kanan           |
| `leftAddonClassName`  | `string`                    | Class addon kiri      |
| `rightAddonClassName` | `string`                    | Class addon kanan     |
| `inputSize`           | `number`                    | Atribut native `size` |
| `size`                | `InputVariantProps["size"]` | Variant ukuran        |
| `className`           | `string`                    | Class input           |

> Semua properti standar `<input>` didukung kecuali `size`.

---

### Catatan Perilaku

- Error aktif jika `errorMessages` ada atau `isError === true`
- `id` otomatis dibuat jika tidak diberikan
- Addon otomatis menyesuaikan padding

---

## 2. Komponen InputOTP

### Deskripsi

`InputOTP` adalah komponen input untuk **kode OTP / verifikasi**.

- Setiap digit = satu input
- Nilai akhir dikelola sebagai satu string
- Fokus berpindah otomatis

---

### Import

```ts
import { InputOTP } from "@herca/r-kit/components/input-otp";
```

---

### Contoh Penggunaan Dasar

```tsx
const [otp, setOtp] = React.useState("");

<InputOTP label="Kode Verifikasi" value={otp} onChange={setOtp} />;
```

---

### Panjang OTP

```tsx
<InputOTP label="Kode OTP" length={4} value={otp} onChange={setOtp} />
```

Default: `6` digit.

---

### Dengan Hint & Deskripsi

```tsx
<InputOTP
  label="Kode Verifikasi"
  hint="Periksa SMS atau Email"
  description="Kode berlaku 5 menit"
  value={otp}
  onChange={setOtp}
/>
```

> `description` hanya muncul di input pertama.

---

### Error State

```tsx
<InputOTP
  label="Kode OTP"
  value={otp}
  onChange={setOtp}
  errorMessages="Kode OTP tidak valid"
/>
```

---

### Disabled

```tsx
<InputOTP label="Kode OTP" value={otp} onChange={setOtp} disabled />
```

---

### Props `InputOTPProps`

| Prop            | Tipe                      | Keterangan         |
| --------------- | ------------------------- | ------------------ |
| `length`        | `number`                  | Jumlah digit OTP   |
| `value`         | `string`                  | Nilai OTP          |
| `onChange`      | `(value: string) => void` | Callback perubahan |
| `label`         | `string`                  | Label field        |
| `hint`          | `string`                  | Teks bantuan       |
| `description`   | `string`                  | Deskripsi tambahan |
| `errorMessages` | `string \| string[]`      | Pesan error        |
| `disabled`      | `boolean`                 | Nonaktifkan input  |
| `className`     | `string`                  | Class wrapper      |
| `size`          | `"sm" \| "md" \| "lg"`    | Ukuran input       |

---

## Aksesibilitas

- Mendukung navigasi keyboard
- Fokus berpindah otomatis (InputOTP)
- Label & error ditangani `FormField`

---

## Display Name

```ts
Input.displayName = "Input";
InputOTP.displayName = "InputOTP";
```

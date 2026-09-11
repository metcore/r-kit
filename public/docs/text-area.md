# Dokumentasi

Komponen **Textarea** adalah input teks multi-baris berbasis elemen native `<textarea>`,
terintegrasi dengan `FormField` supaya struktur label, description, hint, dan error konsisten
dengan komponen form lainnya.

Fitur utama:

- label, description, hint, tooltip
- error state otomatis dari `errorMessages`
- tinggi otomatis mengikuti isi (`field-sizing-content`)
- tombol **clear** opsional lewat `clearAble`
- `ref` diteruskan ke elemen `<textarea>` asli

---

## Import

```tsx
import { Textarea } from '@herca/r-kit';
```

---

## Basic Usage

```tsx
<Textarea placeholder="Tulis sesuatu di sini..." />
```

---

## Label, Description & Hint

```tsx
<Textarea
  label="Deskripsi"
  description="Jelaskan kebutuhanmu sedetail mungkin."
  hint="Minimal 20 karakter."
  placeholder="Tulis deskripsi..."
/>
```

---

## Required & Tooltip

`required` hanya menandai label sebagai wajib isi. Validasi native `<textarea required>`
sengaja dimatikan supaya validasi tetap dipegang oleh form library yang dipakai.

```tsx
<Textarea
  required
  label="Alasan Pengajuan"
  tooltip="Dipakai tim approval untuk meninjau pengajuanmu."
/>
```

---

## Clear Button

Set `clearAble` untuk menampilkan tombol clear di pojok kanan atas textarea.
Tombol hanya muncul ketika nilainya **tidak kosong**, dan otomatis disembunyikan saat
`disabled` atau `readOnly`.

### Controlled

```tsx
const [value, setValue] = useState('');

<Textarea
  clearAble
  label="Catatan"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>;
```

### Uncontrolled

```tsx
<Textarea clearAble label="Feedback" defaultValue="Isi awal" />
```

### onClear & clearLabel

`onClear` dipanggil **setelah** nilai dikosongkan. `onChange` tetap ikut terpanggil dengan
nilai kosong, jadi state form tidak perlu di-reset manual.

```tsx
<Textarea
  clearAble
  label="Feedback"
  clearLabel="Hapus feedback"
  onClear={() => console.log('dikosongkan')}
/>
```

### Dengan react-hook-form

Clear bekerja lewat native value setter + dispatch event `input`, sehingga register dari
react-hook-form ikut ter-update tanpa `setValue` manual.

```tsx
<Textarea clearAble label="Catatan" {...register('catatan')} />
```

---

## Error State

```tsx
<Textarea
  label="Alamat"
  errorMessages="Alamat minimal 10 karakter."
  placeholder="Tulis alamat lengkap..."
/>
```

`errorMessages` juga menerima array:

```tsx
<Textarea label="Alamat" errorMessages={['Wajib diisi', 'Minimal 10 karakter']} />
```

---

## Disabled & Read Only

```tsx
<Textarea disabled label="Disabled" defaultValue="Tidak bisa diubah" />
<Textarea readOnly label="Read Only" defaultValue="Hanya bisa dibaca" />
```

---

## Ukuran & Tinggi

Tinggi default adalah `min-h-30` dan tumbuh mengikuti isi. Karena itu atribut native `rows`
tidak berpengaruh — atur tinggi lewat `className`.

```tsx
<Textarea className="min-h-20" label="Compact" />
<Textarea className="min-h-50" label="Tinggi" />
```

---

## Character Count

```tsx
const [value, setValue] = useState('');

<Textarea
  clearAble
  label="Bio"
  maxLength={120}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  hint={`${value.length}/120 karakter`}
/>;
```

---

## Props

### TextareaProps

| Prop          | Type                        | Default             | Description                                                                 |
| ------------- | --------------------------- | ------------------- | --------------------------------------------------------------------------- |
| label         | string                      | –                   | Label yang tampil di atas textarea                                          |
| description   | string                      | –                   | Teks penjelas di bawah label                                                |
| hint          | string                      | –                   | Teks bantuan kecil di bawah textarea                                        |
| tooltip       | string                      | –                   | Tooltip di samping label                                                    |
| errorMessages | string \| string[]          | –                   | Pesan error, sekaligus mengaktifkan gaya invalid                            |
| required      | boolean                     | false               | Menandai label wajib isi (validasi native tetap dimatikan)                  |
| clearAble     | boolean                     | false               | Tampilkan tombol clear saat nilai tidak kosong                              |
| onClear       | () => void                  | –                   | Dipanggil setelah nilai dikosongkan lewat tombol clear                      |
| clearLabel    | string                      | 'Kosongkan isian'   | Label aksesibilitas & tooltip tombol clear                                  |
| className     | string                      | –                   | Class tambahan untuk wrapper `FormField` dan elemen textarea                |
| ref           | Ref\<HTMLTextAreaElement\>  | –                   | Diteruskan ke elemen `<textarea>` asli                                      |
| ...props      | ComponentProps\<'textarea'\> | –                  | Atribut native: `value`, `defaultValue`, `maxLength`, `placeholder`, `disabled`, `readOnly`, dll. |

---

## Notes

- Tombol clear disembunyikan otomatis saat `disabled`, `readOnly`, atau nilainya kosong.
- Setelah clear, fokus dikembalikan ke textarea.
- `clearAble` menambahkan `pr-10` pada textarea supaya teks tidak tertimpa tombol.
- Atribut `rows` tidak berpengaruh karena tinggi diatur lewat `min-h-*` + `field-sizing-content`.

---

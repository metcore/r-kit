# Dokumentasi

`Text` adalah komponen tipografi dasar untuk UI Kit yang dibangun menggunakan **React** dan **Tailwind CSS**. Komponen ini dirancang fleksibel, konsisten, dan aman untuk digunakan sebagai fondasi seluruh teks dalam aplikasi.

Komponen ini mendukung:

- Variant tipografi
- Weight font
- Warna semantik
- Alignment
- Line clamp (`numberOfLines`)
- Polymorphic element melalui prop `as`

---

## Import

```tsx
import { Text } from "@/components/text";
```

---

## Basic Usage

### Menggunakan `children`

```tsx
<Text>Hello World</Text>
```

### Menggunakan `value`

```tsx
<Text value="Hello World" />
```

> ⚠️ `value` dan `children` **tidak boleh digunakan bersamaan**.

---

## Props

### `as`

Menentukan elemen HTML atau React component yang digunakan.

```tsx
<Text as="h1">Heading</Text>
<Text as="span">Inline text</Text>
```

- Default: `"p"`
- Tipe: `React.ElementType`

---

### `variant`

Menentukan gaya tipografi (ukuran font & line-height).

```ts
type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p1"
  | "p2"
  | "p3"
  | "p4"
  | "t1"
  | "t2"
  | "t3"
  | "t4";
```

Contoh:

```tsx
<Text variant="h1">Heading 1</Text>
<Text variant="p2">Paragraph</Text>
```

> `variant` hanya mengatur **style**, bukan semantic HTML.

---

### `weight`

Menentukan ketebalan font.

```ts
type TextWeight = "regular" | "medium" | "semibold" | "bold";
```

```tsx
<Text weight="bold">Bold text</Text>
```

---

### `color`

Menentukan warna teks berdasarkan **semantic token**.

```tsx
<Text color="primary">Primary text</Text>
<Text color="danger">Danger text</Text>
```

> Daftar warna mengikuti `ColorVariant` yang didefinisikan di sistem UI.

---

### `align`

Menentukan alignment teks.

```ts
type AlignMent = "left" | "center" | "right" | "justify";
```

```tsx
<Text align="center">Centered text</Text>
```

---

### `numberOfLines`

Membatasi jumlah baris teks menggunakan `line-clamp`.

```ts
numberOfLines?: 1 | 2 | 3 | 4;
```

```tsx
<Text numberOfLines={2}>
  Long text that will be clamped into two lines only.
</Text>
```

---

### `className`

Escape hatch untuk menambahkan class Tailwind tambahan.

```tsx
<Text className="tracking-wide uppercase">Custom styled text</Text>
```

---

## Contoh Lengkap

```tsx
<Text
  as="h1"
  variant="h1"
  weight="bold"
  color="primary"
  align="center"
  numberOfLines={1}
>
  Hello Herca Kit!
</Text>
```

---

## Catatan Penting

- `variant` **tidak otomatis menentukan** elemen HTML
- `as` digunakan untuk semantic HTML
- Hindari inline `style`
- Gunakan `className` hanya sebagai escape hatch

---

## Internal Implementation

- Styling menggunakan **CVA (`class-variance-authority`)**
- Penggabungan class menggunakan util `cn`
- Komponen bersifat presentational (tanpa side effect)

---

## Best Practice

- Gunakan `Text` sebagai satu-satunya komponen teks dasar
- Hindari penggunaan langsung `<p>`, `<span>`, `<h*>` di layer UI
- Semua style tipografi sebaiknya melalui `variant` dan `weight`

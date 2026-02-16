# Dokumentasi

Komponen **Checkbox** digunakan untuk memungkinkan user memilih satu atau beberapa opsi.
Komponen ini mendukung penggunaan **standalone (single checkbox)** maupun **group (multiple checkbox)** dengan state terpusat.

---

## Import

```tsx
import { Checkbox, CheckboxGroup } from "@/components/checkbox";
```

---

## Checkbox (Single)

Gunakan `Checkbox` secara **controlled** dengan `checked` dan `onCheckedChange`.

### Basic Usage

```tsx
const [checked, setChecked] = useState(false);

<Checkbox checked={checked} onCheckedChange={setChecked} />;
```

---

### Dengan Label & Description

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  label="Setuju dengan syarat"
  description="Anda harus menyetujui sebelum melanjutkan"
  checked={checked}
  onCheckedChange={setChecked}
/>;
```

---

### Disabled

```tsx
<Checkbox checked disabled />
```

---

### Vertical Layout

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  vertical
  label="Checkbox Vertikal"
  checked={checked}
  onCheckedChange={setChecked}
/>;
```

---

## CheckboxGroup (Multiple)

`CheckboxGroup` digunakan untuk **multiple selection** dan menjadi **state owner** untuk seluruh checkbox di dalamnya.

> ⚠️ **Penting:**  
> `Checkbox` di dalam `CheckboxGroup` **wajib memiliki `value` (string)**.

---

### Basic Group (Uncontrolled)

```tsx
<CheckboxGroup defaultValue={["a"]}>
  <Checkbox value="a" label="Option A" />
  <Checkbox value="b" label="Option B" />
</CheckboxGroup>
```

---

### Controlled Group

```tsx
const [values, setValues] = useState<string[]>([]);

<CheckboxGroup value={values} onValueChange={setValues}>
  <Checkbox value="a" label="Option A" />
  <Checkbox value="b" label="Option B" />
</CheckboxGroup>;
```

---

### Horizontal Group

```tsx
<CheckboxGroup direction="horizontal">
  <Checkbox value="a" label="A" />
  <Checkbox value="b" label="B" />
</CheckboxGroup>
```

---

### Dengan Label, Hint, dan Error

```tsx
const [values, setValues] = useState<string[]>([]);

<CheckboxGroup
  label="Pilih Opsi"
  description="Anda dapat memilih lebih dari satu"
  hint="Minimal satu opsi"
  errorMessages="Wajib memilih minimal satu"
  value={values}
  onValueChange={setValues}
>
  <Checkbox value="a" label="Option A" />
  <Checkbox value="b" label="Option B" />
</CheckboxGroup>;
```

---

## Props

### Checkbox Props

| Prop            | Type                       | Default | Description                       |
| --------------- | -------------------------- | ------- | --------------------------------- |
| checked         | boolean                    | false   | Status checkbox (controlled)      |
| onCheckedChange | (checked: boolean) => void | –       | Callback saat checkbox berubah    |
| value           | string                     | –       | Identifier (wajib di dalam group) |
| disabled        | boolean                    | false   | Nonaktifkan checkbox              |
| required        | boolean                    | false   | Tandai sebagai required           |
| size            | sm \| md \| lg             | md      | Ukuran checkbox                   |
| color           | string                     | primary | Warna checkbox                    |
| icon            | check \| minus             | check   | Icon indikator                    |
| label           | string                     | –       | Label teks                        |
| description     | string                     | –       | Deskripsi                         |
| vertical        | boolean                    | false   | Layout vertikal                   |

---

### CheckboxGroup Props

| Prop          | Type                       | Default  | Description                 |
| ------------- | -------------------------- | -------- | --------------------------- |
| value         | string[]                   | –        | Controlled selected values  |
| defaultValue  | string[]                   | []       | Uncontrolled initial value  |
| onValueChange | (values: string[]) => void | –        | Callback saat nilai berubah |
| direction     | horizontal \| vertical     | vertical | Arah layout                 |
| disabled      | boolean                    | false    | Disable semua checkbox      |
| required      | boolean                    | false    | Required group              |
| name          | string                     | –        | Name untuk form             |
| size          | sm \| md \| lg             | md       | Ukuran                      |
| color         | string                     | primary  | Warna default               |
| icon          | string                     | check    | Icon default                |
| label         | string                     | –        | Label group                 |
| description   | string                     | –        | Deskripsi                   |
| hint          | string                     | –        | Hint                        |
| errorMessages | string \| string[]         | –        | Pesan error                 |

---

## Notes

- Checkbox standalone **harus controlled**
- Checkbox di dalam group **tidak perlu `checked`**
- Checkbox di dalam group **wajib punya `value`**
- Jangan mencampur controlled & uncontrolled

---

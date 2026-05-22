# Dokumentasi

Komponen **Chip** digunakan untuk menampilkan pilihan, filter, tag, atau aksi
ringkas di dalam interface.

---

## Import

```tsx
import { Chip, ChipGroup } from '@/components/chip';
```

---

## Chip

Gunakan `Chip` untuk item tunggal. Properti `selected` dapat dipakai ketika
state dikelola langsung dari parent.

```tsx
<Chip color="primary">Primary</Chip>
<Chip selected color="success">
  Selected
</Chip>
<Chip disabled color="gray">
  Disabled
</Chip>
```

---

## ChipGroup

`ChipGroup` digunakan untuk mengelola pilihan dari beberapa chip.

```tsx
const [selected, setSelected] = useState<ChipValue[]>([]);

<ChipGroup
  options={chipOptions}
  selected={selected}
  onSelect={setSelected}
  multiple
/>;
```

---

## Dismissible

Gunakan `dismissible` untuk chip yang dapat dihapus.

```tsx
<ChipGroup options={chipOptions} dismissible onDismiss={handleDismiss} />
```

---

## Reorderable

Gunakan `reorderable` untuk mengaktifkan drag and drop sederhana pada opsi.

```tsx
<ChipGroup options={chipOptions} reorderable onReorder={setOptions} />
```

---

## Props

### Chip Props

| Prop        | Type                        | Default | Description              |
| ----------- | --------------------------- | ------- | ------------------------ |
| value       | string \| number            | -       | Nilai chip               |
| selected    | boolean                     | false   | Status selected          |
| disabled    | boolean                     | false   | Nonaktifkan chip         |
| color       | ColorVariantType            | primary | Warna chip               |
| size        | sm \| md \| lg              | md      | Ukuran chip              |
| block       | boolean                     | false   | Membuat chip lebar penuh |
| dismissible | boolean                     | false   | Tampilkan tombol hapus   |
| onClick     | (value?: ChipValue) => void | -       | Callback saat diklik     |
| onDismiss   | (value?: ChipValue) => void | -       | Callback saat dihapus    |

### ChipGroup Props

| Prop        | Type                                 | Default    | Description                   |
| ----------- | ------------------------------------ | ---------- | ----------------------------- |
| options     | ChipOptionProps[]                    | -          | Daftar chip                   |
| selected    | ChipValue \| ChipValue[]             | []         | Nilai terpilih                |
| onSelect    | (selected: ChipValue[]) => void      | -          | Callback saat pilihan berubah |
| direction   | horizontal \| vertical               | horizontal | Arah layout                   |
| multiple    | boolean                              | false      | Mengizinkan banyak pilihan    |
| scrollable  | boolean                              | true       | Mengaktifkan overflow         |
| dismissible | boolean                              | false      | Chip dapat dihapus            |
| reorderable | boolean                              | false      | Chip dapat diurutkan ulang    |
| onDismiss   | (value: ChipValue) => void           | -          | Callback saat chip dihapus    |
| onReorder   | (options: ChipOptionProps[]) => void | -          | Callback urutan baru          |

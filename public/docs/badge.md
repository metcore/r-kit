# Dokumentasi

Komponen **Badge** digunakan untuk menampilkan status, label, kategori, atau
nilai pendukung berukuran kecil di dalam interface.

---

## Import

```tsx
import { Badge } from '@herca/r-kit/clients';
```

---

## Badge

Gunakan `Badge` untuk menampilkan label singkat dengan warna semantik.

```tsx
<Badge color="primary">Primary</Badge>
<Badge color="success">Success</Badge>
<Badge color="danger">Danger</Badge>
```

---

## Badge with Icon

Badge dapat berisi icon dan teks. Gunakan `className` untuk mengatur alignment
tambahan bila diperlukan.

```tsx
<Badge color="info" className="flex items-center">
  <Icon name="clock" size={16} /> Info
</Badge>
```

---

## Size

Gunakan prop `size` untuk mengatur ukuran badge.

```tsx
<Badge size="sm" color="primary">
  Badge sm
</Badge>
<Badge size="md" color="danger">
  Badge md
</Badge>
<Badge size="lg" color="success">
  Badge lg
</Badge>
```

---

## Dot Variant

Gunakan `variant="dot"` untuk menampilkan indikator kecil tanpa teks.

```tsx
<Badge variant="dot" color="success" />
<Badge variant="dot" color="danger" size="lg" />
```

---

## Custom Color

Gunakan `hexColor` saat badge membutuhkan warna custom. Warna background akan
dibuat transparan untuk badge default dan solid untuk badge dot.

```tsx
<Badge hexColor="#35858E">#35858E</Badge>
<Badge variant="dot" hexColor="#934761" />
```

---

## Props

### Badge Props

| Prop      | Type                                                                                  | Default | Description                         |
| --------- | ------------------------------------------------------------------------------------- | ------- | ----------------------------------- |
| children  | ReactNode                                                                             | -       | Konten badge                        |
| color     | primary \| secondary \| success \| danger \| warning \| info \| orange \| purple \| gray | primary | Warna semantik badge                |
| size      | sm \| md \| lg                                                                        | md      | Ukuran badge                        |
| variant   | default \| dot                                                                        | default | Bentuk badge                        |
| hexColor  | string                                                                                | -       | Warna custom dalam format hex       |
| className | string                                                                                | -       | Class tambahan untuk wrapper badge  |

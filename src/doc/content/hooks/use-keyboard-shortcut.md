---
title: useKeyboardShortcut
description: Mendaftarkan pintasan papan tik.
group: Hooks
---

## Impor

```tsx
import { useKeyboardShortcut } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
useKeyboardShortcut({
  key: 'k',
  meta: true,
  onTrigger: () => bukaPencarian(),
});
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `—` | `void` | Hook ini tidak mengembalikan apa pun |

## Catatan

Semula dipakai internal oleh `TextEditor`, kini ikut diekspor.

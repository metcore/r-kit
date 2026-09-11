---
title: usePickerState
description: Mengelola keadaan pemilih bermode single, multiple, dan range.
group: Hooks
playground: /playground/month-picker
---

## Impor

```tsx
import { usePickerState } from '@herca/r-kit/clients';
```

## Penggunaan

```tsx
const picker = usePickerState({
  mode: 'range',
  defaultValue: [3, 8],
});
```

## Kembalian

| Nama | Tipe | Keterangan |
| --- | --- | --- |
| `picker` | `keadaan pemilih` | Nilai terpilih beserta fungsi pengubahnya |

## Catatan

Dipakai `MonthPicker`, `YearPicker`, `DayPicker`, dan `DayOfMonthPicker`. Berguna bila kamu membangun pemilih serupa.

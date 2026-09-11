---
title: DndBoard
description: Papan seret-dan-lepas untuk memindahkan item antar kolom.
group: Data Display
playground: /playground/dnd
---

Papan bergaya kanban: item bisa digeser di dalam satu kolom maupun
dipindahkan ke kolom lain.

## Impor

```tsx
import { DndBoard, DndColumn, DndItem } from '@herca/r-kit/clients';
import type { DndItemsRecord } from '@herca/r-kit/clients';
```

## Penggunaan Dasar

Data papan berbentuk objek: kuncinya nama kolom, nilainya larik item.

```tsx
interface Tugas {
  id: string;
  judul: string;
}

const [papan, setPapan] = useState<DndItemsRecord<Tugas>>({
  todo: [{ id: '1', judul: 'Buat wireframe' }],
  progress: [{ id: '2', judul: 'Susun layout' }],
  done: [],
});

<DndBoard items={papan} onItemsChange={setPapan}>
  {Object.entries(papan).map(([kolom, daftar]) => (
    <DndColumn key={kolom} container={kolom}>
      {daftar.map((tugas, index) => (
        <DndItem key={tugas.id} container={kolom} index={index}>
          {tugas.judul}
        </DndItem>
      ))}
    </DndColumn>
  ))}
</DndBoard>;
```

`onItemsChange` dipanggil dengan bentuk papan yang **sudah** diperbarui,
jadi cukup simpan apa adanya.

## Props — DndBoard

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `items` | `DndItemsRecord<T>` | Isi papan per kolom. Wajib |
| `onItemsChange` | `(items) => void` | Dipanggil setelah item berpindah. Wajib |
| `children` | `ReactNode` | Daftar `DndColumn` |

## Props — DndColumn & DndItem

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `container` | `string` | Nama kolom. Wajib pada keduanya |
| `index` | `number` | Posisi item; wajib pada `DndItem` |
| `activeClassName` | `string` | Kelas saat item sedang diseret |

## Catatan

Komponen ini memakai HTML Drag and Drop bawaan peramban, sehingga tidak
berfungsi pada perangkat sentuh. Sediakan cara lain memindahkan item bila
aplikasimu dipakai di ponsel.

Hook `useDndContext` ikut diekspor bila kamu perlu membangun kolom atau
item dengan tampilan sendiri.

# Dokumentasi

Komponen **Drag and Drop** digunakan untuk menyusun ulang item di dalam satu
container atau memindahkan item ke container lain.

---

## Import

```tsx
import { DndBoard, DndColumn, DndItem } from '@/components/dnd';
```

---

## Struktur Dasar

`DndBoard` menyimpan context drag and drop. `DndColumn` menjadi area drop, dan
`DndItem` menjadi item yang dapat diseret.

```tsx
const [items, setItems] = useState({
  todo: [{ id: 'task-1', title: 'Create wireframe' }],
  progress: [],
});

<DndBoard items={items} onItemsChange={setItems}>
  <DndColumn id="todo">
    {items.todo.map((item, index) => (
      <DndItem key={item.id} containerId="todo" index={index}>
        {item.title}
      </DndItem>
    ))}
  </DndColumn>

  <DndColumn id="progress">
    {items.progress.map((item, index) => (
      <DndItem key={item.id} containerId="progress" index={index}>
        {item.title}
      </DndItem>
    ))}
  </DndColumn>
</DndBoard>;
```
Saat item dipindahkan, `onItemsChange` akan menerima susunan record terbaru.

---

## Empty State

`DndColumn` tetap dapat menerima item ketika kosong. Tambahkan empty state di
dalam column agar area drop tetap terlihat.

```tsx
{items.todo.length === 0 && (
  <div className="rounded-lg border border-dashed border-gray-300 p-4">
    Drop item here
  </div>
)}
```

---

## Props

### DndBoard Props

| Prop          | Type                                 | Default | Description                      |
| ------------- | ------------------------------------ | ------- | -------------------------------- |
| items         | Record<string, T[]>                  | -       | Data item per container          |
| onItemsChange | (items: Record<string, T[]>) => void | -       | Callback setelah susunan berubah |
| children      | ReactNode                            | -       | Isi board                        |
| className     | string                               | -       | Class untuk wrapper board        |

### DndColumn Props

| Prop      | Type      | Default | Description             |
| --------- | --------- | ------- | ----------------------- |
| id        | string    | -       | ID container            |
| children  | ReactNode | -       | Isi column              |
| className | string    | -       | Class untuk area column |

### DndItem Props

| Prop            | Type   | Default                                | Description                          |
| --------------- | ------ | -------------------------------------- | ------------------------------------ |
| containerId     | string | -                                      | ID container asal item               |
| index           | number | -                                      | Posisi item dalam container          |
| activeClassName | string | opacity-40 bg-gray-50 border-dashed    | Class saat item sedang diseret       |
| className       | string | -                                      | Class untuk item                     |

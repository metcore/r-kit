---
name: list-item-corners-follow-card-radius
description: ListItem dulu selalu rounded-t-md di tiap baris, bikin sudutnya menonjol keluar lengkung Card pembungkus List/Accordion
metadata:
  type: project
---

`ListItem` dulu menempel `rounded-t-md` ke **semua** baris, tanpa peduli
posisinya. `List` membungkus barisnya dengan `Card` yang `rounded-xl` dan
tanpa `overflow-hidden`, jadi latar baris (`bg-white`/`bg-gray-50` di
varian striped, `bg-primary-50` saat `active`) menonjol keluar lengkung
kartu — paling kentara di `Accordion` yang tertutup karena cuma menyisakan
satu baris header.

Root cause-nya bukan kurang `overflow-hidden`, tapi radius yang dipasang
di posisi yang salah. Sekarang radiusnya mengikuti posisi baris:
`index === 0` → `rounded-t-xl`, `isLast` → `rounded-b-xl`, dan nilainya
disamakan dengan `rounded-xl` milik `Card`. `overflow-hidden` sengaja
tidak dipakai supaya isi baris (menu, tooltip, popover) tidak ikut
terpotong.

Perbaikan ini juga menuntut header `Accordion` jadi komponen sungguhan
(`AccordionHeader`), bukan `<button>` mentah. `List` meng-`cloneElement`
prop `index`/`isLast`/`variant` ke anaknya; kalau anaknya elemen DOM,
prop itu bocor ke DOM (peringatan React) dan `ListItem` di dalamnya tidak
pernah tahu posisinya — lihat [[api-table-outer-border-must-stay-md-scoped]]
untuk kasus sejenis soal border pembungkus yang dobel.

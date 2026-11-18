---
name: dropdown-content-z-index-override
description: Jangan oper class z-* rendah ke DropdownContent — tailwind-merge nimpa z-99999 bawaannya, sehingga dropdown ketutup overlay Modal (z-[999])
metadata:
  type: project
---

`DropdownContent` (`src/components/dropdown/dropdown.tsx`) punya `z-99999`
bawaan dan nge-merge `className` lewat `cn()` (tailwind-merge). Jadi class
`z-*` apa pun yang dioper pemanggil **menggantikan** z-index itu, bukan
nambahin. `DatePicker` dulu ngoper `z-99`. Karena Radix nge-portal content
ke `document.body`, content itu bersaing langsung sama overlay `Modal`
(`z-[999]`), jadi kalendernya kerender di belakang modal. Gejalanya:
"dropdown gak muncul" di dalam modal, padahal di luar modal normal.

**Why:** class z-index rendah itu kelihatan gak berbahaya waktu ditulis
(di halaman biasa memang gak ada efeknya), dan baru ketahuan waktu
komponennya dipasang di dalam overlay.

**How to apply:** jangan oper `z-*` ke `DropdownContent` kecuali nilainya
lebih tinggi dari `z-[999]` (Modal), `z-1000` (preview lampiran), dan
`z-[1001]` (toast). Kalau ada laporan "popup gak muncul di dalam modal",
cek dulu override z-index di call site-nya. Editor teks (`text-editor/partials/*`)
masih ngoper `z-30` ke `DropdownContent`, jadi masalah yang sama kemungkinan
kena di sana juga kalau `TextEditor` dipasang di dalam `Modal`.

---
name: tiptap-drops-unknown-html
description: setContent di TextEditor membuang atribut/tag yang tidak ada di skema Tiptap — style di td, mark, div hilang setelah keluar mode kode; atribut yang disimpan juga ikut ter-render ke DOM editor (onclick = XSS)
metadata:
  type: project
---

Mode kode TextEditor mengisi ulang editor lewat `editor.commands.setContent(html)`.
Tiptap cuma menyimpan node, mark, dan atribut yang terdaftar di skema. Yang
tidak terdaftar dibuang diam-diam: `style` di `<td>`/`<th>`/`<strong>`/`<em>`,
`<div>` (cuma isinya yang tersisa), dan `<style>`.

Sebaliknya, apa pun yang didaftarkan di `PreserveAttributes`
(`extension/preserve-attributes.ts`) ikut di-render ke DOM contenteditable.
Dulu `onclick` ada di daftar itu, sehingga HTML tempelan bisa menjalankan
script di browser orang yang sedang mengedit.

Perbaikannya: tipe node/mark ditambahkan ke `types` di PreserveAttributes,
`<div>` punya node sendiri (`extension/div-node.ts`), `onclick` dihapus, dan
`button-node` membuang semua atribut `on*`.

**Why:** gejala "style hilang" dan celah XSS sama-sama berasal dari daftar
atribut di skema, dan dua-duanya tidak kelihatan dari mode visual.

**How to apply:** kalau ada laporan HTML/atribut hilang di TextEditor, cek
dulu apakah tipe node/mark-nya ada di `types` PreserveAttributes. Jangan
pernah menambahkan atribut event (`on*`) atau URL yang bisa berisi
`javascript:` ke daftar itu. Uji round-trip lewat `setContent` lalu
`getHTML`, bukan cuma lihat tampilan.

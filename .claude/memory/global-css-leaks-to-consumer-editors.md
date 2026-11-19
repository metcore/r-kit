---
name: global-css-leaks-to-consumer-editors
description: CSS di src/css/*.css ikut ke dist/index.css dan global di app consumer — selector library pihak ketiga (.ProseMirror, .tiptap) bakal kena ke editor milik app juga, bukan cuma TextEditor r-kit
metadata:
  type: project
---

`src/index.css` meng-import `src/css/text-editor.css` dan hasilnya dibundel ke
`dist/index.css`, yang di-import global di app consumer. Dulu file itu punya
`.ProseMirror { height: var(--editor-height, 100px); }`. `--editor-height`
cuma di-set oleh `TextEditor` r-kit (lewat `style` di `EditorContent`), jadi
editor Tiptap lain di app (misalnya editor legacy di HRIS) jatuh ke fallback
100px. Akibatnya isinya meluber keluar kotak dan menimpa elemen di bawahnya.

Fix-nya: rule itu dipindah ke className `EditorContent` sebagai
`*:h-(--editor-height)` di `text-editor.tsx`, jadi cuma kena ke anak langsung
wrapper r-kit.

**Why:** selector seperti `.ProseMirror`/`.tiptap` adalah class bawaan library,
bukan milik r-kit. App consumer yang pakai Tiptap sendiri punya elemen dengan
class yang sama. Bug-nya nggak kelihatan di playground r-kit, karena di sana
semua editor adalah `TextEditor` r-kit.

**How to apply:** jangan tulis rule yang mengubah layout (height, padding,
dll.) pada selector library pihak ketiga di `src/css/*.css` tanpa scope ke
wrapper milik r-kit. Lebih baik pakai class Tailwind di komponen (`*:`,
`[&_.ProseMirror]:`). Kebocoran sejenis yang masih ada: variabel `:root`
generik (`--black`, `--white`, `--gray-1..3`, `--purple`, `--text-*`) dan
semua rule `.tiptap ...` di `text-editor.css`.

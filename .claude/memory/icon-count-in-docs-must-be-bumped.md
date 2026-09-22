---
name: icon-count-in-docs-must-be-bumped
description: Nambah/hapus ikon wajib bump angka jumlah ikon yang di-hardcode di icon.md (3 tempat) dan tabel di 01-introduction.md
metadata:
  type: project
---

Jumlah ikon ditulis manual di dua file doc, bukan dihitung dari
`iconRegistry`: `src/doc/content/components/icon.md` (frontmatter
`description`, kalimat "Kit membawa **N ikon**", dan catatan penutup
"Daftar lengkap N ikon") plus baris `| Ikon | N |` di
`src/doc/content/getting-started/01-introduction.md`. Tiap nambah atau
hapus ikon, angkanya harus di-bump — checklist
[[syncing-component-touchpoints]] gak nyebut ini, dan lint/typecheck gak
bisa nangkepnya, jadi angkanya pernah basi sendiri (doc bilang 402
padahal registry udah 403).

Halaman playground Icon aman: `IconPage.tsx` bikin daftarnya dari
`Object.keys(iconRegistry)`, jadi ikon baru langsung muncul dan
kecari tanpa diedit.

Ikon baru juga harus didaftarin di `icon-registry.ts` (import + entry
key kebab-case) — file di `icons/` yang gak didaftarin gak akan pernah
kepanggil `<Icon name=...>` (`Text.tsx` contohnya, nyangkut gak
kedaftar).

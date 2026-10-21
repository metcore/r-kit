---
name: format-bytes-with-format-file-size
description: Jangan format byte dengan pembagian manual /1024/1024 + toFixed; pakai formatFileSize dari src/lib/utils.ts
metadata:
  type: project
---

Semua tampilan ukuran file lewat `formatFileSize` di `src/lib/utils.ts`
(direkspor ulang dari `components/file-view` supaya entrypoint `/clients`
tetap punya nama itu). Jangan bikin `(bytes / 1024 / 1024).toFixed(2)` +
`' MB'` di tempat baru — satuannya ikut besaran nilainya, jadi nilai
kecil tidak dipaksa jadi `0.00 MB`.

**Why:** 2026-09-26 — preview `InputFile` menghitung MB sendiri, sehingga
lampiran 178 byte tampil `0.00 MB` dan terbaca seperti file rusak. Pesan
error `maxSize` di `use-input-file.ts` punya bug yang sama: `maxSize`
500 KB tertulis "melebihi ukuran maksimal 0.49 MB".

**How to apply:** `formatFileSize(bytes)` — 178 -> `178 B`, 348160 ->
`340 KB`, 5242880 -> `5 MB`. Pre-commit hook `byte-format` di
`lefthook.yml` menolak pembagian `/ 1024 / 1024` yang baru. Catatan:
`formatFileSize(0)` mengembalikan `'0 MB'` (perilaku lama yang
dipertahankan), bukan `'0 B'`.

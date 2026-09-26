---
name: public-value-adapter-drops-fields
description: Adapter `value` publik -> internal yang cuma nyalin sebagian field bikin fitur UI mati tanpa error; cek adapternya dulu sebelum nyalahin komponen presentasinya
metadata:
  type: project
---

Komponen yang punya lapisan adapter antara `value` publik dan state
internal (`toInternalValue` di `input-file/public-value.ts`) harus nyalin
SEMUA field yang dipakai lapisan presentasi. Field yang lupa diteruskan
tidak menimbulkan error, tidak kena typecheck, dan tidak kena lint —
UI-nya cuma diam-diam kehilangan satu bagian. Kalau ada informasi yang
"ada di data tapi gak nampil", telusuri adapternya lebih dulu, bukan
komponen yang me-render.

**Why:** 2026-09-26 — ukuran file tidak pernah tampil untuk lampiran yang
sudah tersimpan di server. `RemoteFile.size` dan `normalizeEntry` sudah
siap menerima size sejak awal, tapi `toInternalValue` hanya menyusun
`{ id, url, name }`, jadi jalurnya terputus persis di satu tempat itu dan
tidak ada gejala selain barisnya hilang. Akibatnya consumer bikin
workaround sendiri: ERP menambah route `/api/file-size` + hook
`useFileSize` di `src/utils/ticket-attachments.ts` untuk menghitung
ukuran di luar komponen.

**How to apply:** tiap nambah field di `UploadFileEntry` (atau bentuk
`value` publik komponen lain), langsung ikut sisipkan di adapternya dan
buka satu section playground yang benar-benar mengirim field itu — bukan
cuma nambah tipe. Ukuran file remote tidak pernah diukur komponen sendiri
(tidak ada `HEAD`/`Content-Length`), jadi `size` wajib datang dari
`value`, dalam byte.

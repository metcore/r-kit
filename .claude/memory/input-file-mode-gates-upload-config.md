---
name: input-file-mode-gates-upload-config
description: InputFile (versi typed) membuang uploadConfig kalau mode bukan 'uploadFile' — komponen internal yang butuh upload pakai InputFileRaw; accept wajib dicek di processFiles, bukan cuma di handleDrop
metadata:
  type: project
---

`InputFile` di `input-file-typed.tsx` default-nya `mode = 'file'` dan
meneruskan `uploadConfig` ke hook hanya kalau `mode === 'uploadFile'`.
Modal sisip gambar di TextEditor dulu memakai `InputFile` dengan
`uploadConfig` tanpa `mode`, jadi upload gambar tidak pernah jalan dan
`onUploadSuccess` tidak pernah dipanggil. Sekarang modal itu memakai
`InputFileRaw`, yang menerima `FileItem[]` dan `uploadConfig` langsung.

Di hook yang sama, `accept` dulu cuma dicek di `handleDrop`. Pilih "All
files" di dialog, isi `input.files` lewat script, atau tombol ganti berkas
melewati cek itu. Sekarang cek ada di `processFiles` (semua jalur masuk)
dan di `handleReplace`.

**Why:** error tipe di `modal-insert-image.tsx` sudah lama ada dan
menunjukkan pemakaian API lama, tapi tidak kelihatan karena tidak ada
pesan error saat runtime.

**How to apply:** komponen internal r-kit yang mengelola `FileItem[]`
sendiri pakai `InputFileRaw`. Validasi berkas baru ditaruh di
`processFiles`, bukan di handler per jalur. Atribut `accept` di `<input>`
cuma saran untuk dialog, bukan validasi.

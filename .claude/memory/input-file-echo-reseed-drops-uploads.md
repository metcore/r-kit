---
name: input-file-echo-reseed-drops-uploads
description: InputFile mode uploadFile multiple cuma nyimpen satu file karena efek re-seed ikut jalan waktu value-nya gema dari emisi komponen sendiri
metadata:
  type: project
---

Di `input-file-typed.tsx`, efek yang nge-seed ulang `items` dari prop `value`
gak bisa bedain "value berubah dari luar" vs "value balik lagi karena emisi
komponen ini sendiri". Di `mode="uploadFile"` + `multiple` itu fatal:
`toUploadedValue` cuma ngeluarin file yang URL-nya sudah ada, jadi begitu
file pertama selesai upload, komponen emit `[file1]`, parent nulis balik
`[file1]`, efek re-seed jalan, dan `items` diganti jadi cuma entry remote
itu — file lain yang masih uploading ikut kebuang dari state. Upload-nya
tetap jalan sampai selesai, tapi hasilnya ditolak di `xhr.onload` karena
`filesRef.current.find(f => f.id === id)` sudah gak ketemu.

Gejalanya: pilih 3 file, ketiganya beneran kekirim ke CDN, tapi yang
kesimpan cuma satu — yaitu yang **uploadnya selesai duluan** (bukan yang
pertama dipilih), jadi kelihatannya random/"yang terakhir".

Fix-nya: bandingin `signatureOfSeededItems(value)` dengan
`emittedSignatureRef.current`; kalau sama berarti gema sendiri → `return`
sebelum `setItems`. Perubahan `value` yang beneran dari luar (reset form,
data server) tetap nge-seed ulang seperti biasa.

Pelajaran umum: tiap efek "sinkronkan state dari prop value" di komponen
controlled yang juga nge-emit value harus punya penjaga gema, apalagi kalau
nilai yang diemit itu **subset** dari state internal (di sini: file yang
belum punya URL gak pernah ikut diemit).

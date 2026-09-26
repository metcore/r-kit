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

## Sisi kedua dari handshake yang sama (2026-09-26)

Dua efek itu — efek seed dan efek emit — jalan di **satu commit yang sama**,
berurutan. Efek seed nulis `emittedSignatureRef = seededSignature` lalu
`setItems`, tapi `items` baru berubah di render berikutnya; `nextSignature`
yang dipegang efek emit di commit itu masih dihitung dari daftar SEBELUM
seed. Akibatnya perbandingannya mismatch dan efek emit ikut nyala dengan
daftar basi.

Gejalanya: `value` yang datang belakangan (mis. `reset()` setelah data detail
selesai di-fetch) bikin komponen emit `onChange([])` dulu. Parent nulis `[]`,
`publicIds` jadi kosong, dan emisi berikutnya ngirim file lama dengan
`id: null` → backend nganggepnya file baru. Yang lebih jahat: id-nya gak
balik sendiri — semua aksi user sesudahnya ikut ngirim `id: null`. Form yang
baru dirender SETELAH prefill selesai gak kena, karena `value`-nya sudah
final sejak mount.

Fix-nya `pendingSeedRef`: efek seed nandain "seed baru dipasang", efek emit
ngelewatin tepat satu commit. Perubahan yang datang dari `onChange` komponen
sendiri gak kena penandaan itu, jadi upload yang sedang jalan tetap aman.

Pelajaran umum: tiap efek "sinkronkan state dari prop value" di komponen
controlled yang juga nge-emit value harus punya penjaga gema, apalagi kalau
nilai yang diemit itu **subset** dari state internal (di sini: file yang
belum punya URL gak pernah ikut diemit). Dan kalau dua efek saling baca-tulis
satu ref penanda, ingat keduanya jalan di commit yang sama sementara state
yang mereka bandingkan baru ikut di render berikutnya — nilai turunan yang
dipegang efek kedua sudah basi saat itu.

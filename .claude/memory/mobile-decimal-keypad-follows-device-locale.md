---
name: mobile-decimal-keypad-follows-device-locale
description: Keypad inputMode="decimal" di HP cuma punya pemisah desimal sesuai bahasa perangkat — input angka berformat ID (titik = ribuan) jadi tidak bisa diketik desimalnya di HP berbahasa Inggris kalau `.` dibuang
metadata:
  type: project
---

Keypad `inputMode="decimal"` di iOS/Android menampilkan **satu** tombol
pemisah desimal, dan tombolnya ikut bahasa perangkat, bukan format yang
dipakai komponen. HP berbahasa Inggris cuma punya `.`. Di `InputNumber`
(format ID: `.` ribuan, `,` desimal), `.` dulu dianggap pemisah ribuan dan
dibuang, jadi user di HP itu sama sekali tidak bisa mengetik desimal.
Tidak kelihatan saat dites di desktop, karena keyboard fisik punya
dua-duanya.

**Why:** ketemu waktu review kestabilan `InputNumber` (2026-11-25), sebelum
sempat dirilis.

**How to apply:** komponen angka yang memformat ribuan sendiri harus
menganggap satu karakter `.`/`,` yang **baru diketik** sebagai pemisah
desimal. Ini aman karena pemisah ribuan selalu disisipkan otomatis dan tidak
pernah diketik manual. Lihat `coerceTypedDecimal` di
`src/components/input/input-number-helpers.ts`. Paste beda kasus: teks
tempelan memang bisa berisi pemisah ribuan, jadi tebak dari posisinya
(`normalizePasted`). Kalau bikin input angka berformat lain, cek di HP
berbahasa Inggris maupun Indonesia, bukan cuma di desktop. Lihat juga
[[node-test-lives-outside-src]].

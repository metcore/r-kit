---
name: catch-bug-and-learn
description: Whenever a non-obvious bug is found and fixed in this repo, capture the root cause as a new or updated memory entry instead of just fixing it silently
metadata:
  type: project
---

Kalau nemu bug yang non-obvious (bukan typo/lint-level) — entah dilaporkan
user atau ketemu sendiri pas kerja — jangan cuma difix terus lanjut. Tulis
atau update satu entry di `.claude/memory/` yang jelasin root cause-nya,
biar kesalahan yang sama gak keulang di sesi lain/device lain.

**Why:** user minta supaya proses "nemu bug → belajar dari root cause-nya"
itu ninggalin jejak permanen di repo (bukan cuma di riwayat chat yang gak
kebaca sesi berikutnya), sama kayak konvensi/keputusan lain yang udah
ditaruh di `.claude/memory/`.

**How to apply:** setelah bug beneran kefix dan diverifikasi, sebelum lapor
kelar — tulis entry baru (`.claude/memory/<slug>.md`, frontmatter
`type: project`) atau update entry yang udah ada kalau bug-nya masih
serumpun. Isinya fokus ke **root cause** (kenapa bug itu bisa terjadi) dan
**cara ngenalinya di masa depan**, bukan narasi ulang langkah debug. Tambah
satu baris pointer di [MEMORY.md](../MEMORY.md). Bug sepele (typo, lint,
off-by-one yang jelas dari diff) gak perlu entry — ini buat bug yang
penyebabnya gak kebaca langsung dari kode.

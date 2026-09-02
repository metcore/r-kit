---
name: scan-skills-before-finishing
description: Before reporting any task in this repo as done, scan every available skill for relevance and actually apply the ones that match — no excuses for skipping one
metadata:
  type: project
---

Sebelum bilang kerjaan kelar (lapor hasil, commit, atau pindah ke task
lain), scan semua skill yang ada dan cek satu-satu: relevan gak buat
perubahan yang barusan dibikin? Kalau relevan, PAKAI — jangan cuma
diinget doang terus kelewatan pas eksekusi.

**Why:** user (2026-09-02) eksplisit bilang gak mau denger alasan apa
pun ("mau lupa mau apa") soal skill yang kelewat — kejadian nyata:
`syncing-component-touchpoints` (skill sendiri, udah ada di
`.claude/skills/`) kelewat dipakai pas selesai ngerjain fix ApiTable,
jadinya doc `api-table.md` telat di-update dan baru ketauan gara-gara
user nanya. Ini bukan soal skill-nya gak ada — skill-nya ADA, cuma gak
di-cek ulang sebelum declare selesai.

**How to apply:** sebelum kalimat "selesai"/"udah kelar"/commit apa pun,
jalanin checklist singkat: apa aja skill yang match sama jenis
perubahan ini (`.claude/skills/*/SKILL.md` — cek nama & description-nya
satu-satu, bukan cuma yang keinget doang)? Kalau ada yang match
(`syncing-component-touchpoints` buat perubahan komponen,
`catch-bug-and-learn` buat bug yang kefix, dst), APPLY dulu sebelum
lapor selesai — bukan sesudahnya, bukan pas ditanya user.

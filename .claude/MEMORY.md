# Project Memory Index (r-kit)

Catatan akumulasi soal repo ini — konvensi, keputusan, hal non-obvious yang
gak kebaca langsung dari kode. Beda dari memory personal Claude yang privat
per-device: ini ikut di-commit, jadi kepakai siapa pun (device/agent lain)
yang buka repo ini. Baca file yang relevan sebelum ngerjain task yang match.

Format tiap file: frontmatter (`name`, `description`, `metadata.type`) +
isi. `metadata.type: project` = fakta/konvensi soal codebase ini.

- [Use caveman-commit](memory/use-caveman-commit.md) — semua commit message lewat skill caveman-commit, tanpa trailer Co-Authored-By/AI attribution
- [Catch bug and learn](memory/catch-bug-and-learn.md) — bug non-obvious yang kefix wajib jadi entry memory baru (root cause), bukan cuma difix diem-diem
- [.claude/ breaks typed lint](memory/dot-claude-breaks-typed-lint.md) — file js/ts di bawah .claude/ ke-lint pakai rule typed yang butuh tsconfig project, bikin pre-commit hook crash; eslint.config.ts udah exclude .claude/, jangan dihapus

## Cara nambah entri baru

1. Tulis file baru di `.claude/memory/<slug-kebab-case>.md` dengan frontmatter yang sama
2. Tambah satu baris pointer di index atas
3. Kalau faktanya cuma soal preferensi kerja personal (bukan soal codebase-nya), taruh di memory privat Claude, bukan di sini

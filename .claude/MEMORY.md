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
- [Table cell className butuh prop responsive](memory/table-cell-classnames-need-responsive-prop.md) — className kolom `max-md:flex`/`col-span-*`/`col-start-*` di ApiTable cuma valid kalau `responsive` di-set di tabelnya juga, kalau enggak border antar-td jadi gak sejajar di bawah breakpoint md
- [Flex min-width blokir overflow scroll](memory/flex-min-width-blocks-overflow-scroll.md) — `overflow-x-auto` bisa diam-diam gak pernah aktif (layout malah tumbuh ngelewatin viewport) kalau ada ancestor flex item di antaranya yang gak punya `min-w-0`; jangan curigain wrapper overflow-nya duluan, telusuri ancestor chain-nya
- [Border outer ApiTable harus scoped md:](memory/api-table-outer-border-must-stay-md-scoped.md) — border/rounded card di wrapper luar ApiTable cuma boleh nyala di `md:` ke atas kalau `responsive` true, kalau enggak border itu numpuk sama border per-row-card di mobile
- [Scan skill sebelum lapor selesai](memory/scan-skills-before-finishing.md) — sebelum bilang kerjaan kelar, cek satu-satu semua skill yang ada relevan gak, jangan cuma andelin ingatan — user gak mau denger alasan lagi soal skill yang kelewat
- [ApiTable scroll wrapper harus unconditional](memory/api-table-scroll-must-be-unconditional.md) — `overflow-x-auto` pembungkus Table gak boleh digantung ke prop `responsive`, karena mode itu cuma ganti layout di bawah `md`, tetap bisa overflow horizontal di `md` ke atas

## Cara nambah entri baru

1. Tulis file baru di `.claude/memory/<slug-kebab-case>.md` dengan frontmatter yang sama
2. Tambah satu baris pointer di index atas
3. Kalau faktanya cuma soal preferensi kerja personal (bukan soal codebase-nya), taruh di memory privat Claude, bukan di sini

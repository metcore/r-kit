# Desain: Halaman `/docs` r-kit

Tanggal: 2026-08-22
Status: disetujui, siap masuk rencana implementasi

## Ringkasan

`/docs` dibangun sebagai situs panduan bergaya Tailwind CSS: dimulai dari
Get Started, dilanjutkan konsep inti dan panduan praktis, lalu referensi
lengkap untuk seluruh komponen kit.

Seluruh konten ditulis sebagai berkas markdown. Kode TSX hanya menjadi
cangkang: sidebar, daftar isi, prev/next, dan pencarian.

## Keadaan awal

- `src/doc/pages/HomePage.tsx` mengembalikan `<> d</>`.
- `src/router/DocRouter.tsx` hanya punya rute `index`.
- `src/doc/components/DocSidebar.tsx` adalah salinan basi sidebar
  playground: berlabel "Playground", path tanpa prefiks `/docs`, dan
  strukturnya katalog komponen alih-alih panduan. Akan ditulis ulang.
- `public/docs/*.md` berisi 10 berkas referensi komponen. Isinya usang:
  memakai `onCheckedChange` yang kini `@deprecated` dan import
  `@/components/checkbox` yang tidak pernah valid bagi konsumen paket.
- `src/playground/hooks/useMarkdown.ts` dan
  `src/playground/components/MarkdownRenderer.tsx` masih ada dan dipakai
  sebagai titik awal.

## Keputusan yang sudah diambil

| Topik | Keputusan |
| --- | --- |
| Sumber konten | Markdown; TSX hanya cangkang |
| Cakupan | Guide lengkap + referensi seluruh komponen |
| Bahasa | Indonesia saja |
| Fitur cangkang | Daftar isi, prev/next, pencarian ⌘K, tombol salin kode |
| Pemuatan markdown | `import.meta.glob` saat build |
| Tabel props | Ditulis tangan |

### Catatan atas keputusan tabel props

Risiko basi sudah disampaikan dan diterima. Sebagai peredam, setiap tabel
props ditulis **setelah membaca tipe aslinya di kode**, bukan dari ingatan.
Yang dikorbankan adalah sinkronisasi ke depan, bukan akurasi saat ditulis.

Tiga bentuk props di kit ini perlu perhatian ekstra saat menulis tabel:

- `ButtonProps` adalah union `ButtonAsButtonProps | ButtonAsAnchorProps`.
- 10 komponen menarik props dari `cva` lewat `VariantProps<typeof …>`.
- 27 komponen mendefinisikan props inline di `.tsx`, bukan di file tipe.

## Arsitektur

### Struktur konten

```
src/doc/content/
  getting-started/
    01-introduction.md
    02-installation.md
    03-quick-start.md
  concepts/
    01-entry-points.md
    02-styling.md
    03-colors.md
    04-variants.md
    05-composition.md
  recipes/
    01-form.md
    02-app-layout.md
    03-api-table.md
  components/
    <satu berkas per komponen>
  hooks/
    use-copy.md
    use-mobile.md
    use-is-mac.md
```

Markdown lama di `public/docs/` dipindahkan ke `src/doc/content/components/`
dan diperbaiki isinya, bukan disalin apa adanya.

### Frontmatter

```markdown
---
title: Button
description: Menjalankan aksi atau berpindah halaman.
group: Components
playground: /playground/button
---
```

- `title` — judul halaman, dipakai sidebar, `<h1>`, dan hasil pencarian.
- `description` — satu kalimat, muncul di bawah judul dan di hasil pencarian.
- `group` — menentukan pengelompokan di sidebar. Nilainya terbatas pada
  daftar tetap di bawah.
- `playground` — opsional. Bila ada, kepala halaman menampilkan tautan
  "Lihat demo" ke halaman playground terkait.

Nama berkas dikurangi awalan angka menjadi slug. `02-installation.md`
menjadi `/docs/installation`. Awalan angka hanya mengatur urutan dan tidak
muncul di URL. Slug wajib unik di seluruh konten.

### Nama grup sidebar

Nilai `group` dibatasi pada sembilan nilai berikut, dan sidebar
menampilkannya persis dalam urutan ini:

`Memulai`, `Konsep Inti`, `Panduan`, `Foundation`, `Form`, `Components`,
`Navigation`, `Feedback`, `Data Display`, `Hooks`.

Enam nama terakhir sengaja mengikuti penamaan grup yang sudah dipakai
sidebar playground, supaya pemakai menemukan komponen di tempat yang sama
pada kedua situs.

### Urutan di dalam grup

- Berkas berawalan angka (`getting-started/`, `concepts/`, `recipes/`)
  diurutkan menurut angka tersebut.
- Berkas tanpa awalan angka (`components/`, `hooks/`) diurutkan alfabetis
  menurut `title`.

`content.ts` menurunkan `order` dari awalan angka bila ada, dan dari posisi
alfabetis bila tidak ada.

### Modul cangkang

| Modul | Tanggung jawab |
| --- | --- |
| `src/doc/lib/content.ts` | `import.meta.glob` seluruh `.md`, parse frontmatter, urutkan. Menghasilkan `DocEntry[]`. Satu-satunya sumber untuk sidebar, pencarian, prev/next, dan isi halaman |
| `src/doc/lib/toc.ts` | Ekstrak heading `##` dan `###` dari markdown menjadi daftar anchor |
| `src/doc/components/DocSidebar.tsx` | Navigasi kiri, dibangun dari `content.ts`. Ditulis ulang dari nol |
| `src/doc/components/DocToc.tsx` | Kolom "Di halaman ini" dengan penyorotan mengikuti scroll |
| `src/doc/components/DocPager.tsx` | Tautan sebelumnya/berikutnya mengikuti urutan `content.ts` |
| `src/doc/pages/DocPage.tsx` | Merender satu `DocEntry` lewat `MarkdownRenderer` |
| `src/doc/pages/NotFoundPage.tsx` | Slug tidak dikenal |
| `src/doc/layouts/DocLayout.tsx` | Tata letak tiga kolom: sidebar, konten, daftar isi |

### Tipe data

```ts
type DocGroup =
  | 'Memulai'
  | 'Konsep Inti'
  | 'Panduan'
  | 'Foundation'
  | 'Form'
  | 'Components'
  | 'Navigation'
  | 'Feedback'
  | 'Data Display'
  | 'Hooks';

interface DocEntry {
  slug: string;        // 'installation'
  title: string;
  description: string;
  group: DocGroup;
  playground?: string; // '/playground/button'
  order: number;       // awalan angka bila ada, selain itu posisi alfabetis
  body: string;        // markdown mentah tanpa frontmatter
}

interface TocItem {
  id: string;          // anchor, hasil slugify teks heading
  text: string;
  level: 2 | 3;
}
```

### Rute

| Path | Isi |
| --- | --- |
| `/docs` | Halaman Introduction |
| `/docs/:slug` | `DocEntry` dengan slug tersebut |
| `/docs/*` (tak dikenal) | NotFoundPage |

### Pencarian ⌘K

`src/landing/components/CommandPalette.tsx` saat ini mengunci sumber datanya
ke `componentCategories` dan `navItems` dari `landing/data/site`. Komponen
itu ditambahi prop opsional `items`; nilai bawaannya tetap data landing
sehingga halaman landing tidak berubah perilaku. Docs mengirim indeksnya
sendiri yang dibangun dari `content.ts` berisi judul, deskripsi, dan
heading tiap halaman.

## Dua pelajaran dari playground yang dibawa sejak awal

Keduanya ditemukan dan diperbaiki saat merombak playground, dan berlaku
sama untuk docs:

1. **Kontainer scroll berbatas tinggi.** Header memakai `position: sticky`,
   yang menempel pada scrollport terdekat. Bila halaman di-scroll oleh
   window, scroll-lock milik Radix — `body { overflow: hidden }` saat
   dropdown atau modal terbuka — mengubah konteks itu dan header ikut
   tergulung hilang. `DocLayout` memakai `h-svh min-h-0` pada pembungkus
   dan `overflow-auto` pada kolom konten sejak awal, sehingga header
   berada di luar area yang di-scroll.

2. **Reset scroll saat pindah halaman.** Karena yang men-scroll adalah
   kontainer dalam, React Router tidak dapat memulihkan posisinya sendiri.
   `DocLayout` mereset `scrollTop` kolom konten setiap `pathname` berubah.

## Peta konten

### Memulai (3)

| Slug | Isi |
| --- | --- |
| `introduction` | Apa itu r-kit, untuk siapa, apa isinya, hubungan docs dengan playground |
| `installation` | Pemasangan via npm/pnpm/yarn/bun, peer dependency React 19 dan Tailwind v4, impor `@herca/r-kit/style`, catatan TypeScript |
| `quick-start` | Membangun layar pertama memakai Button, Input, dan Card |

### Konsep Inti (5)

| Slug | Isi |
| --- | --- |
| `entry-points` | `@herca/r-kit` (15 komponen sederhana) versus `@herca/r-kit/clients` (41 komponen interaktif), alasan pemisahan, cara memilih |
| `styling` | `cn`, tailwind-merge, cara menimpa kelas bawaan, kapan `className` menang |
| `colors` | Tipe `BaseColor`, palet, prop `color` yang konsisten di seluruh komponen |
| `variants` | Pola `variant` dan `size` yang berulang, serta `cva` di baliknya |
| `composition` | `asChild` dan Radix Slot, contoh membungkus `Link` router |

### Panduan (3)

| Slug | Isi |
| --- | --- |
| `form` | Form utuh: label, `hint`, `errorMessages`, pola validasi |
| `app-layout` | `SidebarProvider` + `Header` + `SidebarInset`. **Memuat jebakan sticky versus scroll-lock di atas** — inilah bagian yang paling menyelamatkan pemakai |
| `api-table` | Tabel dengan data dari API, paginasi, dan pengaturan kolom |

### Referensi komponen (56)

Dari `@herca/r-kit` — 15 komponen:
badge, card, hero, icons, loading, text, avatar, code-block, indicator,
brand-logo, kbd, breadcrumbs, timeline, list, devider.

Dari `@herca/r-kit/clients` — 41 komponen:
alert, accordion, checkbox, chip, collapsible, file-view, sidebar, sheet,
tooltip, modal, input-file, counter, input-otp, dropdown, input, table,
date-picker, textarea, switch, toast, form, select, slider, tabs,
button-group, button, button-icon, calendar, text-editor, progress-bar,
radio, dnd, input-group, api-table, collor-picker, time-picker,
year-picker, month-picker, day-picker, day-of-month-picker, drawing.

Catatan: direktori `collor-picker` salah eja, tetapi simbol yang diekspor
adalah `ColorInput` sehingga salah eja itu tidak terlihat oleh konsumen.
Docs menulis `import { ColorInput } from '@herca/r-kit/clients'`.

### Empat komponen yang tidak dapat diimpor konsumen

Diverifikasi dengan menyuruh TypeScript me-resolve setiap simbol dari
`src/index.ts` dan `src/clients.ts`. Empat simbol berikut ada di dalam kit
tetapi **tidak terjangkau** dari entry point mana pun:

| Simbol | Sebab |
| --- | --- |
| `ProgressBar` | `progress-bar.tsx` memakai `export default`, sedangkan `index.ts`-nya memakai `export *` yang tidak meneruskan default export |
| `Toast` (kartu) | Sama: `toast-card.tsx` hanya punya default export |
| `Image` dan `cloudinaryLoader` | `src/components/image` tidak pernah di-re-export dari `index.ts` maupun `clients.ts` |
| `iconRegistry` | `icons/index.tsx` hanya meneruskan `Icon` dan tipe `IconNameProps` |

Selain itu `src/components/header` dan `src/components/caraousel` juga tidak
diekspor. `Header` dipakai internal oleh playground, sehingga panduan
`app-layout` **tidak boleh** menyuruh konsumen mengimpornya.

Ini cacat pengemasan di paket yang sudah rilis, dan tidak diperbaiki oleh
pekerjaan docs. Perlakuan di docs:

- Komponen yang tidak terjangkau tetap mendapat halaman, tetapi bagian
  Impor menyatakan terus terang bahwa komponen itu belum diekspor dan
  saat ini hanya dipakai internal.
- Panduan `app-layout` menyusun contohnya dari komponen yang benar-benar
  diekspor, dan menyebut `Header` hanya sebagai catatan.

Dengan begitu jumlah halaman referensi komponen tetap 56, tetapi empat di
antaranya memuat peringatan ketertjangkauan.

### Kebenaran entry point adalah materi utama, bukan detail

Pemeriksaan yang sama menemukan **28 simbol** yang dicontohkan diimpor dari
`@herca/r-kit` padahal berada di `@herca/r-kit/clients` — antara lain
`Button`, `Modal`, `Tabs`, `Sidebar`, `Accordion`, `Chip`, `Calendar`,
`useToast`, dan `useApiTable`. Ditemukan pula **8 subpath** seperti
`@herca/r-kit/button` dan `@herca/r-kit/toast-card` yang tidak ada dalam
`exports` map paket, sehingga akan gagal di proyek konsumen.

Temuan ini berasal dari contoh kode di playground, bukan dari docs. Namun
ia membuktikan bahwa pemisahan dua entry point adalah hal yang paling
mudah salah — bahkan oleh yang menulis kitnya sendiri. Karena itu:

- Halaman `entry-points` naik menjadi salah satu halaman terpenting, dan
  memuat daftar tegas komponen mana ada di entry point yang mana.
- Setiap bagian Impor di 56 halaman komponen wajib menyebut entry point
  yang benar, diverifikasi terhadap `src/index.ts` dan `src/clients.ts`.
- Docs hanya boleh memakai tiga subpath yang sah: `@herca/r-kit`,
  `@herca/r-kit/clients`, dan `@herca/r-kit/style`.

### Referensi hook (3)

`use-copy`, `use-mobile`, `use-is-mac`.

Dua ekspor lain bukan komponen dan tidak mendapat halaman sendiri:
`lib/utils` dibahas di `styling`, `base` dibahas di `colors`, dan
`types/api-response` dibahas di `api-table`.

Total: 11 halaman panduan + 59 halaman referensi = **70 berkas markdown**.

## Template halaman komponen

Semua 56 halaman komponen memakai kerangka yang sama:

```markdown
---
title: Button
description: Menjalankan aksi atau berpindah halaman.
group: Components
playground: /playground/button
---

Satu paragraf: apa perannya dan kapan dipakai.

## Impor
## Penggunaan Dasar
## Varian · Ukuran · Warna     (hanya bagian yang relevan bagi komponen ini)
## Props
## Catatan                     (prop deprecated, jebakan, kaitan komponen lain)
```

Tabel props memakai kolom: Prop, Tipe, Bawaan, Keterangan.

## Urutan pengerjaan

| Fase | Isi | Alasan urutan |
| --- | --- | --- |
| 1 | Cangkang lengkap dan 3 halaman Memulai | Arah dan tampilan sudah bisa dinilai sebelum menulis puluhan berkas |
| 2 | 5 Konsep Inti dan 3 Panduan | Bagian bernilai tertinggi bagi pemakai baru |
| 3 | Referensi Foundation dan Form | Kelompok terbesar dan paling sering dipakai |
| 4 | Referensi Components dan Navigation | |
| 5 | Referensi Feedback, Data Display, dan hook | |

Pekerjaan ini melintasi beberapa sesi. Fase 1 adalah yang paling menentukan
dan diselesaikan lebih dulu.

## Batasan

- **Tidak ada berkas di `src/components/` yang diubah.** Kit sudah rilis ke
  produksi. Bila docs menemukan cacat komponen, cacat itu dicatat di bagian
  Catatan halaman terkait, bukan diperbaiki di sini.
- Pencarian berjalan sepenuhnya di sisi klien; tidak ada layanan pencarian.
- Halaman docs tidak menampilkan pratinjau komponen hidup. Peran itu milik
  playground, dan tiap halaman menautkannya lewat frontmatter `playground`.

## Verifikasi

- `yarn lint` nol error dan `npx tsc -p tsconfig.app.json --noEmit` tidak
  menambah error baru di luar yang sudah ada.
- `npx vite build` berhasil.
- Setiap slug di sidebar membuka halaman yang benar; tidak ada tautan mati.
- Header tetap menempel saat kolom konten di-scroll dengan dropdown terbuka.
- Scroll kembali ke atas setiap berpindah halaman.
- Pencarian ⌘K menemukan halaman berdasarkan judul dan heading.

### Verifikasi impor secara otomatis

Setiap contoh `import … from '@herca/r-kit…'` di dalam markdown docs harus
benar-benar dapat di-resolve. Caranya tidak boleh dengan membaca ulang
secara manual, melainkan dengan membiarkan TypeScript menjadi wasit:

1. Sebuah skrip memindai seluruh markdown di `src/doc/content/`, mengambil
   setiap pernyataan impor dari paket, dan membangun satu berkas TypeScript
   sementara berisi satu impor per simbol.
2. Berkas itu diketikkan ulang dengan `tsc --noEmit`.
3. Simbol yang salah entry point, subpath di luar `exports` map, atau
   simbol yang tidak terjangkau akan muncul sebagai error.

Pemeriksaan ini dijalankan sebagai bagian dari verifikasi tiap fase.
Metode yang sama sudah terbukti: ia menemukan 28 simbol salah entry point
dan 8 subpath tidak sah pada contoh kode playground, termasuk empat kasus
yang semula terlewat oleh pemeriksaan berbasis regex.

---
title: Pengantar
description: Apa itu r-kit, untuk siapa, dan bagaimana docs ini dipakai bersama playground.
group: Memulai
---

**r-kit** adalah kumpulan komponen React buatan tim Herca. Komponen di
dalamnya dibangun di atas Tailwind CSS v4, dengan Radix UI sebagai dasar
untuk komponen yang perlu perilaku aksesibel seperti dropdown, dialog, dan
tooltip.

Kit ini dipakai lintas produk internal Herca, sehingga fokusnya bukan pada
keleluasaan tanpa batas, melainkan pada satu tampilan yang konsisten dan
sekumpulan prop yang berulang pola: `color`, `size`, dan `variant` berarti
hal yang sama di hampir semua komponen.

## Isi kit

| Kelompok | Jumlah |
| --- | --- |
| Komponen | 58 |
| Hook | 17 |
| Ikon | 402 |

## Docs dan playground

Situs ini punya dua bagian dengan tugas berbeda, dan keduanya saling
menautkan:

- **Docs** — yang sedang kamu baca. Berisi panduan, konsep, dan referensi
  prop tiap komponen. Isinya teks dan potongan kode.
- **Playground** — demo hidup tiap komponen. Kamu bisa melihat langsung
  bentuknya, mencoba interaksinya, lalu menyalin kodenya.

Aturan sederhananya: kalau ingin **memahami**, baca docs. Kalau ingin
**melihat**, buka playground. Setiap halaman referensi komponen di docs
memuat tautan ke demonya.

## Yang perlu kamu kuasai lebih dulu

Kit ini tidak menyembunyikan Tailwind. Prop `className` diteruskan ke
elemen terluar hampir di semua komponen, dan kelas yang kamu berikan akan
menimpa kelas bawaan. Jadi pengetahuan Tailwind tetap terpakai penuh.

Kalau baru pertama kali, lanjutkan ke [Instalasi](/docs/installation).

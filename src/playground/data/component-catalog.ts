export interface ComponentCatalogItem {
  title: string;
  description: string;
  to: string;
  thumbnail: string;
}

export const componentCatalog: ComponentCatalogItem[] = [
  {
    title: 'Accordion',
    description:
      'Mengelompokkan beberapa panel konten yang bisa dibuka dan ditutup.',
    to: '/playground/accordion',
    thumbnail: '/thumbs/components/accordion.png',
  },
  {
    title: 'Alert',
    description:
      'Menampilkan pesan singkat untuk memberi tahu perubahan status atau informasi penting.',
    to: '/playground/alert',
    thumbnail: '/thumbs/components/alert.png',
  },
  {
    title: 'Avatar',
    description: 'Menampilkan identitas visual user atau entitas.',
    to: '/playground/avatar',
    thumbnail: '/thumbs/components/avatar.png',
  },
  {
    title: 'Badge',
    description:
      'Menampilkan indikator kecil untuk menunjukkan status, kategori, atau jumlah.',
    to: '/playground/badge',
    thumbnail: '/thumbs/components/badge.png',
  },
  {
    title: 'Breadcrumbs & Pagination',
    description:
      'Membantu user memahami posisi mereka di dalam alur halaman dan berpindah ke halaman berikutnya.',
    to: '/playground/breadcrumb',
    thumbnail: '/thumbs/components/breadcrumb.png',
  },
  {
    title: 'Button',
    description:
      'Menjalankan sebuah aksi atau mengarahkan user ke langkah berikutnya.',
    to: '/playground/button',
    thumbnail: '/thumbs/components/button.png',
  },
  {
    title: 'Button Group',
    description:
      'Mengelompokkan button yang saling berhubungan ke dalam satu kesatuan desain yang selaras.',
    to: '/playground/button-group',
    thumbnail: '/thumbs/components/button-group.png',
  },
  {
    title: 'Calendar',
    description:
      'Menampilkan kalender untuk memilih atau melihat tanggal dalam tampilan hari, bulan, atau tahun.',
    to: '/playground/calendar',
    thumbnail: '/thumbs/components/calendar.png',
  },
  {
    title: 'Card',
    description:
      'Mengelompokkan konten dan aksi terkait dalam satu wadah yang terstruktur.',
    to: '/playground/card',
    thumbnail: '/thumbs/components/card.png',
  },
  {
    title: 'Checkbox',
    description: 'Komponen input untuk memilih satu atau beberapa opsi.',
    to: '/playground/checkbox',
    thumbnail: '/thumbs/components/checkbox.png',
  },
  {
    title: 'Chip',
    description: 'Merepresentasikan informasi ringkas seperti tag atau filter.',
    to: '/playground/chip',
    thumbnail: '/thumbs/components/chip.png',
  },
  {
    title: 'Color',
    description: 'Kumpulan Warna utama dan pendukung yang digunakan.',
    to: '/playground/colors',
    thumbnail: '/thumbs/components/colors.png',
  },
  {
    title: 'Color Picker',
    description: 'Memilih dan mengatur warna pada elemen UI',
    to: '/playground/color-picker',
    thumbnail: '/thumbs/components/color-picker.png',
  },
  {
    title: 'Date Picker',
    description: 'Memudahkan user memilih tanggal atau rentang tanggal.',
    to: '/playground/date-picker',
    thumbnail: '/thumbs/components/date-picker.png',
  },
  {
    title: 'Drawing',
    description: 'Membuat Tanda tangan secara elektronik untuk dokumen.',
    to: '/playground/drawing',
    thumbnail: '/thumbs/components/drawing.png',
  },
  {
    title: 'Dropdown',
    description:
      'Menampilkan daftar opsi tambahan dalam tampilan yang ringkas.',
    to: '/playground/dropdown',
    thumbnail: '/thumbs/components/dropdown.png',
  },
  {
    title: 'File Input',
    description:
      'Memungkinkan user mengunggah atau melampirkan file ke dalam sistem.',
    to: '/playground/input-file',
    thumbnail: '/thumbs/components/input-file.png',
  },
  {
    title: 'File Preview',
    description:
      'Menampilkan file yang sudah diupload agar user dapat melihat hasilnya.',
    to: '/playground/file-view',
    thumbnail: '/thumbs/components/file-view.png',
  },
  {
    title: 'Input Field',
    description:
      'Bidang input dasar untuk memasukkan data teks. Mendukung berbagai state seperti focus, error, dan disabled.',
    to: '/playground/input-field',
    thumbnail: '/thumbs/components/input-field.png',
  },
  {
    title: 'Input Group',
    description:
      'Input Field yang menambahkan ikon atau elemen tambahan untuk memperjelas konteks.',
    to: '/playground/input-group',
    thumbnail: '/thumbs/components/input-group.png',
  },
  {
    title: 'List',
    description:
      'Mengorganisir informasi dalam format daftar yang mudah dibaca.',
    to: '/playground/list',
    thumbnail: '/thumbs/components/list.png',
  },
  {
    title: 'Log In',
    description:
      'Halaman untuk masuk ke sistem menggunakan email, username, atau kredensial lain.',
    to: '/playground/auth',
    thumbnail: '/thumbs/components/auth.png',
  },
  {
    title: 'Modals',
    description:
      'Menampilkan jendela pop-up yang memerlukan interaksi atau konfirmasi dari user.',
    to: '/playground/modal',
    thumbnail: '/thumbs/components/modal.png',
  },
  {
    title: 'Progress Bar',
    description: 'Menunjukkan perkembangan dari sebuah proses atau tugas.',
    to: '/playground/progress-bar',
    thumbnail: '/thumbs/components/progress-bar.png',
  },
  {
    title: 'Radio Button',
    description: 'Memungkinkan user memilih satu opsi dari beberapa pilihan.',
    to: '/playground/radio-button',
    thumbnail: '/thumbs/components/radio-button.png',
  },
  {
    title: 'Select',
    description: 'Memungkinkan user memilih satu nilai dari daftar opsi.',
    to: '/playground/select',
    thumbnail: '/thumbs/components/select.png',
  },
  {
    title: 'Sidebar',
    description:
      'Navigasi samping yang membantu user berpindah antar halaman atau fitur dengan cepat.',
    to: '/playground/sidebar',
    thumbnail: '/thumbs/components/sidebar.png',
  },
  {
    title: 'Slider',
    description:
      'Mengatur nilai dengan cepat melalui pergerakan handle di sebuah track.',
    to: '/playground/slider',
    thumbnail: '/thumbs/components/slider.png',
  },
  {
    title: 'Snackbar / Toast',
    description: 'Memberikan notifikasi cepat yang muncul sementara di layar.',
    to: '/playground/toast',
    thumbnail: '/thumbs/components/toast.png',
  },
  {
    title: 'Switches',
    description:
      'Mengubah status sebuah pengaturan menjadi aktif atau nonaktif.',
    to: '/playground/switch',
    thumbnail: '/thumbs/components/switch.png',
  },
  {
    title: 'Table',
    description:
      'Tabel digunakan untuk menampilkan dan mengatur data agar mudah dibaca.',
    to: '/playground/table',
    thumbnail: '/thumbs/components/table.png',
  },
  {
    title: 'Tabs',
    description:
      'Mengelompokkan konten ke dalam beberapa bagian yang dapat dipilih dengan mudah.',
    to: '/playground/tabs',
    thumbnail: '/thumbs/components/tabs.png',
  },
  {
    title: 'Text Area',
    description:
      'Menyediakan area input yang lebih luas untuk teks yang panjang.',
    to: '/playground/text-area',
    thumbnail: '/thumbs/components/text-area.png',
  },
  {
    title: 'Text Editor',
    description:
      'Komponen rich text editor untuk penulisan dan pemformatan konten yang kompleks.',
    to: '/playground/text-editor',
    thumbnail: '/thumbs/components/text-editor.png',
  },
  {
    title: 'Timeline',
    description: 'Menampilkan urutan kejadian atau proses secara kronologis.',
    to: '/playground/timeline',
    thumbnail: '/thumbs/components/timeline.png',
  },
  {
    title: 'Typography',
    description:
      'Panduan font untuk hierarki, ukuran, dan bobot agar konsisten dan mudah dibaca',
    to: '/playground/typography',
    thumbnail: '/thumbs/components/typography.png',
  },
];

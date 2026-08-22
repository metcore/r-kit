---
title: Layout Aplikasi
description: Merangkai Sidebar, Header, dan area konten menjadi kerangka aplikasi.
group: Panduan
playground: /playground/sidebar
---

Kerangka yang dipakai hampir semua produk internal: sidebar di kiri,
header menempel di atas, konten mengisi sisanya.

## Susunannya

```tsx
import { Header, HeaderLeft, HeaderTitle, HeaderDivider } from '@herca/r-kit';
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@herca/r-kit/clients';

export default function AppLayout({ children }) {
  return (
    <SidebarProvider className="h-svh min-h-0">
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem asChild={false}>Overview</SidebarMenuItem>
            <SidebarMenuItem asChild={false}>Laporan</SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="h-svh min-h-0 overflow-hidden">
        <Header>
          <HeaderLeft>
            <SidebarTrigger />
            <HeaderDivider />
            <HeaderTitle subtitle="Ringkasan">Dashboard</HeaderTitle>
          </HeaderLeft>
        </Header>

        <div className="min-h-0 flex-1 overflow-auto p-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

`SidebarProvider` wajib membungkus keduanya — ia menyimpan keadaan buka
dan tutup yang dibaca `Sidebar` maupun `SidebarTrigger`.

## Jangan biarkan window yang men-scroll

Perhatikan tiga kelas pada contoh di atas: `h-svh min-h-0` pada provider,
`h-svh min-h-0 overflow-hidden` pada inset, dan `min-h-0 flex-1
overflow-auto` pada area konten. Ketiganya bukan hiasan.

`Header` memakai `position: sticky`, dan sticky menempel pada
**scrollport terdekat**. Bila yang men-scroll adalah window, maka apa pun
yang mengubah scroll milik `body` akan melepaskan header.

Itulah yang terjadi saat komponen berbasis Radix terbuka. `Dropdown`,
`Modal`, dan `Sheet` mengunci scroll dengan memasang `overflow: hidden`
pada `body`. Begitu itu terjadi, header berhenti menempel dan ikut
tergulung hilang saat halaman di-scroll.

Dengan tinggi dibatasi seperti di atas, yang men-scroll adalah div konten,
bukan window. Header berada **di luar** area yang di-scroll sehingga tidak
pernah bergerak — dan kunci scroll milik Radix tidak lagi berpengaruh.

## Kembalikan scroll saat pindah halaman

Konsekuensi dari pilihan di atas: router tidak bisa memulihkan posisi
scroll, karena yang men-scroll bukan window melainkan elemen biasa.
Kembalikan sendiri:

```tsx
const { pathname } = useLocation();
const scrollRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  scrollRef.current?.scrollTo({ top: 0 });
}, [pathname]);

<div ref={scrollRef} className="min-h-0 flex-1 overflow-auto p-5">
  {children}
</div>;
```

## Menu bertingkat

`SidebarMenuGroup` membungkus beberapa item menjadi kelompok yang bisa
dibuka tutup:

```tsx
<SidebarMenuGroup label="Manajemen" icon={<Icon size={18} name="folder" />}>
  <SidebarMenuItem asChild={false}>Pengguna</SidebarMenuItem>
  <SidebarMenuItem active asChild={false}>Peran</SidebarMenuItem>
</SidebarMenuGroup>
```

## Item sebagai tautan router

`SidebarMenuItem` menyalakan `asChild` secara bawaan, sehingga langsung
menerima komponen tautan milik router:

```tsx
<SidebarMenuItem icon={<Icon size={18} name="grid-square" />}>
  <Link to="/dashboard">Dashboard</Link>
</SidebarMenuItem>
```

## Menyematkan sidebar di dalam kartu

Untuk pratinjau atau contoh, `collapsible="none"` membuat `Sidebar`
dirender sebagai kolom biasa, bukan panel tetap setinggi layar:

```tsx
<SidebarProvider className="min-h-0">
  <Sidebar collapsible="none" className="h-[320px]">
    …
  </Sidebar>
</SidebarProvider>
```

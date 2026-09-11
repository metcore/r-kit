---
title: Sidebar
description: Panel navigasi tetap di sisi halaman.
group: Navigation
playground: /playground/sidebar
---

## Impor

```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuGroup,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@herca/r-kit/clients';
```

## Penggunaan Dasar

```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem asChild={false}>Overview</SidebarMenuItem>
        <SidebarMenuItem asChild={false}>Laporan</SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>

  <SidebarInset>{children}</SidebarInset>
</SidebarProvider>
```

`SidebarProvider` wajib membungkus keduanya — ia menyimpan keadaan buka
dan tutup yang dibaca `Sidebar` maupun `SidebarTrigger`.

## Item Sebagai Tautan

`SidebarMenuItem` menyalakan `asChild` secara **bawaan**, sehingga
langsung menerima komponen tautan router:

```tsx
<SidebarMenuItem icon={<Icon size={18} name="grid-square" />}>
  <Link to="/dashboard">Dashboard</Link>
</SidebarMenuItem>
```

Untuk teks polos tanpa tautan, matikan lebih dulu:

```tsx
<SidebarMenuItem asChild={false}>Overview</SidebarMenuItem>
```

## Menandai Item Aktif

```tsx
<SidebarMenuItem active={pathname === '/dashboard'}>
  <Link to="/dashboard">Dashboard</Link>
</SidebarMenuItem>
```

## Kelompok Menu

```tsx
<SidebarMenuGroup label="Manajemen" icon={<Icon size={18} name="folder" />}>
  <SidebarMenuItem asChild={false}>Pengguna</SidebarMenuItem>
</SidebarMenuGroup>
```

## Menciut Menjadi Ikon

```tsx
<Sidebar collapsible="icon">…</Sidebar>
```

| Nilai | Perilaku |
| --- | --- |
| `icon` (bawaan) | Menciut menjadi kolom ikon, melebar saat disentuh |
| `offcanvas` | Menghilang sepenuhnya |
| `none` | Kolom biasa, tanpa posisi tetap |

`collapsible="none"` berguna untuk menyematkan sidebar di dalam kartu,
karena ia tidak lagi memakai posisi `fixed` setinggi layar.

## Membaca Keadaannya

```tsx
const { state, isHovered, toggleSidebar } = useSidebar();
const terbuka = state === 'expanded' || isHovered;
```

## Props — Sidebar

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `side` | `left \| right` | `left` | Sisi penempatan |
| `variant` | `sidebar \| floating \| inset` | `sidebar` | Gaya panel |
| `collapsible` | `offcanvas \| icon \| none` | `icon` | Cara menciut |

## Props — SidebarProvider

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `defaultOpen` | `boolean` | `true` | Keadaan awal |
| `open` | `boolean` | — | Mode terkendali |
| `onOpenChange` | `(open: boolean) => void` | — | Dipanggil saat berubah |

## Props — SidebarMenuItem & SidebarMenuGroup

| Prop | Tipe | Bawaan | Keterangan |
| --- | --- | --- | --- |
| `active` | `boolean` | `false` | Menandai item aktif |
| `icon` | `ReactNode` | — | Ikon di kiri |
| `asChild` | `boolean` | `true` | Hanya pada `SidebarMenuItem` |
| `label` | `string` | — | Wajib pada `SidebarMenuGroup` |

## Catatan

Keadaan buka tutup disimpan di cookie `sidebar_state`, sehingga bertahan
antar kunjungan.

`SidebarProvider` memakai `min-h-svh`. Untuk layout yang men-scroll di
kontainer dalam, timpa dengan `h-svh min-h-0` seperti dijelaskan di
[Layout Aplikasi](/docs/app-layout).

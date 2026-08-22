import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../clients';
import {
  Header,
  HeaderDivider,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from '../../components/header/header';
import CommandPalette, {
  CommandPaletteTrigger,
  useCommandPalette,
} from '../../landing/components/CommandPalette';
import DocSidebar from '../components/DocSidebar';

export default function DocLayout() {
  const { open: cariTerbuka, setOpen: setCariTerbuka } = useCommandPalette();
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Yang men-scroll adalah div di bawah, bukan window, jadi React Router
  // tidak bisa mengembalikan posisinya sendiri saat pindah halaman.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    // Tinggi dibatasi supaya kolom konten menjadi scrollport sesungguhnya.
    // Dengan begitu header berada di luar area yang di-scroll dan tidak
    // ikut hilang ketika Radix mengunci scroll lewat body overflow:hidden.
    <SidebarProvider className="h-svh min-h-0">
      <DocSidebar />
      <SidebarInset className="h-svh min-h-0 overflow-hidden">
        <Header>
          <HeaderLeft>
            <SidebarTrigger />
            <HeaderDivider />
            <HeaderTitle subtitle="Panduan penggunaan">Docs</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <CommandPaletteTrigger onClick={() => setCariTerbuka(true)} />
          </HeaderRight>
        </Header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>

      <CommandPalette open={cariTerbuka} onOpenChange={setCariTerbuka} />
    </SidebarProvider>
  );
}

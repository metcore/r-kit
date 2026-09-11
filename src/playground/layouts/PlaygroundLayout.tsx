import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PlaygroundSidebar from '../components/PlaygroundSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../clients';
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  HeaderDivider,
} from '../../components/header/header';
import CommandPalette, {
  CommandPaletteTrigger,
  useCommandPalette,
} from '../../landing/components/CommandPalette';
import HeaderNotifications from '../components/HeaderNotifications';
import HeaderProfile from '../components/HeaderProfile';
import SectionNav from '../../shared/SectionNav';

export default function PlaygroundLayout() {
  const { open: isSearchOpen, setOpen: setSearchOpen } = useCommandPalette();
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Yang men-scroll adalah div di bawah, bukan window, jadi React Router
  // tidak bisa mengembalikan posisinya sendiri saat pindah halaman.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <SidebarProvider className="h-svh min-h-0">
      <PlaygroundSidebar />
      <SidebarInset className="h-svh min-h-0 overflow-hidden">
        <Header>
          <HeaderLeft>
            <SidebarTrigger />
            <HeaderDivider />
            <HeaderTitle subtitle="Eksplorasi komponen">Playground</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <SectionNav />
            <HeaderDivider className="hidden sm:block" />
            <CommandPaletteTrigger onClick={() => setSearchOpen(true)} />
            <HeaderDivider className="hidden sm:block" />
            <HeaderNotifications />
            <HeaderProfile />
          </HeaderRight>
        </Header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto p-5">
          <Outlet />
        </div>
      </SidebarInset>

      <CommandPalette open={isSearchOpen} onOpenChange={setSearchOpen} />
    </SidebarProvider>
  );
}

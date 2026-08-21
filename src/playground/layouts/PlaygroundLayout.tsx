import { Outlet } from 'react-router-dom';
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

export default function PlaygroundLayout() {
  const { open: isSearchOpen, setOpen: setSearchOpen } = useCommandPalette();

  return (
    <SidebarProvider>
      <PlaygroundSidebar />
      <SidebarInset>
        <Header>
          <HeaderLeft>
            <SidebarTrigger />
            <HeaderDivider />
            <HeaderTitle subtitle="Eksplorasi komponen">Playground</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <CommandPaletteTrigger onClick={() => setSearchOpen(true)} />
            <HeaderDivider className="hidden sm:block" />
            <HeaderNotifications />
            <HeaderProfile />
          </HeaderRight>
        </Header>

        <div className="flex-1 overflow-auto p-5">
          <Outlet />
        </div>
      </SidebarInset>

      <CommandPalette open={isSearchOpen} onOpenChange={setSearchOpen} />
    </SidebarProvider>
  );
}

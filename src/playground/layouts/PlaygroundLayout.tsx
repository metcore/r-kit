import { Outlet } from 'react-router-dom';
import PlaygroundSidebar from '../components/PlaygroundSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../clients';
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  HeaderDivider,
  HeaderSearch,
  HeaderAction,
} from '../../components/header/header';
import { Icon } from '../../components/icons';

export default function PlaygroundLayout() {
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
            <HeaderSearch placeholder="Cari komponen..." />
            <HeaderDivider className="hidden sm:block" />
            <HeaderAction label="Notifikasi" badge={3}>
              <Icon name="bell" size={18} />
            </HeaderAction>
            <HeaderAction label="Akun">
              <Icon name="user" size={18} />
            </HeaderAction>
          </HeaderRight>
        </Header>

        <div className="flex-1 overflow-auto p-5">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

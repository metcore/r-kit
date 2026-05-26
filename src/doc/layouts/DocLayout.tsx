import { Outlet } from 'react-router-dom';
import DocSidebar from '../components/DocSidebar';
import { SidebarProvider } from '../../clients';

export default function DocsLayout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <DocSidebar />
        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

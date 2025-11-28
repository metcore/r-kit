// src/docs/layouts/DashboardLayout.tsx
import React, { type ReactNode } from "react";
import AppSidebar from "../components/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../components/sidebar/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div></div>
        <main className="p-5 bg-gray-50 grow">
          <div>
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;

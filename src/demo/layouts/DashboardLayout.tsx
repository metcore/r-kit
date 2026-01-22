// src/docs/layouts/DashboardLayout.tsx
import React, { type ReactNode } from "react";
import AppSidebar from "../components/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../components/sidebar/sidebar";
import { Input } from "../../components/input";
import { Icon } from "../../components/icons";
import { Button } from "../../components/button";
import { Avatar } from "../../components/avatar";
import { Text } from "../../components/text";
import { Indicator } from "../../components/indicator";
import { useIsMobile } from "../../hooks/use-mobile";
import { BrandLogo } from "../../components/brand-logo";
import brandLogo from "../assets/images/brand-logo.png";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().includes("MAC");

  const shortcut = isMac ? "⌘ K" : "Ctrl + K";
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-w-0 flex-1">
        <nav className="relative flex h-[76px] w-full -translate-y-0.5 flex-row items-center justify-between bg-white px-5">
          {/* sidebar trigger & search bar */}
          <div className="flex flex-1 flex-row items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <button>
              <Icon name="search" />
            </button>
            <Input
              className="hidden shadow-none md:flex lg:min-w-[300px]"
              leftAddon={<Icon name="search" size={16} />}
              leftAddonClassName="border-r-0"
              placeholder={`Search (${shortcut})`}
            />
          </div>

          <div className="flex flex-row gap-3">
            {/* notification button */}
            <Button
              variant={isMobile ? "tertiary" : "outline"}
              size={"icon"}
              color="gray"
              className="px-2"
            >
              <Indicator color="danger" value={8} size="sm">
                <Icon name="bell" className="text-gray-900" />
              </Indicator>
            </Button>

            {/* brad logo */}
            {isMobile && (
              <BrandLogo
                name="Herca Design"
                brandLogo={brandLogo}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}

            {/* avatar */}
            <button className="flex flex-row items-center gap-3">
              <Avatar name="Nurdin Alkatiri" size="md" />

              <div className="hidden flex-row items-center gap-3 md:flex">
                <div className="flex flex-col">
                  <Text
                    value="Nurdin Alkatiri"
                    weight="medium"
                    variant="t1"
                    numberOfLines={1}
                  />
                  <Text
                    value="Finance"
                    variant="t2"
                    weight="medium"
                    className="text-gray-700"
                  />
                </div>

                <Icon name="caret-down" size={18} className="text-gray-900" />
              </div>
            </button>
          </div>
        </nav>
        <main className="grow bg-gray-50 p-5">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

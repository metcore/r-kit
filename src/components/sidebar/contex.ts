import React from 'react';
import type { SidebarContextProps } from './type';

export const SidebarContext = React.createContext<SidebarContextProps | null>(
  null
);

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (context === undefined || context === null) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
};

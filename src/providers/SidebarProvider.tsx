"use client";
import { createContext, PropsWithChildren, useState } from "react";

// declare props to be used as one argument/object
type SidebarProviderTypes = {
  sidebarIsOpen: boolean;
  toggleSidebar: () => void;
};

// define context to read and follow changes
export const SidebarContext = createContext<SidebarProviderTypes | undefined>(
  undefined,
);

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

  // if sidebar is currently open, then it is toggled to close; and vice versa
  const toggleSidebar = () => {
    const newSidebarState = sidebarIsOpen ? false : true;
    setSidebarIsOpen(newSidebarState);
    console.log("Sidebar has been toggled:", sidebarIsOpen);
  };

  return (
    // context value allows for variables to be updated
    <SidebarContext value={{ sidebarIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext>
  );
}

"use client";
import {
  ChevronsLeft,
  ChevronsRight,
  CircleX,
  LucideProvider,
  Menu,
} from "lucide-react";

import { useEffect } from "react";
import useSidebar from "@/hooks/useSidebar";

function SidebarIcon(toggled: boolean, type: "menu" | "toggle") {
  if (toggled) {
    return type === "menu" ? <Menu /> : <ChevronsRight />;
  } else {
    return type === "menu" ? <CircleX /> : <ChevronsLeft />;
  }
}

export default function SidebarToggle({
  className = "",
  icon = "toggle",
}: {
  className?: string;
  icon?: "menu" | "toggle";
}) {
  const { sidebarIsOpen, toggleSidebar } = useSidebar();
  useEffect(() => {
    console.log("side bar changed:", sidebarIsOpen);
  }, [sidebarIsOpen]);

  return (
    <LucideProvider size={32}>
      <button
        className={`bg-(--color-background-nav) size-10 text-(--color-text-nav) md:absolute md:-right-4 md:top-24 md:rounded-r-md ${className}`}
        onClick={toggleSidebar}
      >
        {icon === "menu" ? (
          sidebarIsOpen ? (
            <CircleX size={40} />
          ) : (
            <Menu />
          )
        ) : sidebarIsOpen ? (
          <ChevronsRight />
        ) : (
          <ChevronsLeft />
        )}
      </button>
    </LucideProvider>
  );
}

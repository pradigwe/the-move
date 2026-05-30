"use client";
import useSidebar from "@/hooks/useSidebar";
import NavItem from "./NavItem";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar() {
  const { sidebarIsOpen } = useSidebar();

  return (
    <div className="h-full flex flex-row  mr-8 relative">
      <SidebarToggle className="hidden md:inline" />

      <div
        hidden={sidebarIsOpen}
        className="max-sm:hidden bg-(--color-background-nav) text-(--color-text-nav) max-h-svh max-w-1/6 min-w-62 py-4 px-8 rounded-4xl flex flex-col"
      >
        <h1 className="text-4xl mt-8 mb-16">The Move</h1>
        <div className="flex flex-col flex-1">
          <h2 className=" uppercase text-sm opacity-50 font-medium tracking-wider mb-2">
            General
          </h2>
          <nav className="flex flex-col flex-1 justify-between mb-4">
            <div className="flex-col flex gap-1 ">
              <NavItem name={"Dashboard"} href={"/"} useIcon />
              <NavItem name={"Checklist"} href={"/checklist"} useIcon />
              <NavItem name={"Plan"} href={"/plan"} useIcon />
              <NavItem name={"Savings"} href={"/savings"} useIcon />
            </div>
            <div className="">
              <NavItem name={"Settings"} href={"/settings"} useIcon />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

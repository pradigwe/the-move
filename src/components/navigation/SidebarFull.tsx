"use client";

import useSidebar from "@/hooks/useSidebar";
import SidebarToggle from "./SidebarToggle";
import NavItem from "./NavItem";

export default function SidebarFull() {
  const { sidebarIsOpen, toggleSidebar } = useSidebar();

  return (
    <div
      hidden={!sidebarIsOpen}
      className=" flex flex-col min-h-lvh min-w-dvw md:hidden py-8 px-4 bg-(--color-background-nav) absolute overscroll-none "
    >
      <SidebarToggle icon="menu" className="ml-auto pr-12" />
      <div className="flex flex-col flex-1 mt-12 text-(--color-text-nav)">
        <h2 className=" uppercase text-2xl opacity-50 font-medium tracking-wider mb-2">
          General
        </h2>
        <nav className=" flex flex-col flex-1 justify-between mb-12 text-4xl ">
          <div className="flex-col flex gap-4 ">
            <NavItem
              name={"Dashboard"}
              href={"/"}
              useIcon
              onClick={toggleSidebar}
              iconType="menu"
            />
            <NavItem
              name={"Checklist"}
              href={"/checklist"}
              useIcon
              onClick={toggleSidebar}
              iconType="menu"
            />
            <NavItem
              name={"Plan"}
              href={"/plan"}
              useIcon
              onClick={toggleSidebar}
              iconType="menu"
            />
            <NavItem
              name={"Savings"}
              href={"/savings"}
              useIcon
              onClick={toggleSidebar}
              iconType="menu"
            />
          </div>
          <NavItem
            name={"Settings"}
            href={"/settings"}
            useIcon
            onClick={toggleSidebar}
            iconType="menu"
          />
        </nav>
      </div>
    </div>
  );
}

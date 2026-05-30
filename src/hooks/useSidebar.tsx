import { SidebarContext } from "@/providers/SidebarProvider";
import { useContext } from "react";

export default function useSidebar() {
  const context = useContext(SidebarContext);

  // narrows down debugging to rule out context not being used
  if (context == undefined) {
    throw new Error("useSidebar must be inside of SidebarProvider");
  }
  return context;
}

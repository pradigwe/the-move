"use client";
import { CircleDashed, LayoutDashboard, LucideProvider } from "lucide-react";
import Link from "next/link";
import { navIcons } from "@/data/navigation";

type NavProps = {
  name: string;
  href: string;
  useIcon?: boolean;
  iconType?: "menu" | "toggle";
  onClick?: () => void;
};

export default function NavItem({
  name,
  href,
  useIcon = false,
  iconType = "toggle",
  onClick,
}: NavProps) {
  const matchedIcon = navIcons.find(
    ({ label }) => label === name.toLowerCase(),
  );
  const IconComponent = matchedIcon?.icon;

  return (
    <Link
      href={href}
      className="flex flex-row gap-4 items-center font-semibold"
      onClick={onClick}
    >
      <LucideProvider strokeWidth={1.5} size={iconType === "menu" ? 40 : 20}>
        {useIcon && (IconComponent ? <IconComponent /> : <CircleDashed />)}
      </LucideProvider>
      <p>{name}</p>
    </Link>
  );
}

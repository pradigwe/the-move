import SidebarToggle from "./SidebarToggle";

export default function Header() {
  return (
    <div className="sm:hidden max-sm:bg-(--color-background-nav) text-(--color-text-nav) max-w-full min-w-64 p-4 m-4 rounded-md flex flex-row justify-between">
      <h1 className="text-4xl">The Move</h1>
      <SidebarToggle icon="menu" />
    </div>
  );
}

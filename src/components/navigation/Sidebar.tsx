"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="bg-(--color-background-nav) text-(--color-text-nav) max-w-1/6 min-w-62 py-4 px-8 mr-8 rounded-4xl flex flex-col">
      <h1 className="text-4xl text-(--color-text-nav) mt-8 mb-16">The Move</h1>
      <div className="flex flex-col flex-1">
        <h2 className=" uppercase text-sm opacity-50 font-medium tracking-wider">
          General
        </h2>
        <nav className="flex flex-col flex-1 justify-between mb-8 font-semibold    ">
          <div className="flex-col flex gap-1 ">
            <Link href="/">Dashboard</Link>
            <Link href="/checklist">Checklist</Link>
            <Link href="/plan">Plan</Link>
            <Link href="/savings">Savings</Link>
          </div>
          <div className="">
            <Link href="/settings">Settings</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

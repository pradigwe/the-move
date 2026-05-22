"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div>
      <h1>The Move</h1>
      <h2>General</h2>
      <nav>
        <div>
          <Link href="/">Dashboard</Link>
          <Link href="/checklist">Checklist</Link>
          <Link href="/plan">Plan</Link>
          <Link href="/savings">Savings</Link>
        </div>
        <div>
          <Link href="/settings">Settings</Link>
        </div>
      </nav>
    </div>
  );
}

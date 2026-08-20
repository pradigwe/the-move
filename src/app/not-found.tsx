"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h2>Page Not Found</h2>
      <Link href="/">Go back to Dashboard</Link>
    </>
  );
}

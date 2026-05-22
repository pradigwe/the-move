"use client";

import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <button
        onClick={() => {
          setTheme("light");
          console.log("Switched to light mode");
        }}
      >
        Light
      </button>
      <button
        onClick={() => {
          setTheme("dark");
          console.log("Switched to dark mode");
        }}
      >
        Dark
      </button>
    </>
  );
}

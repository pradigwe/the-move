"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

export default function ThemeProviders({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <ThemeProvider
      {...props}
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}

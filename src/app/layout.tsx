import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/navigation/Sidebar";

import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import ThemeProviders from "@/providers/ThemeProviders";
import SidebarProvider from "@/providers/SidebarProvider";
import Header from "@/components/navigation/Header";
import SidebarFull from "@/components/navigation/SidebarFull";
import MoveDataProvider from "@/providers/MoveDataProvider";
import { OnboardingProvider } from "@onboardjs/react";
import { componentRegistry, steps } from "@/lib/onboarding";
import OnboardingUI from "@/components/onboarding/OnboardingUI";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { GlobalStyles } from "@mui/material";
import { MoveOnboardingContext } from "@/types/onboarding";
import { initialContext } from "@/data/initialContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Move",
  description:
    "A move-out planning web app for students and first-time renters to stay organized, track savings, and plan their move with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProviders>
          <AppRouterCacheProvider>
            <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            <SidebarProvider>
              <OnboardingProvider
                steps={steps}
                localStoragePersistence={{
                  key: "onboardjs:my-onboarding",
                }}
                componentRegistry={componentRegistry}
                initialContext={initialContext as MoveOnboardingContext}
              >
                <MoveDataProvider>
                  <OnboardingUI />
                  <Header />
                  <SidebarFull />
                  <div className=" min-h-full flex flex-row py-8 px-12 ">
                    <Sidebar />
                    {children}
                  </div>
                </MoveDataProvider>
              </OnboardingProvider>
            </SidebarProvider>
          </AppRouterCacheProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}

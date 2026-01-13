"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { dark, shadesOfPurple } from "@clerk/themes";
import { useTheme } from "next-themes";

interface ClerkThemeProviderProps {
  children: ReactNode;
}

export function ClerkThemeProvider({ children }: ClerkThemeProviderProps) {
  const { resolvedTheme } = useTheme();
  const clerkTheme = resolvedTheme === "light" ? shadesOfPurple : dark;

  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        theme: clerkTheme,
      }}
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}

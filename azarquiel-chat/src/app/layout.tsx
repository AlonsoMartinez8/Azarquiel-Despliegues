import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import BaseHeader from "@/components/base-header";
import { ClerkThemeProvider } from "@/components/clerk-theme-provider";

const fontPoppins = Poppins({
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Azarquiel Chat",
  description: "Chat en tiempo real desplegado en Netlify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${fontPoppins.variable} antialiased min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            <BaseHeader />
            {children}
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

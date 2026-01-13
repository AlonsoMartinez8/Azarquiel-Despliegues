"use client";
import azarquielLogo from "@/assets/azarquielLogo.png";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { QrShare } from "@/components/qr-share";

export default function BaseHeader() {
  return (
    <header className="flex items-center justify-between gap-4 px-8 py-2 bg-sidebar-accent/60 border-b border-accent backdrop-blur-md shadow-2xl shadow-sidebar/30 fixed top-0 w-full z-40">
      <aside className="flex items-center gap-4">
        <Image
          src={azarquielLogo}
          alt="I.E.S. Azarquiel Logo"
          width={40}
          className="rounded-full"
        />
        <h1 className="text-2xl font-semibold">Azarquiel Chat</h1>
      </aside>
      <aside className="flex items-center justify-end gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <QrShare />
        <ThemeSwitcher />
      </aside>
    </header>
  );
}

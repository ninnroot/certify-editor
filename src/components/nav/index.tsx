"use client";
import Link from "next/link";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { MainNav } from "@/components/nav/main-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import LoginAvatar from "./login-avatar";
export function Navigation() {
  return (
    <nav className="py-5 flex justify-between gap-4 items-center">
      <div>
        <MainNav></MainNav>
        <MobileNav></MobileNav>
      </div>
      <div className="flex gap-4 items-center">
        <ModeToggle></ModeToggle>
        <LoginAvatar></LoginAvatar>
      </div>
    </nav>
  );
}

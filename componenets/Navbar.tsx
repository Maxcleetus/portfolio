"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lightning from "./Lightning";

type PanelName = "about" | "project" | "contact" | null;

const navLinks = [
  { name: "HOME", panel: null },
  { name: "ABOUT", panel: "about" },
  { name: "PROJECT", panel: "project" },
  { name: "CONTACT", panel: "contact" },
] satisfies Array<{ name: string; panel: PanelName }>;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (panel: PanelName) => {
    setOpen(false);

    if (pathname === "/") {
      window.dispatchEvent(
        new CustomEvent("portfolio-panel-change", {
          detail: { panel },
        })
      );
      return;
    }

    router.push(panel ? `/#${panel}` : "/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b-2 border-dashed border-cyan-400 bg-[var(--surface-bg)] relative">
      <Lightning />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-cyan-300 tracking-widest drop-shadow-[0_0_8px_#22d3ee]">
          MAX CLEETUS
        </h1>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.panel)}
              className="px-4 py-2 border border-dashed border-cyan-400 text-cyan-200 tracking-widest hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee]"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden px-3 py-1 border border-dashed border-cyan-400 text-cyan-300"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden w-full bg-[var(--surface-bg)] border-t border-dashed border-cyan-400 flex flex-col items-center gap-4 py-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.panel)}
              className="w-40 px-4 py-2 border border-dashed border-cyan-400 text-cyan-200 text-center"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

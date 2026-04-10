"use client";

import { useState } from "react";
import Lightning from "./Lightning";

const navLinks = [
  { name: "HOME", type: "link", href: "/" },
  { name: "ABOUT", type: "action" },
  { name: "PROJECT", type: "link", href: "/project" },
  { name: "CONTACT", type: "link", href: "/contact" },
];

export default function Navbar({
  onAboutClick,
}: {
  onAboutClick?: () => void; // ✅ safe optional
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border border-dashed border-cyan-400 relative">
      <Lightning />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-cyan-300 tracking-widest drop-shadow-[0_0_8px_#22d3ee]">
          MAX CLEETUS
        </h1>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) =>
            link.type === "action" ? (
              <button
                key={link.name}
                onClick={() => onAboutClick?.()}
                className="px-4 py-2 border border-dashed border-cyan-400 text-cyan-200 tracking-widest hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee]"
              >
                {link.name}
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 border border-dashed border-cyan-400 text-cyan-200 tracking-widest hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee]"
              >
                {link.name}
              </a>
            )
          )}
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
        <div className="md:hidden w-full bg-black border-t border-dashed border-cyan-400 flex flex-col items-center gap-4 py-6">
          {navLinks.map((link) =>
            link.type === "action" ? (
              <button
                key={link.name}
                onClick={() => {
                  onAboutClick?.();
                  setOpen(false);
                }}
                className="w-40 px-4 py-2 border border-dashed border-cyan-400 text-cyan-200"
              >
                {link.name}
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="w-40 px-4 py-2 border border-dashed border-cyan-400 text-cyan-200 text-center"
              >
                {link.name}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
}
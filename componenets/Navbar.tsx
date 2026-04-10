"use client";

import Link from "next/link";
import { useState } from "react";
import Lightning from "./Lightning";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "PROJECT", href: "/project" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-0  backdrop-blur-md border border-dashed border-cyan-400 relative">
      <Lightning />
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl md:text-2xl font-bold text-cyan-300 tracking-widest drop-shadow-[0_0_8px_#22d3ee]">
            MAX CLEETUS
          </h1>
        </Link>

        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <span className="px-4 py-2 border border-dashed border-cyan-400 text-cyan-200 tracking-widest transition-all duration-300 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_0_10px_#22d3ee] hover:scale-105">
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden px-3 py-1 border border-dashed border-cyan-400 text-cyan-300 hover:shadow-[0_0_10px_#22d3ee]"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open && (
        <div className="md:hidden w-full h-full bg-black border-t border-dashed border-cyan-400 flex flex-col items-center justify-center gap-4 py-6 z-50">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setOpen(false)}>
              <span className="block w-40 text-center px-4 py-2 border border-dashed border-cyan-400 text-cyan-200 tracking-widest transition-all duration-300 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_0_10px_#22d3ee]">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lightning from "./Lightning";
import GlitchText from "./GlitchText";

type PanelName = "about" | "project" | "contact" | "experience" | "status" | null;

const navLinks = [
  { name: "HOME", panel: null },
  { name: "ABOUT", panel: "about" },
  { name: "EXPERIENCE", panel: "experience" },
  { name: "PROJECT", panel: "project" },
  { name: "CONTACT", panel: "contact" },
] satisfies Array<{ name: string; panel: PanelName }>;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("cyan");
  const [activePanel, setActivePanel] = useState<PanelName>(null);
  const pathname = usePathname();
  const router = useRouter();

  // 🔹 Sync active panel on hash change and custom events
  useEffect(() => {
    const handlePanelChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ panel: PanelName }>;
      setActivePanel(customEvent.detail.panel);
    };

    window.addEventListener("portfolio-panel-change", handlePanelChange);

    // Initial check
    const hash = window.location.hash.replace("#", "") as PanelName;
    if (["about", "project", "contact", "experience", "status"].includes(hash || "")) {
      setActivePanel(hash);
    }

    return () => {
      window.removeEventListener("portfolio-panel-change", handlePanelChange);
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") || "cyan";
    document.body.setAttribute("data-theme", savedTheme);
    setActiveTheme(savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    setActiveTheme(theme);
    window.dispatchEvent(new CustomEvent("portfolio-theme-change", { detail: { theme } }));
  };

  const handleNavigation = (panel: PanelName) => {
    setOpen(false);
    setActivePanel(panel);

    window.dispatchEvent(
      new CustomEvent("portfolio-panel-change", {
        detail: { panel },
      })
    );

    if (panel) {
      window.history.replaceState(null, "", `/#${panel}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <nav className="fixed top-4 left-0 w-full z-50 px-6 font-mono text-accent pointer-events-none">
      <Lightning />

      {/* DESKTOP SPLIT NAV */}
      <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between pointer-events-auto">
        {/* Left Side: Floating Brand Bracket */}
        <div 
          onClick={() => handleNavigation(null)}
          className="border border-dashed border-accent/25 bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.6)] cursor-pointer hover:bg-accent/10 hover:border-accent transition-all duration-300 flex items-center gap-2 select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--accent)]" />
          <h1 className="text-xs md:text-sm font-bold text-white tracking-widest uppercase">
            <GlitchText text="MAX CLEETUS" speed={40} triggerOnHover={true} />
          </h1>
        </div>

        {/* Right Side: Floating Menu & Controls Dock */}
        <div className="flex items-center gap-4 border border-dashed border-accent/25 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.6)]">
          {/* LED Theme Picker */}
          <div className="flex items-center gap-1.5 border border-dashed border-accent/20 px-2 py-0.5 rounded-full bg-black/60">
            <div className="flex gap-1">
              {[
                { id: "cyan", color: "bg-cyan-400" },
                { id: "amber", color: "bg-amber-400" },
                { id: "green", color: "bg-emerald-400" },
                { id: "purple", color: "bg-purple-400" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => changeTheme(t.id)}
                  className={`w-2.5 h-2.5 rounded-full ${t.color} transition-all duration-300 border border-transparent ${
                    activeTheme === t.id
                      ? "border-white scale-120 shadow-[0_0_8px_currentColor] opacity-100"
                      : "opacity-40 hover:opacity-80 hover:scale-110 cursor-pointer"
                  }`}
                  title={`Switch to ${t.id} theme`}
                />
              ))}
            </div>
          </div>

          <span className="h-4 w-[1px] bg-accent/25" />

          {/* Desktop Navigation Links */}
          <div className="flex gap-1.5">
            {navLinks.map((link) => {
              const isActive = activePanel === link.panel;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.panel)}
                  className={`px-3 py-1 text-[9px] tracking-widest border rounded-full transition-all duration-300 relative cursor-pointer select-none ${
                    isActive 
                      ? "border-solid border-accent bg-accent/20 text-white shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)] font-bold" 
                      : "border-transparent text-accent/75 hover:border-dashed hover:border-accent hover:bg-accent/5 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                  )}
                  {link.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE FLOATING HEADER (FULL BORDER CARD) */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 w-[90%] border border-dashed border-accent/25 bg-zinc-950/85 backdrop-blur-md px-4 py-2.5 rounded-2xl pointer-events-auto flex flex-col items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="flex items-center justify-between w-full">
          {/* Left Side: Brand Text */}
          <h1 
            onClick={() => handleNavigation(null)}
            className="text-white font-bold tracking-[0.15em] uppercase text-[11px] cursor-pointer select-none"
          >
            Max Cleetus
          </h1>

          {/* Right Side: LED Theme Picker */}
          <div className="flex gap-1.5 bg-black/60 px-2 py-0.5 rounded-full border border-dashed border-accent/15">
            {[
              { id: "cyan", color: "bg-cyan-400" },
              { id: "amber", color: "bg-amber-400" },
              { id: "green", color: "bg-emerald-400" },
              { id: "purple", color: "bg-purple-400" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`w-2 h-2 rounded-full ${t.color} transition-all duration-300 border border-transparent ${
                  activeTheme === t.id
                    ? "border-white scale-125 shadow-[0_0_8px_currentColor] opacity-100"
                    : "opacity-40 hover:opacity-85 hover:scale-110 cursor-pointer"
                }`}
                title={`Switch to ${t.id} theme`}
              />
            ))}
          </div>
        </div>

        {/* Floating Latch Button */}
        <button 
          onClick={() => setOpen(!open)}
          className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 px-4 py-0.5 bg-zinc-950 border border-dashed border-accent text-[8px] font-mono tracking-widest text-accent hover:bg-accent/15 transition-all rounded-full shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] active:scale-95 duration-200 cursor-pointer flex items-center gap-1 z-20"
        >
          <span className="relative flex h-1 w-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1 w-1 bg-accent"></span>
          </span>
          {open ? "[ CLOSE ]" : "[ MENU ]"}
        </button>

        {/* Collapsible Menu Links */}
        {open && (
          <div className="w-full flex flex-col items-center gap-2 py-2 border-t border-dashed border-accent/20 mt-1">
            {navLinks.map((link) => {
              const isActive = activePanel === link.panel;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.panel)}
                  className={`w-32 py-1 border text-center text-[9px] tracking-widest rounded-full transition-all ${
                    isActive 
                      ? "border-solid border-accent bg-accent/10 text-white font-bold" 
                      : "border-dashed border-accent/30 text-accent/70 hover:text-white"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

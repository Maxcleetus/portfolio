"use client";

export default function Footer() {
  const openStatusPanel = () => {
    window.location.hash = "#status";
    window.dispatchEvent(new CustomEvent("portfolio-panel-change", { detail: { panel: "status" } }));
  };

  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full border-t border-dashed border-accent/25 bg-zinc-950/85 backdrop-blur-md px-6 py-3 font-mono text-accent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left text-[10px] tracking-wider select-none">
        
        {/* Left side: HUD System Status */}
        <div className="hidden md:flex items-center gap-4 text-accent/65">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
            SYS_STATUS: ONLINE
          </span>
          <span className="text-accent/35">|</span>
          <span>NODE: SEC-9</span>
          <span className="text-accent/35">|</span>
          <span>FPS: 60</span>
        </div>

        {/* Center: Branding & Copyright */}
        <div className="flex flex-col items-center">
          <p className="text-white font-bold tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Max Cleetus
          </p>
          <p className="text-[8px] text-accent/50 mt-0.5 tracking-widest uppercase">
            Freelance Mobile App & Web Developer
          </p>
        </div>

        {/* Right side: Console build metadata */}
        <div className="hidden md:flex items-center gap-3 text-accent/65">
          <span>PORTFOLIO_BUILD // V2.2</span>
        </div>

      </div>

      {/* MOBILE ONLY STATUS BUTTON */}
      <button 
        onClick={openStatusPanel}
        className="lg:hidden absolute top-[-18px] left-1/2 -translate-x-1/2 px-4 py-1 bg-zinc-950 border border-dashed border-accent text-[9px] font-mono tracking-widest text-accent hover:bg-accent/15 transition-all rounded-full shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] cursor-pointer flex items-center gap-1.5"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
        </span>
        [ MONITOR ME ]
      </button>

    </footer>
  );
}

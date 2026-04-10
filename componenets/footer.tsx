"use client";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-30 flex h-16 w-full flex-col items-center justify-center border-t border-dashed border-cyan-400 bg-[var(--surface-bg)] text-center text-cyan-300">

      {/* TEXT */}
      <p className="text-sm tracking-widest">
        © {new Date().getFullYear()} MAX CLEETUS
      </p>

      {/* SUBTEXT */}
      <p className="text-xs text-cyan-500 mt-1">
        Built with Next.js ⚡
      </p>

    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            // We shouldn't revert to "auto" if the app's layout enforces "overflow-hidden" on body, 
            // but Next.js might need it. We'll leave it as hidden since layout.tsx has overflow-hidden on body.
          }, 600); // brief delay before fading out
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black font-mono text-cyan-400"
        >
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* scanline */}
          <motion.div 
            className="absolute left-0 right-0 h-[2px] bg-cyan-400/60 shadow-[0_0_10px_#22d3ee] pointer-events-none z-10"
            animate={{ top: ["-10%", "110%"] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[280px] md:max-w-sm px-6">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-lg sm:text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] font-bold drop-shadow-[0_0_10px_#22d3ee] mb-4 text-center"
            >
              INITIALIZING...
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full h-2 md:h-3 border border-cyan-400/50 rounded-full overflow-hidden bg-black/50 relative shadow-[0_0_15px_rgba(34,211,238,0.2)] p-[1px]">
              <motion.div
                className="h-full bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "circOut" }}
              />
            </div>

            <div className="flex justify-between w-full text-[10px] md:text-xs tracking-widest text-cyan-200/80 uppercase">
              <span>BOOT_SEQ</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>

            <div className="text-[10px] md:text-xs text-cyan-500/60 mt-8 h-4 w-full flex justify-center tracking-widest">
               <motion.span
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ repeat: Infinity, duration: 0.6, repeatType: "reverse" }}
               >
                 {progress >= 100 ? "SYSTEM READY" : "LOADING ASSETS"}
               </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

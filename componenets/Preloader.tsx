"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Revert preloader screen after 1.8 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(15px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black font-mono text-accent select-none"
        >
          {/* Custom Animation Keyframes Injection */}
          <style>{`
            .preloader-word {
              font-size: 1.5rem;
              font-weight: 800;
              text-transform: uppercase;
              color: #fff;
              letter-spacing: 0.1em;
              opacity: 0;
              clip-path: inset(0 100% 0 0);
              animation: clipRevealFromLeft 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards, glowPulse 2s infinite ease-in-out;
            }
            @keyframes clipRevealFromLeft {
              0% {
                clip-path: inset(0 100% 0 0);
                letter-spacing: 0.05em;
                opacity: 0;
              }
              15% {
                opacity: 1;
              }
              100% {
                clip-path: inset(0 0 0 0);
                letter-spacing: 0.22em;
                opacity: 1;
              }
            }
            @keyframes glowPulse {
              0%, 100% { text-shadow: 0 0 6px rgba(var(--accent-rgb), 0.3); }
              50% { text-shadow: 0 0 15px rgba(var(--accent-rgb), 0.7), 0 0 25px rgba(var(--accent-rgb), 0.3); }
            }
          `}</style>

          {/* Symmetrical Left-to-Right Reveal with Smaller Font Size */}
          <h1 className="preloader-word">
            MAX CLEETUS
          </h1>

          {/* Minimalist target bracket corners */}
          <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-accent/20" />
          <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-accent/20" />
          <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-accent/20" />
          <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-accent/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

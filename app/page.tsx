"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import About from "@/componenets/LeftAbout";
import BottomProject from "@/componenets/bottomProject";
import RightContact from "../componenets/contactRight";

type PanelName = "about" | "project" | "contact" | null;

function getPanelFromHash(hash: string): PanelName {
  const panel = hash.replace("#", "").toLowerCase();

  if (panel === "about" || panel === "project" || panel === "contact") {
    return panel;
  }

  return null;
}

export default function Home() {
  const [activePanel, setActivePanel] = useState<PanelName>(null);

  useEffect(() => {
    const syncPanelWithHash = () => {
      setActivePanel(getPanelFromHash(window.location.hash));
    };

    const handlePanelChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ panel: PanelName }>;
      const nextPanel = customEvent.detail?.panel ?? null;

      if (nextPanel) {
        window.history.replaceState(null, "", `/#${nextPanel}`);
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }

      setActivePanel(nextPanel);
    };

    syncPanelWithHash();
    window.addEventListener("hashchange", syncPanelWithHash);
    window.addEventListener("portfolio-panel-change", handlePanelChange);

    return () => {
      window.removeEventListener("hashchange", syncPanelWithHash);
      window.removeEventListener("portfolio-panel-change", handlePanelChange);
    };
  }, []);

  const openPanel = (panel: Exclude<PanelName, null>) => {
    window.location.hash = panel;
  };

  const closePanels = () => {
    window.history.replaceState(null, "", window.location.pathname);
    setActivePanel(null);
  };

  return (
    <main className="absolute top-[73px] bottom-[64px] left-0 right-0 w-full bg-transparent z-10 text-white overflow-hidden">

      {/* 🔹 LEFT HERO ORNAMENT - FUNCTIONAL SOCIALS */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-1 sm:left-4 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 md:gap-6 z-20 pointer-events-auto"
      >
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-cyan-400/60 hover:text-cyan-200 text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest rotate-180 transition-colors duration-300 hover:drop-shadow-[0_0_8px_#22d3ee] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>// GITHUB</a>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-cyan-400/60 hover:text-cyan-200 text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest rotate-180 transition-colors duration-300 hover:drop-shadow-[0_0_8px_#22d3ee] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>// LINKEDIN</a>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-cyan-400/60 hover:text-cyan-200 text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest rotate-180 transition-colors duration-300 hover:drop-shadow-[0_0_8px_#22d3ee] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>// X_CORP</a>
      </motion.div>

      {/* 🔹 RIGHT HERO ORNAMENT - FUNCTIONAL ACTIONS */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute right-1 sm:right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 md:gap-6 z-20 pointer-events-auto"
      >
        <button onClick={() => openPanel("about")} className="text-cyan-400/60 hover:text-cyan-200 text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest transition-colors duration-300 hover:drop-shadow-[0_0_8px_#22d3ee] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>[ DATABASE ]</button>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
        <a href="mailto:contact@example.com" className="text-cyan-400/60 hover:text-cyan-200 text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest transition-colors duration-300 hover:drop-shadow-[0_0_8px_#22d3ee] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>[ COMMS ]</a>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
        <button onClick={() => openPanel("contact")} className="text-cyan-400/60 hover:text-cyan-200 text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest transition-colors duration-300 hover:drop-shadow-[0_0_8px_#22d3ee] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>[ UPLINK ]</button>
      </motion.div>

      {/* ✅ PANELS */}
      <About isOpen={activePanel === "about"} />
      <BottomProject isOpen={activePanel === "project"} />
      <RightContact isOpen={activePanel === "contact"} />

      {/* ✅ OVERLAY */}
      {activePanel && (
        <div
          onClick={closePanels}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* 🧑‍💻 MAIN CONTENT */}
      <div className="relative z-10 w-full h-full overflow-y-auto hide-scrollbar flex flex-col px-2 md:px-6">
        <div className="my-auto w-full flex flex-col items-center text-center space-y-4 md:space-y-6 py-6 md:py-10">

        {/* 🔹 ANIMATED EYES AT TOP */}
        <div className="w-full flex justify-center gap-8 sm:gap-12 md:gap-16 opacity-90 transition-opacity duration-1000 z-10 pb-2 md:pb-6">
          <motion.div
            animate={{
              scaleY: [1, 0.1, 1, 1, 1, 1],
              opacity: [0.8, 1, 0.8, 0.8, 0.8, 0.8]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              times: [0, 0.05, 0.1, 0.5, 0.55, 1],
              ease: "easeInOut"
            }}
            className="w-4 h-1 sm:w-6 sm:h-1.5 md:w-10 md:h-2 bg-cyan-300 rounded-full shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee]"
          />
          <motion.div
            animate={{
              scaleY: [1, 0.1, 1, 1, 1, 1],
              opacity: [0.8, 1, 0.8, 0.8, 0.8, 0.8]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              times: [0, 0.05, 0.1, 0.5, 0.55, 1],
              ease: "easeInOut"
            }}
            className="w-4 h-1 sm:w-6 sm:h-1.5 md:w-10 md:h-2 bg-cyan-300 rounded-full shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee]"
          />
        </div>

        {/* TOP STATUS */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center pb-1 md:pb-4"
        >
          <span className="px-3 md:px-4 py-1.5 md:py-1 border border-cyan-400/30 rounded-full text-xs md:text-xs tracking-[0.2em] text-cyan-300 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            SYSTEM_ONLINE
          </span>
        </motion.div>

        {/* HUD IMAGE */}
        <div className="flex justify-center relative cursor-crosshair z-20 mt-2 lg:mt-8">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 group p-1 md:p-2 lg:p-3">
            
            {/* 🔹 HUD CORNER BRACKETS */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

            {/* MAIN IMAGE CONTAINER */}
            <div className="w-full h-full relative overflow-hidden ring-1 ring-cyan-400/20 group-hover:ring-cyan-400/60 transition-all duration-700 bg-cyan-950/20 shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.3)]">
              <div className="w-full h-full relative overflow-hidden">
                <Image
                  src="/black.jpeg"
                  alt="profile"
                  width={256}
                  height={256}
                  priority
                  className="object-cover object-top w-full h-full group-hover:scale-105 transition-all duration-[1s] ease-out filter grayscale-[30%] group-hover:grayscale-0 brightness-110"
                />
                
                {/* 🔹 SCANLINE ANIMATION */}
                <motion.div 
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400/60 shadow-[0_0_10px_#22d3ee] pointer-events-none"
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                />
                
                {/* TINT OVERLAY */}
                <div className="absolute inset-0 bg-cyan-400/5 mix-blend-overlay pointer-events-none" />
              </div>
            </div>

            {/* DECORATIVE HUD ELEMENTS */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
              <div className="w-1 h-5 bg-cyan-400" />
              <div className="w-1 h-3 bg-cyan-400/60" />
              <div className="w-1 h-2 bg-cyan-400/30" />
            </div>
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 items-end">
              <div className="w-1 h-2 bg-cyan-400/30" />
              <div className="w-1 h-3 bg-cyan-400/60" />
              <div className="w-1 h-5 bg-cyan-400" />
            </div>
            
            {/* HUD TEXT EXTRAS */}
            <p className="absolute -bottom-6 left-0 text-[10px] tracking-widest font-mono text-cyan-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
              SEQ: 894321
            </p>
            <p className="absolute -bottom-6 right-0 text-[10px] tracking-widest font-mono text-cyan-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
              LOC: SEC-9
            </p>

          </div>
        </div>

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] lg:leading-tight font-bold text-cyan-400 tracking-widest lg:tracking-[0.2em] drop-shadow-[0_0_15px_#22d3ee] lg:drop-shadow-[0_0_25px_#22d3ee] mt-4 lg:mt-6"
        >
          MAX CLEETUS
        </motion.h1>

        {/* ROLE */}
        <p className="text-cyan-200 tracking-wider md:tracking-widest lg:tracking-[0.3em] text-[11px] sm:text-sm md:text-base lg:text-lg lg:mt-2">
          MERN STACK DEVELOPER • NEXT.JS • AI
        </p>

        {/* BUTTONS */}
        <div className="flex gap-3 sm:gap-4 lg:gap-6 justify-center flex-wrap pt-2 lg:pt-6">

          {/* ABOUT */}
          <button
            onClick={() => openPanel("about")}
            className="px-5 py-2 md:px-6 md:py-2 lg:px-8 lg:py-3 text-[11px] md:text-base lg:text-sm lg:font-bold border border-dashed border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee] lg:hover:shadow-[0_0_20px_#22d3ee] transition-all"
          >
            ABOUT
          </button>

          {/* PROJECT */}
          <button
            onClick={() => openPanel("project")}
            className="px-5 py-2 md:px-6 md:py-2 lg:px-8 lg:py-3 text-[11px] md:text-base lg:text-sm lg:font-bold border border-dashed border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee] lg:hover:shadow-[0_0_20px_#22d3ee] transition-all"
          >
            PROJECT
          </button>

          {/* ✅ CONTACT (NOW WORKS) */}
          <button
            onClick={() => openPanel("contact")}
            className="px-5 py-2 md:px-6 md:py-2 lg:px-8 lg:py-3 text-[11px] md:text-base lg:text-sm lg:font-bold border border-dashed border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee] lg:hover:shadow-[0_0_20px_#22d3ee] transition-all"
          >
            CONTACT
          </button>

        </div>
        </div>
      </div>
    </main>
  );
}

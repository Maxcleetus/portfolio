"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import About from "@/componenets/LeftAbout";
import BottomProject from "@/componenets/bottomProject";
import RightContact from "../componenets/contactRight";
import Experience from "@/componenets/Experience";
import ProjectSlider from "@/componenets/ProjectSlider";
import ActiveProjectBox from "@/componenets/ActiveProjectBox";
import GithubContributions from "@/componenets/GithubContributions";
import SpotlightCard from "@/componenets/SpotlightCard";
import StatusDrawer from "@/componenets/StatusDrawer";
import ShinyText from "@/componenets/ShinyText";
import SplitText from "@/componenets/SplitText";
import Diagnostics from "@/componenets/Diagnostics";
import GlitchText from "@/componenets/GlitchText";

type PanelName = "about" | "project" | "contact" | "experience" | "status" | null;

function getPanelFromHash(hash: string): PanelName {
  const panel = hash.replace("#", "").toLowerCase();

  if (panel === "about" || panel === "project" || panel === "contact" || panel === "experience" || panel === "status") {
    return panel;
  }

  return null;
}

export default function Home() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState<PanelName>(null);
  const [highlightedPanel, setHighlightedPanel] = useState<PanelName>(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [clientName, setClientName] = useState("");
  const [workName, setWorkName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  // Drawer panels stay open until closed.
  const openPanel = (panel: Exclude<PanelName, null>) => {
    setActivePanel(panel);
    window.history.replaceState(null, "", `/#${panel}`);
  };

  const closePanels = () => {
    setActivePanel(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <>
      <main className="absolute top-[73px] bottom-[64px] left-0 right-0 w-full bg-transparent z-10 text-white overflow-hidden flex flex-col">

      {/* 🖥️ DESKTOP DASHBOARD GRID (lg and above) */}
      <div className="hidden lg:grid grid-cols-12 gap-6 w-full h-full p-6 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* COLUMN 1: TERMINAL & CONDENSED ABOUT (Left) */}
        <div className="col-span-3 h-full flex flex-col gap-4 overflow-hidden">
          {/* ACTIVE WORKSPACE STATUS */}
          <div className="flex-[1.4] min-h-[260px] overflow-hidden">
            <ActiveProjectBox />
          </div>

          {/* GITHUB CONTRIBUTIONS CARD */}
          <SpotlightCard 
            className={`flex-1 flex flex-col justify-between px-3 py-4 border border-dashed rounded-lg bg-[rgba(var(--accent-rgb),0.02)] ${
              highlightedPanel === "about" ? "animate-pulse-glow" : ""
            }`}
          >
            <div>
              <h2 className="text-sm font-bold text-white mb-2 tracking-widest uppercase">
                <GlitchText text="GitHub Contributions" speed={30} triggerOnHover={true} />
              </h2>
              <div className="space-y-3 text-accent/80 text-xs font-mono leading-relaxed">
                {/* Dynamic GitHub Contributions Heatmap */}
                <GithubContributions />
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* COLUMN 2: CENTER HERO PROFILE */}
        <div className="col-span-6 h-full flex flex-col justify-between p-6 border border-accent/20 bg-zinc-950/15 shadow-[inset_0_0_20px_rgba(var(--accent-rgb),0.05)] rounded-lg relative overflow-hidden group">
          {/* Cyber Corners for Hero Section */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/60 group-hover:border-accent group-hover:scale-105 transition-all duration-300 pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/60 group-hover:border-accent group-hover:scale-105 transition-all duration-300 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/60 group-hover:border-accent group-hover:scale-105 transition-all duration-300 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/60 group-hover:border-accent group-hover:scale-105 transition-all duration-300 pointer-events-none" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.04),transparent_70%)] pointer-events-none" />

          {/* Top animated eyes */}
          <div className="w-full flex justify-center gap-12 opacity-90 pb-2 z-10">
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
              className="w-8 h-1.5 bg-accent/90 rounded-full shadow-[0_0_15px_var(--accent),0_0_30px_var(--accent)]"
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
              className="w-8 h-1.5 bg-accent/90 rounded-full shadow-[0_0_15px_var(--accent),0_0_30px_var(--accent)]"
            />
          </div>

          {/* HUD Status */}
          <div className="flex flex-col items-center z-10 mt-6">
            <span className="px-4 py-1 border border-accent/30 rounded-full text-xs tracking-[0.2em] text-accent bg-accent/10 shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)] font-mono">
              SYSTEM_ONLINE
            </span>
          </div>

          {/* Profile HUD Avatar */}
          <div className="flex justify-center relative cursor-crosshair z-20 my-auto">
            <div className="relative w-56 h-56 xl:w-64 xl:h-64 group p-2">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-full h-full relative overflow-hidden ring-1 ring-accent/30 group-hover:ring-accent/80 transition-all duration-700 bg-accent/10 shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)] group-hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.3)]">
                <Image
                  src="/black.jpeg"
                  alt="profile"
                  width={256}
                  height={256}
                  priority
                  className="object-cover object-top w-full h-full group-hover:scale-105 transition-all duration-[1s] ease-out filter grayscale-[20%] group-hover:grayscale-0 brightness-110"
                />
                
                {/* scanline */}
                <motion.div 
                  className="absolute left-0 right-0 h-[2px] bg-accent/60 shadow-[0_0_10px_var(--accent)] pointer-events-none"
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay pointer-events-none" />
              </div>

              <p className="absolute -bottom-6 left-0 text-[10px] tracking-widest font-mono text-accent/60">
                SEQ: 894321
              </p>
              <p className="absolute -bottom-6 right-0 text-[10px] tracking-widest font-mono text-accent/60">
                LOC: SEC-9
              </p>
            </div>
          </div>

          {/* Name & Title */}
          <div className="text-center z-10 mt-6">
            <h1 className="text-5xl xl:text-6xl font-bold text-accent tracking-[0.2em] drop-shadow-[0_0_15px_var(--accent)] mb-2">
              <GlitchText text="MAX CLEETUS" speed={40} triggerOnHover={true} />
            </h1>
            <p className="text-accent/90 tracking-[0.2em] text-[10px] xl:text-xs font-mono">
              <ShinyText text="FREELANCE MOBILE APP & WEB DEVELOPER" speed={4} />
            </p>
          </div>

          {/* Nav Action buttons */}
          <div className="flex gap-3 justify-center z-10 mt-4 flex-wrap">
            <button
              onClick={() => openPanel("about")}
              className="px-5 py-1.5 border border-dashed border-accent text-xs font-mono tracking-widest hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] transition-all cursor-pointer"
            >
              [ ABOUT ]
            </button>
            <button
              onClick={() => openPanel("experience")}
              className="px-5 py-1.5 border border-dashed border-accent text-xs font-mono tracking-widest hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] transition-all cursor-pointer"
            >
              [ EXP ]
            </button>
            <button
              onClick={() => openPanel("project")}
              className="px-5 py-1.5 border border-dashed border-accent text-xs font-mono tracking-widest hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] transition-all cursor-pointer"
            >
              [ PROJ ]
            </button>
            <button
              onClick={() => openPanel("contact")}
              className="px-5 py-1.5 border border-dashed border-accent text-xs font-mono tracking-widest hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] transition-all cursor-pointer"
            >
              [ CONTACT ]
            </button>
            <button
              onClick={() => setShowHireModal(true)}
              className="px-5 py-1.5 border border-accent text-accent bg-accent/5 text-xs font-mono tracking-widest hover:bg-accent/15 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] transition-all cursor-pointer rounded animate-pulse-glow"
            >
              [ BOOK WORK ]
            </button>
          </div>
        </div>

        {/* COLUMN 3: PROJECTS & DIAGNOSTICS (Right) */}
        <div className="col-span-3 h-full flex flex-col gap-6 overflow-hidden">
          <SpotlightCard 
            className={`flex-[1.3] flex flex-col p-6 border border-dashed rounded-lg bg-[rgba(var(--accent-rgb),0.02)] ${
              highlightedPanel === "project" ? "animate-pulse-glow" : ""
            }`}
          >
            <h2 className="text-xl font-bold text-white mb-4 tracking-widest uppercase">
              <GlitchText text="Project Highlights" speed={30} triggerOnHover={true} />
            </h2>
            
            <ProjectSlider />
          </SpotlightCard>

          {/* DIAGNOSTICS CARD */}
          <div className="flex-1 overflow-hidden">
            <Diagnostics />
          </div>
        </div>

      </div>

      {/* 📱 MOBILE VIEW (lg hidden) */}
      <div className="lg:hidden relative z-10 w-full h-full overflow-hidden flex flex-col px-2 md:px-6">
        
        {/* 🔹 LEFT HERO ORNAMENT - FUNCTIONAL SOCIALS */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute left-1 sm:left-4 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 md:gap-6 z-20 pointer-events-auto"
        >
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-accent/60 hover:text-accent text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest rotate-180 transition-colors duration-300 hover:drop-shadow-[0_0_8px_var(--accent)] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>// GITHUB</a>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-accent/60 hover:text-accent text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest rotate-180 transition-colors duration-300 hover:drop-shadow-[0_0_8px_var(--accent)] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>// LINKEDIN</a>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-accent/60 hover:text-accent text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest rotate-180 transition-colors duration-300 hover:drop-shadow-[0_0_8px_var(--accent)] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>// INSTAGRAM</a>
        </motion.div>

        {/* 🔹 RIGHT HERO ORNAMENT - FUNCTIONAL SOCIALS (SYMMETRIC) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute right-1 sm:right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 md:gap-6 z-20 pointer-events-auto"
        >
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-accent/60 hover:text-accent text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest rotate-180 transition-colors duration-300 hover:drop-shadow-[0_0_8px_var(--accent)] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>// INSTAGRAM</a>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-accent/60 hover:text-accent text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest rotate-180 transition-colors duration-300 hover:drop-shadow-[0_0_8px_var(--accent)] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>// LINKEDIN</a>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-accent/60 hover:text-accent text-[10px] sm:text-[11px] md:text-xs font-mono tracking-widest rotate-180 transition-colors duration-300 hover:drop-shadow-[0_0_8px_var(--accent)] cursor-pointer" style={{ writingMode: 'vertical-rl' }}>// GITHUB</a>
        </motion.div>

        <div className="my-auto w-full flex flex-col items-center text-center space-y-2.5 sm:space-y-4 md:space-y-6 py-2 sm:py-6 md:py-10">

          {/* 🔹 ANIMATED EYES AT TOP */}
          <div className="w-full flex justify-center gap-8 sm:gap-12 md:gap-16 opacity-90 transition-opacity duration-1000 z-10 pb-1 sm:pb-3 md:pb-6">
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
              className="w-4 h-1 sm:w-6 sm:h-1.5 md:w-10 md:h-2 bg-accent/90 rounded-full shadow-[0_0_15px_var(--accent),0_0_30px_var(--accent)]"
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
              className="w-4 h-1 sm:w-6 sm:h-1.5 md:w-10 md:h-2 bg-accent/90 rounded-full shadow-[0_0_15px_var(--accent),0_0_30px_var(--accent)]"
            />
          </div>

          {/* TOP STATUS */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center pb-1 sm:pb-2 md:pb-4"
          >
            <span className="px-3 md:px-4 py-1 border border-accent/30 rounded-full text-[10px] md:text-xs tracking-[0.2em] text-accent bg-accent/10 shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]">
              SYSTEM_ONLINE
            </span>
          </motion.div>

          {/* HUD IMAGE */}
          <div className="flex justify-center relative cursor-crosshair z-20 mt-1 lg:mt-8">
            <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-44 sm:h-44 md:w-64 md:h-64 lg:w-80 lg:h-80 group p-1">
              
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-full h-full relative overflow-hidden ring-1 ring-accent/20 group-hover:ring-accent/60 transition-all duration-700 bg-accent/10 shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)] group-hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.3)]">
                <div className="w-full h-full relative overflow-hidden">
                  <Image
                    src="/black.jpeg"
                    alt="profile"
                    width={256}
                    height={256}
                    priority
                    className="object-cover object-top w-full h-full group-hover:scale-105 transition-all duration-[1s] ease-out filter grayscale-[30%] group-hover:grayscale-0 brightness-110"
                  />
                  
                  <motion.div 
                    className="absolute left-0 right-0 h-[2px] bg-accent/60 shadow-[0_0_10px_var(--accent)] pointer-events-none"
                    animate={{ top: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  />
                  
                  <div className="absolute inset-0 bg-accent/5 mix-blend-overlay pointer-events-none" />
                </div>
              </div>

              <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                <div className="w-1 h-5 bg-accent" />
                <div className="w-1 h-3 bg-accent/60" />
                <div className="w-1 h-2 bg-accent/30" />
              </div>
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 items-end">
                <div className="w-1 h-2 bg-accent/30" />
                <div className="w-1 h-3 bg-accent/60" />
                <div className="w-1 h-5 bg-accent" />
              </div>
              
              <p className="absolute -bottom-6 left-0 text-[10px] tracking-widest font-mono text-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                SEQ: 894321
              </p>
              <p className="absolute -bottom-6 right-0 text-[10px] tracking-widest font-mono text-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                LOC: SEC-9
              </p>

            </div>
          </div>

          {/* NAME */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl md:text-6xl lg:text-[5rem] lg:leading-tight font-bold text-accent tracking-widest lg:tracking-[0.2em] drop-shadow-[0_0_15px_var(--accent)] lg:drop-shadow-[0_0_25px_var(--accent)] mt-2 lg:mt-6"
          >
            <GlitchText text="MAX CLEETUS" speed={40} triggerOnHover={true} />
          </motion.h1>

          {/* ROLE */}
          <p className="text-accent/90 tracking-wider md:tracking-widest lg:tracking-[0.2em] text-[9px] sm:text-xs md:text-sm lg:text-base lg:mt-2">
            FREELANCE MOBILE APP & WEB DEVELOPER
          </p>

          {/* BOOK WORK BUTTON */}
          <div className="flex justify-center mt-3 mb-4">
            <button
              onClick={() => setShowHireModal(true)}
              className="px-6 py-2 text-[11px] sm:text-xs md:text-sm font-mono font-bold border border-accent text-accent bg-accent/5 hover:bg-accent/15 hover:shadow-[0_0_12px_var(--accent)] transition-all cursor-pointer whitespace-nowrap rounded animate-pulse-glow"
            >
              [ BOOK WORK ]
            </button>
          </div>

          {/* 4 NAVIGATION BUTTONS */}
          <div className="flex gap-2.5 sm:gap-4 justify-center flex-wrap pt-2 pb-10">

            <button
              onClick={() => openPanel("about")}
              className="px-3.5 py-2 text-[10px] sm:text-xs font-bold border border-dashed border-accent hover:bg-accent/10 hover:shadow-[0_0_10px_var(--accent)] transition-all cursor-pointer whitespace-nowrap"
            >
              ABOUT
            </button>

            <button
              onClick={() => openPanel("experience")}
              className="px-3.5 py-2 text-[10px] sm:text-xs font-bold border border-dashed border-accent hover:bg-accent/10 hover:shadow-[0_0_10px_var(--accent)] transition-all cursor-pointer whitespace-nowrap"
            >
              EXP
            </button>

            <button
              onClick={() => openPanel("project")}
              className="px-3.5 py-2 text-[10px] sm:text-xs font-bold border border-dashed border-accent hover:bg-accent/10 hover:shadow-[0_0_10px_var(--accent)] transition-all cursor-pointer whitespace-nowrap"
            >
              PROJ
            </button>

            <button
              onClick={() => openPanel("contact")}
              className="px-3.5 py-2 text-[10px] sm:text-xs font-bold border border-dashed border-accent hover:bg-accent/10 hover:shadow-[0_0_10px_var(--accent)] transition-all cursor-pointer whitespace-nowrap"
            >
              CONTACT
            </button>

          </div>
        </div>
      </div>

    </main>

    {/* ✅ DRAWER PANELS OUTSIDE OF MAIN STACKING CONTEXT */}
    <div className="relative z-[60]">
      <About isOpen={activePanel === "about"} />
      <Experience isOpen={activePanel === "experience"} />
      <BottomProject isOpen={activePanel === "project"} />
      <RightContact isOpen={activePanel === "contact"} />
      <StatusDrawer isOpen={activePanel === "status"} />
      {activePanel && (
        <div
          onClick={closePanels}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
        />
      )}

      {/* ✅ BOOK WORK MODAL OVERLAY */}
      {showHireModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => {
              setShowHireModal(false);
              setFormSubmitted(false);
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />
          {/* Modal Content */}
          <div className="relative w-full max-w-md border border-accent bg-zinc-950 p-6 rounded-lg shadow-[0_0_50px_rgba(var(--accent-rgb),0.35)] select-none font-mono">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-dashed border-accent/25 pb-3 mb-4">
              <span className="text-[10px] sm:text-xs font-bold text-accent tracking-widest uppercase">// BOOK_WORK</span>
              <button
                onClick={() => {
                  setShowHireModal(false);
                  setFormSubmitted(false);
                }}
                className="text-accent/70 hover:text-accent font-mono text-[10px] sm:text-xs cursor-pointer border border-dashed border-accent/20 px-2.5 py-0.5 rounded hover:bg-accent/10 transition-colors"
              >
                [ X ]
              </button>
            </div>

            {formSubmitted ? (
              /* Success / Transmitted State */
              <div className="space-y-4 py-4 text-center">
                <div className="text-accent text-lg font-bold tracking-widest animate-pulse">// TRANSMISSION_SUCCESSFUL</div>
                <p className="text-white text-xs leading-relaxed max-w-xs mx-auto">
                  Dossier request for <span className="text-accent font-bold">"{workName}"</span> by <span className="text-accent font-bold">{clientName}</span> has been compiled and logged. Max will reach out to you at <span className="text-accent font-bold">{clientPhone}</span> shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setClientName("");
                      setWorkName("");
                      setClientPhone("");
                      setShowHireModal(false);
                    }}
                    className="px-5 py-2 border border-dashed border-accent text-accent bg-accent/5 hover:bg-accent/15 hover:shadow-[0_0_10px_var(--accent)] transition-all font-mono text-xs cursor-pointer rounded"
                  >
                    [ DISMISS / SHUTDOWN ]
                  </button>
                </div>
              </div>
            ) : (
              /* Lead Form State */
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (clientName.trim() && workName.trim() && clientPhone.trim()) {
                    setFormSubmitted(true);
                  }
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1">
                  <span className="text-[9px] text-accent/50 block">// CLIENT_IDENTITY:</span>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="ENTER YOUR NAME"
                    className="w-full bg-zinc-900/90 border border-accent/20 rounded px-3 py-2 text-white text-xs font-mono focus:border-accent focus:outline-none placeholder-accent/30 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-accent/50 block">// WORK_DESCRIPTION:</span>
                  <input
                    type="text"
                    required
                    value={workName}
                    onChange={(e) => setWorkName(e.target.value)}
                    placeholder="E.G. ECOMMERCE APP / AI CHATBOT"
                    className="w-full bg-zinc-900/90 border border-accent/20 rounded px-3 py-2 text-white text-xs font-mono focus:border-accent focus:outline-none placeholder-accent/30 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-accent/50 block">// SECURE_PHONE_COORDINATE:</span>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="CONTACT PHONE NUMBER"
                    className="w-full bg-zinc-900/90 border border-accent/20 rounded px-3 py-2 text-white text-xs font-mono focus:border-accent focus:outline-none placeholder-accent/30 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 border border-accent text-accent bg-accent/5 font-mono text-xs hover:bg-accent/15 cursor-pointer rounded transition-all shadow-[0_0_10px_rgba(var(--accent-rgb),0.1)] hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] font-bold tracking-widest"
                  >
                    [ TRANSMIT_WORK_REQUEST ]
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="mt-5 text-center text-[8px] text-accent/30 border-t border-dashed border-accent/10 pt-2.5">
              // SECURE CONNECTION ESTABLISHED
            </div>
          </div>
        </div>
      )}
    </div>
  </>
  );
}

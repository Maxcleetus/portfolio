"use client";

import { motion } from "framer-motion";
import ActiveProjectBox from "./ActiveProjectBox";
import GithubContributions from "./GithubContributions";
import ProjectSlider from "./ProjectSlider";
import Diagnostics from "./Diagnostics";
import SpotlightCard from "./SpotlightCard";
import GlitchText from "./GlitchText";

interface StatusDrawerProps {
  isOpen: boolean;
}

export default function StatusDrawer({ isOpen }: StatusDrawerProps) {
  const closePanel = () => {
    window.history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new CustomEvent("portfolio-panel-change", { detail: { panel: null } }));
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 220 }}
      className="fixed bottom-0 left-0 w-full h-[90vh] bg-[var(--surface-bg)] text-white z-[60] flex flex-col justify-start border-t border-dashed border-accent rounded-t-2xl shadow-[0_-10px_50px_rgba(var(--accent-rgb),0.3)] overflow-hidden"
    >
      {/* Top Header / Drag indicator handles */}
      <div className="flex flex-col items-center pt-3 pb-2 bg-zinc-950/80 border-b border-dashed border-accent/25 px-6">
        <div className="w-12 h-1 bg-accent/30 rounded-full mb-3" />
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] font-mono text-accent/80 tracking-widest">// DEEP_DIAGNOSTICS: ONLINE</span>
          <button 
            onClick={closePanel}
            className="text-xs font-mono text-accent hover:text-white transition-colors duration-300 cursor-pointer border border-dashed border-accent/30 px-3 py-1 rounded bg-accent/5"
          >
            &lt;= [ CLOSE ]
          </button>
        </div>
      </div>

      {/* Content wrapper with scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 hide-scrollbar pb-24">
        
        {/* Card 1: Active Work Node */}
        <div className="min-h-[260px]">
          <ActiveProjectBox />
        </div>

        {/* Card 2: System Diagnostics */}
        <div>
          <Diagnostics />
        </div>

        {/* Card 3: Project Highlights */}
        <SpotlightCard className="flex flex-col p-6 border border-dashed rounded-lg bg-[rgba(var(--accent-rgb),0.02)]">
          <h2 className="text-xl font-bold text-white mb-4 tracking-widest uppercase">
            <GlitchText text="Project Highlights" speed={30} triggerOnHover={true} />
          </h2>
          <ProjectSlider />
        </SpotlightCard>

        {/* Card 4: GitHub Contributions */}
        <SpotlightCard className="flex flex-col px-4 py-5 border border-dashed rounded-lg bg-[rgba(var(--accent-rgb),0.02)]">
          <div>
            <h2 className="text-sm font-bold text-white mb-3 tracking-widest uppercase">
              <GlitchText text="GitHub Contributions" speed={30} triggerOnHover={true} />
            </h2>
            <div className="space-y-3 text-accent/80 text-xs font-mono leading-relaxed overflow-x-auto hide-scrollbar">
              <GithubContributions />
            </div>
          </div>
        </SpotlightCard>

      </div>
    </motion.div>
  );
}

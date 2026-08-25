"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SpotlightCard from "@/componenets/SpotlightCard";
import ShinyText from "@/componenets/ShinyText";
import GlitchText from "@/componenets/GlitchText";

export default function About({ isOpen }: { isOpen: boolean }) {
  const closePanel = () => {
    window.history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new CustomEvent("portfolio-panel-change", { detail: { panel: null } }));
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full lg:w-1/2 h-screen bg-[var(--surface-bg)] text-white z-[60] flex flex-col justify-start pt-10 pb-24 px-6 sm:px-12 border-r border-dashed border-accent overflow-y-auto hide-scrollbar"
    >
      {/* Top Bar / Close Actions */}
      <div className="flex justify-between items-center border-b border-dashed border-accent/20 pb-4 mb-6">
        <span className="text-[10px] font-mono text-accent/60 hidden sm:inline">// STATUS: CONNECTED</span>
        <button 
          onClick={closePanel}
          className="text-xs font-mono text-accent hover:text-white transition-colors duration-300 cursor-pointer"
        >
          &lt;= [ BACK_TO_CONSOLE ]
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-widest text-accent uppercase mb-6">
        <GlitchText text="Personnel Dossier: Max Cleetus" />
      </h1>

      {/* Inner Dossier Grid */}
      <div className="space-y-6">
        {/* Avatar and bio card */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-4 flex justify-center">
            <div className="relative w-32 h-32 p-1 border border-dashed border-accent/40 bg-accent/5 rounded">
              <Image
                src="/black.jpeg"
                alt="profile"
                width={128}
                height={128}
                className="object-cover object-top w-full h-full filter grayscale-[10%]"
              />
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
            </div>
          </div>
          <div className="sm:col-span-8 space-y-2">
            <span className="px-2 py-0.5 border border-accent/30 rounded text-[10px] font-mono text-accent bg-accent/5">
              ACTIVE_LINK_OPERATIONAL
            </span>
            <div className="font-mono text-xs text-accent/80 leading-relaxed">
              <p>I am a full-stack software engineer specialized in building scalable MERN + Next.js web applications, integrated with deep learning classifications and elegant retro HUD interfaces.</p>
            </div>
          </div>
        </div>

        {/* Detailed Competency Meters */}
        <SpotlightCard className="p-4">
          <h2 className="text-sm font-bold text-accent mb-3 tracking-widest uppercase">
            <ShinyText text="Technical Indices" />
          </h2>
          <div className="space-y-3 font-mono text-[10px] text-accent/90">
            <div>
              <div className="flex justify-between mb-0.5">
                <span>FRONTEND SYSTEMS (React/Next/Tailwind)</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-accent/10 h-1.5 border border-dashed border-accent/20 rounded overflow-hidden p-[1px]">
                <div className="bg-accent h-full rounded" style={{ width: "95%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-0.5">
                <span>BACKEND SYSTEMS (Node/Express/Go)</span>
                <span>88%</span>
              </div>
              <div className="w-full bg-accent/10 h-1.5 border border-dashed border-accent/20 rounded overflow-hidden p-[1px]">
                <div className="bg-accent h-full rounded" style={{ width: "88%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-0.5">
                <span>DATABASES (Mongo/Postgres/Mongoose)</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-accent/10 h-1.5 border border-dashed border-accent/20 rounded overflow-hidden p-[1px]">
                <div className="bg-accent h-full rounded" style={{ width: "85%" }} />
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Timeline Milestones */}
        <SpotlightCard className="p-4">
          <h2 className="text-sm font-bold text-accent mb-3 tracking-widest uppercase">
            <ShinyText text="System Milestones" />
          </h2>
          <div className="space-y-4 font-mono text-[10px] text-accent/80 border-l border-dashed border-accent/20 pl-4 ml-2">
            <div className="relative">
              <div className="absolute -left-[21px] top-0.5 w-2 h-2 rounded-full bg-accent" />
              <span className="text-[9px] text-accent/50">2025 - PRESENT</span>
              <h3 className="text-xs text-accent font-bold">SENIOR FULL-STACK ARCHITECT</h3>
              <p>Leading web initiatives utilizing Next.js 16/React 19 with integrated AI frameworks.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-0.5 w-2 h-2 rounded-full bg-accent/60" />
              <span className="text-[9px] text-accent/50">2024 - 2025</span>
              <h3 className="text-xs text-accent font-bold">MERN DEVELOPER</h3>
              <p>Built high-speed WebRTC peer nodes and community dashboards with multipart buffer pipes.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-0.5 w-2 h-2 rounded-full bg-accent/30" />
              <span className="text-[9px] text-accent/50">2023 - 2024</span>
              <h3 className="text-xs text-accent font-bold">AI RESEARCH ASSISTANT</h3>
              <p>Constructed Flask models for real-time video waste categorizations.</p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </motion.div>
  );
}

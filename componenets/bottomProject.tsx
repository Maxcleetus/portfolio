"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/componenets/SpotlightCard";
import ShinyText from "@/componenets/ShinyText";
import GlitchText from "@/componenets/GlitchText";

const DETAILED_PROJECTS = [
  {
    title: "Waste Detection AI",
    sub: "Deep Learning Classifier",
    desc: "A real-time image processing pipeline designed to classify and log garbage items from cameras. Built utilizing Flask APIs and trained Convolutional Neural Networks.",
    tech: ["Python", "Flask", "PyTorch", "OpenCV"],
    metrics: ["ACCURACY: 94.6%", "LATENCY: 42ms"],
    uplink: "https://github.com/Maxcleetus/waste-detection-ai",
  },
  {
    title: "Syllabus Tracker",
    sub: "AI-Powered Course Assistant",
    desc: "Next.js application featuring an interactive study tracker. Uses custom LLM wrappers to automatically map curriculum requirements, track progress logs, and respond to chatbot queries.",
    tech: ["Next.js", "TypeScript", "LangChain", "MongoDB"],
    metrics: ["DATABASE SYNC: 100%", "CHAT RESPONSE: <1s"],
    uplink: "https://github.com/Maxcleetus/syllabus-tracker",
  },
  {
    title: "Ritstream Video Chat",
    sub: "WebRTC Peer Chat & TURN Relay",
    desc: "A custom real-time video chat application featuring dynamic TURN authentication to resolve sym NAT packet blockings and provide low-latency WAN streaming previews.",
    tech: ["React Native", "WebRTC", "Socket.io", "Express"],
    metrics: ["UPLINK STABILITY: 99.8%", "FALLBACK: TURN"],
    uplink: "https://github.com/Maxcleetus/ritstream-chat",
  },
  {
    title: "ConnectRIT Dashboard",
    sub: "Campus Social Hub",
    desc: "A local campus community dashboard. Features MongoDB collection synchronization, Multer parsing for multipart forms, Cloudinary image hosting, and dynamic announcements.",
    tech: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    metrics: ["MEDIA UPTAKE: 50MB max", "DB STATE: ACTIVE"],
    uplink: "https://github.com/Maxcleetus/connectrit",
  },
];

export default function Project({ isOpen }: { isOpen: boolean }) {
  const closePanel = () => {
    window.history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new CustomEvent("portfolio-panel-change", { detail: { panel: null } }));
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 w-full h-[75vh] bg-[var(--surface-bg)] text-white z-[60] border-t border-dashed border-accent p-6 sm:p-10 pb-24 overflow-y-auto hide-scrollbar"
    >
      {/* Top Bar / Close Actions */}
      <div className="flex justify-between items-center border-b border-dashed border-accent/20 pb-3 mb-5">
        <span className="text-[10px] font-mono text-accent/60 hidden sm:inline">// REGISTRY: SECURE_ARCHIVE</span>
        <button 
          onClick={closePanel}
          className="text-xs font-mono text-accent hover:text-white transition-colors duration-300 cursor-pointer"
        >
          &lt;= [ BACK_TO_CONSOLE ]
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-widest text-accent uppercase mb-6">
        <GlitchText text="System Archives: Projects" />
      </h1>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DETAILED_PROJECTS.map((proj, idx) => (
          <SpotlightCard key={idx} className="p-5 flex flex-col justify-between h-full gap-3">
            <div>
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <div>
                  <h2 className="text-base font-bold text-accent tracking-wider font-mono">
                    {proj.title}
                  </h2>
                  <span className="text-[9px] text-accent/40 block font-mono">// {proj.sub.toUpperCase()}</span>
                </div>
              </div>
              <p className="text-accent/80 font-mono text-[10px] leading-relaxed mt-2">
                {proj.desc}
              </p>
            </div>

            <div className="space-y-2 mt-1">
              {/* Metrics */}
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[8px] font-mono text-accent/50">
                {proj.metrics.map((m, i) => (
                  <span key={i}>[{m}]</span>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1">
                {proj.tech.map((t, i) => (
                  <span key={i} className="px-1.5 py-0.5 border border-accent/20 text-[8px] font-mono text-accent/70 bg-accent/5 rounded">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-dashed border-accent/10 flex justify-between items-center mt-1">
                <span className="text-[8px] font-mono text-accent/30">VERIFIED</span>
                <a
                  href={proj.uplink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-mono text-accent hover:text-white transition-colors duration-300"
                >
                  [ SOURCE ] =&gt;
                </a>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </motion.div>
  );
}

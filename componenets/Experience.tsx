"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/componenets/SpotlightCard";
import ShinyText from "@/componenets/ShinyText";
import GlitchText from "@/componenets/GlitchText";

const EXPERIENCE_TIMELINE = [
  {
    role: "Senior Full-Stack Architect",
    company: "RIT Systems & Design",
    period: "2025 - PRESENT",
    desc: "Architecting high-fidelity real-time streaming nodes and Next.js interfaces. Leading AI integration models and custom responsive layouts.",
    achievements: [
      "Optimized WebRTC peer connection pipelines, reducing WAN fallback rates by 40%.",
      "Integrated vector similarity engines for custom syllabus trackers.",
      "Maintained zero-downtime micro-architecture builds."
    ]
  },
  {
    role: "MERN Stack Developer",
    company: "Campus Tech Labs",
    period: "2024 - 2025",
    desc: "Engineered scalable backend Express APIs and MongoDB models for campus community portals. Handled multipart storage uploads.",
    achievements: [
      "Designed announcement dispatch services with image buffering via Multer & Cloudinary.",
      "Implemented strict JWT and OTP validation layers for student logins.",
      "Resolved frontend rendering latency by 25% using virtualized grids."
    ]
  },
  {
    role: "Freelance Software Engineer",
    company: "Independent Contracts",
    period: "2023 - 2024",
    desc: "Built custom interactive portfolios, user authentication dashboards, and responsive game components for local clients.",
    achievements: [
      "Constructed custom snake game integrations on HTML5 Canvas overlays.",
      "Developed sleek retro command terminal web interfaces."
    ]
  }
];

export default function Experience({ isOpen }: { isOpen: boolean }) {
  const closePanel = () => {
    window.history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new CustomEvent("portfolio-panel-change", { detail: { panel: null } }));
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full lg:w-1/2 h-screen bg-[var(--surface-bg)] text-white z-[60] border-r border-dashed border-accent p-6 sm:p-12 pb-24 flex flex-col justify-start overflow-y-auto hide-scrollbar"
    >
      {/* Top Bar / Close Actions */}
      <div className="flex justify-between items-center border-b border-dashed border-accent/20 pb-4 mb-6">
        <span className="text-[10px] font-mono text-accent/60 hidden sm:inline">// TIMELINE: SYSTEM_WORK_RECORDS</span>
        <button 
          onClick={closePanel}
          className="text-xs font-mono text-accent hover:text-white transition-colors duration-300 cursor-pointer"
        >
          &lt;= [ BACK_TO_CONSOLE ]
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-widest text-accent uppercase mb-6">
        <GlitchText text="Work Experience" />
      </h1>

      <div className="space-y-6">
        {EXPERIENCE_TIMELINE.map((item, idx) => (
          <SpotlightCard key={idx} className="p-5 space-y-3">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h2 className="text-base font-bold text-accent tracking-wider font-mono">
                  {item.role}
                </h2>
                <span className="text-[10px] text-accent/60 block font-mono">
                  {item.company}
                </span>
              </div>
              <span className="px-2 py-0.5 border border-dashed border-accent/40 rounded text-[9px] font-mono text-accent bg-accent/5">
                {item.period}
              </span>
            </div>

            <p className="text-accent/80 font-mono text-[10px] leading-relaxed">
              {item.desc}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-dashed border-accent/10">
              <span className="text-[8px] font-mono text-accent/40 block">// KEY_CONTRIBUTIONS:</span>
              {item.achievements.map((ach, i) => (
                <div key={i} className="flex items-start gap-2 font-mono text-[9px] text-accent/90">
                  <span className="text-accent/60">&gt;</span>
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </motion.div>
  );
}

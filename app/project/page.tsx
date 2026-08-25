"use client";

import Link from "next/link";
import SpotlightCard from "@/componenets/SpotlightCard";
import ShinyText from "@/componenets/ShinyText";
import GlitchText from "@/componenets/GlitchText";

const DETAILED_PROJECTS = [
  {
    title: "Waste Detection AI",
    sub: "Deep Learning Classifier & Processing Node",
    desc: "A real-time image processing pipeline designed to classify and log garbage items from cameras. Built utilizing Flask APIs and trained Convolutional Neural Networks.",
    tech: ["Python", "Flask", "PyTorch", "OpenCV", "Docker"],
    metrics: ["ACCURACY: 94.6%", "LATENCY: 42ms"],
    uplink: "https://github.com/Maxcleetus/waste-detection-ai",
  },
  {
    title: "Syllabus Tracker",
    sub: "AI-Powered Course Assistant & Progress Engine",
    desc: "Next.js application featuring an interactive study tracker. Uses custom LLM wrappers to automatically map curriculum requirements, track progress logs, and respond to chatbot queries.",
    tech: ["Next.js", "TypeScript", "LangChain", "MongoDB", "Tailwind"],
    metrics: ["DATABASE SYNC: 100%", "CHAT RESPONSE: <1s"],
    uplink: "https://github.com/Maxcleetus/syllabus-tracker",
  },
  {
    title: "Ritstream Video Chat",
    sub: "WebRTC Peer Chat & TURN Relay Platform",
    desc: "A custom real-time video chat application featuring dynamic TURN authentication to resolve sym NAT packet blockings and provide low-latency WAN streaming previews.",
    tech: ["React Native", "WebRTC", "Socket.io", "Express", "Node"],
    metrics: ["UPLINK STABILITY: 99.8%", "FALLBACK RELAY: TURN"],
    uplink: "https://github.com/Maxcleetus/ritstream-chat",
  },
  {
    title: "ConnectRIT Dashboard",
    sub: "Campus Social Hub & Cloud Media Uploads",
    desc: "A local campus community dashboard. Features MongoDB collection synchronization, Multer parsing for multipart forms, Cloudinary image hosting, and dynamic announcements.",
    tech: ["Node.js", "Express", "MongoDB", "Cloudinary", "Multer"],
    metrics: ["MEDIA UPTAKE: 50MB max", "DB STATE: ACTIVE"],
    uplink: "https://github.com/Maxcleetus/connectrit",
  },
  {
    title: "Portfolio Console OS",
    sub: "Interactive Retro HUD Dashboard",
    desc: "The current responsive dashboard console portfolio. Integrates real-time diagnostic graphs, keyframe neon animations, and terminal command parsers.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Canvas API"],
    metrics: ["GRID VIEW: lg+", "FPS: 60 locked"],
    uplink: "https://github.com/Maxcleetus/portfolio-v2",
  },
];

export default function ProjectPage() {
  return (
    <main className="absolute top-[73px] bottom-[64px] left-0 right-0 w-full bg-transparent z-10 text-white overflow-hidden flex flex-col">
      <div className="flex-1 w-full h-full p-6 max-w-[1200px] mx-auto overflow-y-auto hide-scrollbar space-y-6">
        
        {/* Navigation and Title */}
        <div className="flex flex-col gap-4 border-b border-dashed border-accent/20 pb-4">
          <Link 
            href="/" 
            className="text-xs font-mono text-accent/60 hover:text-accent tracking-widest transition-colors duration-300"
          >
            &lt;= [ BACK_TO_CONSOLE ]
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-accent uppercase">
            <GlitchText text="System Archives: Projects" />
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DETAILED_PROJECTS.map((proj, idx) => (
            <SpotlightCard key={idx} className="p-6 flex flex-col justify-between h-full gap-4">
              <div>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-accent tracking-wider font-mono">
                      {proj.title}
                    </h2>
                    <span className="text-[10px] text-accent/40 block font-mono">// {proj.sub.toUpperCase()}</span>
                  </div>
                  <span className="text-[10px] font-mono text-accent/60 bg-accent/5 px-2 py-0.5 border border-dashed border-accent/30 rounded">
                    NODE_{idx+1}
                  </span>
                </div>
                <p className="text-accent/80 font-mono text-xs leading-relaxed mt-3">
                  {proj.desc}
                </p>
              </div>

              <div className="space-y-3 mt-2">
                {/* Metrics */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-mono text-accent/50">
                  {proj.metrics.map((m, i) => (
                    <span key={i}>[{m}]</span>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 border border-accent/20 text-[9px] font-mono text-accent/70 bg-accent/5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-3 border-t border-dashed border-accent/10 flex justify-between items-center mt-2">
                  <span className="text-[9px] font-mono text-accent/30">STATUS: VERIFIED</span>
                  <a
                    href={proj.uplink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-accent hover:text-white transition-colors duration-300"
                  >
                    [ UPLINK_SRC ] =&gt;
                  </a>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </main>
  );
}
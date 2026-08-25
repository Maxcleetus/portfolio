"use client";

import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/componenets/SpotlightCard";
import ShinyText from "@/componenets/ShinyText";
import GlitchText from "@/componenets/GlitchText";

export default function AboutPage() {
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
            <GlitchText text="Personnel Dossier: Max Cleetus" />
          </h1>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Avatar and Identity Status (md:col-span-4) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <SpotlightCard className="p-6 flex flex-col items-center text-center gap-4 h-full justify-center">
              <div className="relative w-40 h-40 xl:w-48 xl:h-48 p-1.5 border border-dashed border-accent/40 bg-accent/5 rounded">
                <Image
                  src="/black.jpeg"
                  alt="Max Cleetus Profile"
                  width={200}
                  height={200}
                  priority
                  className="object-cover object-top w-full h-full filter grayscale-[10%]"
                />
                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] font-mono text-accent/50 block mb-1">// STATUS:</span>
                <span className="px-3 py-1.5 border border-accent/30 rounded-full text-xs font-mono text-accent bg-accent/5 shadow-[0_0_10px_rgba(var(--accent-rgb),0.1)]">
                  ACTIVE_LINK_OPERATIONAL
                </span>
              </div>
              <div className="font-mono text-xs text-accent/70 space-y-1 mt-2">
                <p>CLASS: MERN DEV // SEC-9</p>
                <p>SYSTEM_UPTIME: 99.98%</p>
              </div>
            </SpotlightCard>
          </div>

          {/* Biography dossier (md:col-span-8) */}
          <div className="md:col-span-8">
            <SpotlightCard className="p-6 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-accent tracking-widest uppercase">
                  <ShinyText text="System Profile Summary" />
                </h2>
                <div className="space-y-4 font-mono text-sm text-accent/80 leading-relaxed">
                  <p>
                    I am a full-stack software engineer specialized in the MERN ecosystem (MongoDB, Express, React, Node.js) combined with modern Next.js environments and smart artificial intelligence models.
                  </p>
                  <p>
                    My architectural design focuses on clean code structure, performant rendering pipelines, and retro-cyber HUD styling details. I enjoy bringing complex ideas to life with high responsiveness and low latency.
                  </p>
                  <p>
                    Whether constructing authenticated WebRTC streaming channels, designing campus social layers, or training deep learning waste detectors, I focus on maximum system safety, scalability, and satisfying interactive aesthetic interfaces.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-dashed border-accent/10 text-right">
                <span className="text-[9px] font-mono text-accent/30">// INITIALIZED: AUGUST 2026</span>
              </div>
            </SpotlightCard>
          </div>

        </div>

        {/* Detailed Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Skill Matrices */}
          <SpotlightCard className="p-6">
            <h2 className="text-xl font-bold text-accent mb-4 tracking-widest uppercase">
              <ShinyText text="Technical Index" />
            </h2>
            <div className="space-y-4 font-mono text-xs text-accent/90">
              <div>
                <div className="flex justify-between mb-1">
                  <span>FRONTEND SYSTEMS (React/Next/Tailwind)</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-accent/10 h-2 border border-dashed border-accent/20 rounded overflow-hidden p-[1px]">
                  <div className="bg-accent h-full rounded" style={{ width: "95%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>BACKEND RUNTIMES (Node.js/Express/Go)</span>
                  <span>88%</span>
                </div>
                <div className="w-full bg-accent/10 h-2 border border-dashed border-accent/20 rounded overflow-hidden p-[1px]">
                  <div className="bg-accent h-full rounded" style={{ width: "88%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>DATABASES & ORMS (Mongo/Postgres/Mongoose)</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-accent/10 h-2 border border-dashed border-accent/20 rounded overflow-hidden p-[1px]">
                  <div className="bg-accent h-full rounded" style={{ width: "85%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>AI INTEGRATIONS & FLASK API</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-accent/10 h-2 border border-dashed border-accent/20 rounded overflow-hidden p-[1px]">
                  <div className="bg-accent h-full rounded" style={{ width: "78%" }} />
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Timeline Milestones */}
          <SpotlightCard className="p-6">
            <h2 className="text-xl font-bold text-accent mb-4 tracking-widest uppercase">
              <ShinyText text="System Milestones" />
            </h2>
            <div className="space-y-4 font-mono text-xs text-accent/80 border-l border-dashed border-accent/20 pl-4 ml-2">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-accent border border-white" />
                <span className="text-[10px] text-accent/50">2025 - PRESENT</span>
                <h3 className="text-sm text-accent font-bold">SENIOR FULL-STACK ARCHITECT</h3>
                <p>Leading web initiatives using Next.js 16/React 19 with focused AI and real-time features.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-accent/60 border border-white/50" />
                <span className="text-[10px] text-accent/50">2024 - 2025</span>
                <h3 className="text-sm text-accent font-bold">MERN DEVELOPER</h3>
                <p>Constructed high-speed API layers and mobile web sockets for community systems.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-accent/30 border border-white/20" />
                <span className="text-[10px] text-accent/50">2023 - 2024</span>
                <h3 className="text-sm text-accent font-bold">AI RESEARCH ASSISTANT</h3>
                <p>Trained convolution models and integrated OpenCV waste categorization grids.</p>
              </div>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </main>
  );
}
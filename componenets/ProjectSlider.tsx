"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "./ShinyText";

const MAIN_PROJECTS = [
  {
    title: "Waste Detection AI",
    sub: "Deep Learning Classifier Node",
    desc: "Real-time AI camera pipeline classifying garbage items.",
    tech: ["Flask", "PyTorch", "Docker"],
    metrics: ["ACCURACY: 94.6%", "LATENCY: 42ms"],
    uplink: "https://github.com/Maxcleetus/waste-detection-ai"
  },
  {
    title: "Syllabus Tracker",
    sub: "AI Study Assistant Engine",
    desc: "AI study tracker with interactive LLM chatbot.",
    tech: ["Next.js", "MongoDB", "LangChain"],
    metrics: ["SYNC STATE: 100%", "RESPONSE: <1s"],
    uplink: "https://github.com/Maxcleetus/syllabus-tracker"
  },
  {
    title: "Ritstream Peer Chat",
    sub: "WebRTC Video/Audio Channel",
    desc: "WebRTC peer platform with authenticated TURN relays.",
    tech: ["React Native", "WebRTC", "Socket.io"],
    metrics: ["WAN FALLBACK: RESOLVED", "FPS: 60 LOCKED"],
    uplink: "https://github.com/Maxcleetus/ritstream-chat"
  },
  {
    title: "ConnectRIT Hub",
    sub: "Campus Social Endpoint",
    desc: "Campus dashboard supporting Cloudinary uploads.",
    tech: ["Node.js", "Express", "MongoDB"],
    metrics: ["DB STATUS: ACTIVE", "MEDIA: CLOUDINARY"],
    uplink: "https://github.com/Maxcleetus/connectrit"
  }
];

export default function ProjectSlider() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MAIN_PROJECTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % MAIN_PROJECTS.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + MAIN_PROJECTS.length) % MAIN_PROJECTS.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const current = MAIN_PROJECTS[index];

  return (
    <div 
      className="flex-1 flex flex-col justify-between overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Area */}
      <div className="flex-1 flex flex-col justify-center relative min-h-[170px] overflow-hidden px-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-3"
          >
            <div>
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-base text-accent font-bold tracking-wider font-mono">
                  {current.title}
                </h3>
                <span className="text-[8px] font-mono px-1.5 py-0.5 border border-dashed border-accent/40 rounded text-accent bg-accent/5">
                  SLIDE_{index + 1}
                </span>
              </div>
              <span className="text-[9px] text-accent/50 block font-mono">
                // {current.sub.toUpperCase()}
              </span>
            </div>

            <p className="text-accent/90 text-xs font-mono leading-relaxed min-h-[36px]">
              {current.desc}
            </p>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[8px] font-mono text-accent/60">
              {current.metrics.map((m, idx) => (
                <span key={idx}>[{m}]</span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-dashed border-accent/15">
              <div className="flex gap-1.5 font-mono text-[8px]">
                {current.tech.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 border border-accent/20 text-accent bg-accent/5 rounded">
                    {t}
                  </span>
                ))}
              </div>
              
              <a
                href={current.uplink}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-accent hover:text-white transition-colors duration-300 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                [ VIEW_SRC ] =&gt;
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination & Manual Slide Controls */}
      <div className="flex justify-between items-center pt-2 mt-2 border-t border-dashed border-accent/20">
        {/* Left Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="text-[10px] font-mono text-accent/60 hover:text-accent px-1.5 py-0.5 border border-accent/20 hover:border-accent bg-accent/5 hover:bg-accent/15 rounded cursor-pointer transition-all duration-300 select-none"
        >
          &lt; PREV
        </button>

        {/* Indicators */}
        <div className="flex gap-1.5">
          {MAIN_PROJECTS.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(idx);
              }}
              className={`h-1 rounded transition-all duration-300 cursor-pointer ${
                idx === index ? "w-4 bg-accent shadow-[0_0_6px_var(--accent)]" : "w-1 bg-accent/30 hover:bg-accent/60"
              }`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="text-[10px] font-mono text-accent/60 hover:text-accent px-1.5 py-0.5 border border-accent/20 hover:border-accent bg-accent/5 hover:bg-accent/15 rounded cursor-pointer transition-all duration-300 select-none"
        >
          NEXT &gt;
        </button>
      </div>
    </div>
  );
}

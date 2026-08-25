"use client";

import { useEffect, useState, useRef } from "react";
import SpotlightCard from "./SpotlightCard";
import GlitchText from "./GlitchText";

export default function ActiveProjectBox() {
  const [uptime, setUptime] = useState("0s");
  const startTime = useRef(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const diffSec = Math.floor((Date.now() - startTime.current) / 1000);
      if (diffSec < 60) {
        setUptime(`${diffSec}s`);
      } else {
        const mins = Math.floor(diffSec / 60);
        const secs = diffSec % 60;
        setUptime(`${mins}m ${secs}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SpotlightCard className="flex-1 flex flex-col justify-between p-6 border border-dashed rounded-lg bg-[rgba(var(--accent-rgb),0.02)] h-full overflow-hidden">
      <div className="flex flex-col h-full justify-between">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-dashed border-accent/20">
          <h2 className="text-base font-bold text-white tracking-widest uppercase">
            <GlitchText text="Active Work Node" speed={30} triggerOnHover={true} />
          </h2>
          <span className="text-[8px] font-mono text-accent animate-pulse">
            // ACTIVE
          </span>
        </div>

        {/* Minimal Parameters */}
        <div className="space-y-3.5 font-mono text-xs text-accent my-auto py-4">
          <div className="flex justify-between border-b border-dashed border-accent/10 pb-1.5">
            <span className="text-accent/75">// PROJECT:</span>
            <span className="text-white font-bold">Console Portfolio</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-accent/10 pb-1.5">
            <span className="text-accent/75">// STATUS:</span>
            <span className="text-white font-bold">HUD Optimization</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-accent/10 pb-1.5">
            <span className="text-accent/75">// UPTIME:</span>
            <span className="text-white font-bold">{uptime}</span>
          </div>
          <div className="flex justify-between pb-0.5">
            <span className="text-accent/75">// COMPILER:</span>
            <span className="text-green-400 font-bold">ONLINE</span>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="pt-2 border-t border-dashed border-accent/15 text-center text-[8px] font-mono text-accent/30">
          SESSION_KEY: SEC_NODE_9482
        </div>

      </div>
    </SpotlightCard>
  );
}

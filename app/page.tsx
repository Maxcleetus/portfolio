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
    <main className="mt-[73px] h-[calc(100vh-137px)] w-full bg-[var(--surface-bg)] text-white overflow-hidden relative flex items-center justify-center">

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
      <div className="relative z-10 text-center space-y-6 px-6">

        {/* IMAGE */}
        <div className="flex justify-center">
          <div className="w-32 h-32 border border-dashed border-cyan-400 overflow-hidden shadow-[0_0_20px_#22d3ee]">
            <Image
              src="/black.jpeg"
              alt="profile"
              width={128}
              height={128}
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-cyan-400 tracking-widest drop-shadow-[0_0_15px_#22d3ee]"
        >
          MAX CLEETUS
        </motion.h1>

        {/* ROLE */}
        <p className="text-cyan-200 tracking-widest text-sm md:text-base">
          MERN STACK DEVELOPER • NEXT.JS • AI
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-center flex-wrap">

          {/* ABOUT */}
          <button
            onClick={() => openPanel("about")}
            className="px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee]"
          >
            ABOUT
          </button>

          {/* PROJECT */}
          <button
            onClick={() => openPanel("project")}
            className="px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee]"
          >
            PROJECT
          </button>

          {/* ✅ CONTACT (NOW WORKS) */}
          <button
            onClick={() => openPanel("contact")}
            className="px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee]"
          >
            CONTACT
          </button>

        </div>
      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Project({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 w-full h-[70vh] bg-[var(--surface-bg)] text-white z-50 border-t border-dashed border-cyan-400 p-8 overflow-y-auto"
    >
      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
        Projects
      </h1>

      {/* PROJECT LIST */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* PROJECT CARD */}
        <div className="border border-dashed border-cyan-400 p-4 hover:shadow-[0_0_10px_#22d3ee] transition">
          <h2 className="text-xl text-cyan-300 mb-2">Waste Detection AI</h2>
          <p className="text-gray-400 text-sm">
            Deep learning-based waste detection system using camera + Flask.
          </p>
        </div>

        <div className="border border-dashed border-cyan-400 p-4 hover:shadow-[0_0_10px_#22d3ee] transition">
          <h2 className="text-xl text-cyan-300 mb-2">Syllabus Tracker</h2>
          <p className="text-gray-400 text-sm">
            Next.js app with AI chatbot integration for tracking study progress.
          </p>
        </div>

        <div className="border border-dashed border-cyan-400 p-4 hover:shadow-[0_0_10px_#22d3ee] transition">
          <h2 className="text-xl text-cyan-300 mb-2">Portfolio Website</h2>
          <p className="text-gray-400 text-sm">
            Pixel-themed interactive portfolio with animations.
          </p>
        </div>

      </div>
    </motion.div>
  );
}

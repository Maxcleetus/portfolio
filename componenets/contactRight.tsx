"use client";

import { motion } from "framer-motion";

export default function RightContact({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 w-full lg:w-1/2 h-screen bg-[var(--surface-bg)] text-white z-50 border-l border-dashed border-cyan-400 p-8 flex flex-col justify-center"
    >
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Contact
      </h1>

      {/* CONTACT INFO */}
      <div className="space-y-4 text-gray-300">

        <p>
          📧 Email: <span className="text-cyan-300">max@example.com</span>
        </p>

        <p>
          💼 LinkedIn: <span className="text-cyan-300">linkedin.com/in/max</span>
        </p>

        <p>
          🐙 GitHub: <span className="text-cyan-300">github.com/max</span>
        </p>

      </div>

      {/* OPTIONAL BUTTON */}
      <button className="mt-8 px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10">
        Say Hello 👋
      </button>
    </motion.div>
  );
}

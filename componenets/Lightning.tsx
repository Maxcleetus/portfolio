"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Lightning() {
  const [key, setKey] = useState(0);

  // 🔥 trigger random lightning instead of smooth loop
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 3000 + Math.random() * 4000); // random delay

    return () => clearInterval(interval);
  }, []);

  // random horizontal position
  const left = Math.random() * 100;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">

      {/* ⚡ Lightning Strike */}
      <motion.svg
        key={key}
        viewBox="0 0 100 200"
        className="absolute top-0 w-6 md:w-10"
        style={{ left: `${left}%` }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0.4, 1, 0], // flicker burst
          scale: [1, 1.05, 1], // slight intensity pulse
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
      >
        <path
          d="M50 0 L40 80 L60 80 L30 200 L70 100 L50 100 Z"
          fill="#22d3ee"
          className="drop-shadow-[0_0_20px_#22d3ee]"
        />
      </motion.svg>

      {/* ⚡ Screen Flash */}
      <motion.div
        key={`flash-${key}`}
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.4, 0.1, 0],
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      />

      {/* ⚡ Secondary Glow */}
      <motion.div
        key={`glow-${key}`}
        className="absolute inset-0 bg-cyan-400"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 0.4,
        }}
      />
    </div>
  );
}
"use client";

import { motion } from "framer-motion";

export default function About({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full lg:w-1/2 h-screen bg-black text-white z-50 flex flex-col justify-center px-8 lg:px-16 border-r border-dashed border-cyan-400"
    >
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        About Me
      </h1>

      <p className="text-gray-300 mb-4">
        I'm a MERN Stack Developer passionate about building scalable and
        interactive web apps.
      </p>

      <p className="text-gray-400">
        Currently exploring AI + Next.js to create unique digital experiences.
      </p>
    </motion.div>
  );
}
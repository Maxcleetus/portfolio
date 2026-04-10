"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import About from "@/componenets/LeftAbout";
import BottomProject from "@/componenets/bottomProject";
import RightContact from "../componenets/contactRight";

export default function Home() {
  const [openAbout, setOpenAbout] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  return (
    <main className="h-[calc(100vh-73px)] w-full bg-black/60 text-white overflow-hidden relative flex items-center justify-center">

      {/* ✅ PANELS */}
      <About isOpen={openAbout} />
      <BottomProject isOpen={openProject} />
      <RightContact isOpen={openContact} />

      {/* ✅ OVERLAY */}
      {(openAbout || openProject || openContact) && (
        <div
          onClick={() => {
            setOpenAbout(false);
            setOpenProject(false);
            setOpenContact(false);
          }}
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
            onClick={() => setOpenAbout(true)}
            className="px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee]"
          >
            ABOUT
          </button>

          {/* PROJECT */}
          <button
            onClick={() => setOpenProject(true)}
            className="px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee]"
          >
            PROJECT
          </button>

          {/* ✅ CONTACT (NOW WORKS) */}
          <button
            onClick={() => setOpenContact(true)}
            className="px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee]"
          >
            CONTACT
          </button>

        </div>
      </div>
    </main>
  );
}
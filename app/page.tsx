"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <main className="h-[calc(100vh-73px)] w-full bg-black/60 text-white overflow-hidden relative flex items-center justify-center">



      {/* 🧑‍💻 CONTENT */}
      <div className="relative z-0 text-center space-y-6 px-6">

        {/* 🖼 IMAGE */}
        <div className="flex justify-center">
          <div className="w-32 h-32 border border-dashed border-cyan-400 overflow-hidden shadow-[0_0_20px_#22d3ee]">
            <Image
              src="/black.jpeg"
              alt="profile"
              width={128}
              height={128}
              loading="eager"
              className="object-cover"
            />
          </div>
        </div>

        {/* 👤 NAME */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-cyan-400 tracking-widest drop-shadow-[0_0_15px_#22d3ee]"
        >
          MAX CLEETUS
        </motion.h1>

        {/* 💻 ROLE */}
        <p className="text-cyan-200 tracking-widest text-sm md:text-base">
          MERN STACK DEVELOPER • NEXT.JS • AI
        </p>

        {/* 🔗 LINKS */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/about" className="px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10">
            ABOUT
          </Link>

          <Link href="/project" className="px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10">
            PROJECT
          </Link>

          <Link href="/contact" className="px-6 py-2 border border-dashed border-cyan-400 hover:bg-cyan-400/10">
            CONTACT
          </Link>
        </div>
      </div>
    </main>
  );
}

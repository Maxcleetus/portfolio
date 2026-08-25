"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import SpotlightCard from "@/componenets/SpotlightCard";
import ShinyText from "@/componenets/ShinyText";
import GlitchText from "@/componenets/GlitchText";

export default function RightContact({ isOpen }: { isOpen: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const closePanel = () => {
    window.history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new CustomEvent("portfolio-panel-change", { detail: { panel: null } }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    setLogs(["Handshake initialization with dispatch node...", "Assembling packet payload..."]);

    setTimeout(() => {
      setLogs((prev) => [...prev, "Encrypting content with TLS keys...", "Dispatching packet payload through gateway..."]);
    }, 800);

    setTimeout(() => {
      setLogs((prev) => [...prev, "Payload acknowledged. Uplink established."]);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 w-full lg:w-1/2 h-screen bg-[var(--surface-bg)] text-white z-[60] border-l border-dashed border-accent p-6 sm:p-12 pb-24 flex flex-col justify-start overflow-y-auto hide-scrollbar"
    >
      {/* Top Bar / Close Actions */}
      <div className="flex justify-between items-center border-b border-dashed border-accent/20 pb-4 mb-6">
        <span className="text-[10px] font-mono text-accent/60 hidden sm:inline">// CHANNEL: ESTABLISH_UPLINK</span>
        <button 
          onClick={closePanel}
          className="text-xs font-mono text-accent hover:text-white transition-colors duration-300 cursor-pointer"
        >
          &lt;= [ BACK_TO_CONSOLE ]
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-widest text-accent uppercase mb-6">
        <GlitchText text="Establish Uplink" />
      </h1>

      <div className="space-y-6">
        {/* Outbound Dispatch Form */}
        <SpotlightCard className="p-5">
          <h2 className="text-sm font-bold text-accent mb-4 tracking-widest uppercase">
            <ShinyText text="Outbound Packet Dispatch" />
          </h2>
          
          {status !== "success" ? (
            <form onSubmit={handleDispatch} className="space-y-3.5 font-mono text-[10px] text-accent">
              <div>
                <label className="block text-[10px] text-accent font-bold mb-1">// TRANSMITTER_NAME:</label>
                <div className="flex items-center border border-dashed border-accent/40 bg-accent/5 p-2 rounded">
                  <span className="text-accent mr-2">&gt;</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent text-white outline-none border-none caret-accent text-[11px] placeholder:text-accent/40"
                    placeholder="Your identity..."
                    required
                    disabled={status === "sending"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-accent font-bold mb-1">// RESPONSE_MAILNODE:</label>
                <div className="flex items-center border border-dashed border-accent/40 bg-accent/5 p-2 rounded">
                  <span className="text-accent mr-2">&gt;</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent text-white outline-none border-none caret-accent text-[11px] placeholder:text-accent/40"
                    placeholder="yourname@domain.com"
                    required
                    disabled={status === "sending"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-accent font-bold mb-1">// PAYLOAD_MESSAGE:</label>
                <div className="flex items-start border border-dashed border-accent/40 bg-accent/5 p-2 rounded">
                  <span className="text-accent mr-2 mt-0.5">&gt;</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="flex-1 bg-transparent text-white outline-none border-none caret-accent resize-none text-[11px] placeholder:text-accent/40"
                    placeholder="Compose message..."
                    required
                    disabled={status === "sending"}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full text-center py-2.5 border border-dashed border-accent hover:bg-accent/10 hover:text-white text-accent font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer text-xs"
              >
                {status === "sending" ? "[ SENDING PACKET... ]" : "[ DISPATCH_PAYLOAD ]"}
              </button>
            </form>
          ) : (
            <div className="space-y-3 font-mono text-xs text-accent text-center py-4">
              <p className="font-bold tracking-wider">// PACKET TRANSMITTED</p>
              <p className="text-white">Message payload has been successfully dispatched to Max Cleetus.</p>
              <button
                onClick={() => setStatus("idle")}
                className="px-3 py-1.5 border border-dashed border-accent hover:bg-accent/10 transition-all text-[10px] tracking-wider cursor-pointer"
              >
                [ DISPATCH ANOTHER ]
              </button>
            </div>
          )}

          {/* Logs */}
          {logs.length > 0 && (
            <div className="mt-4 border border-dashed border-accent/30 bg-black/60 p-2.5 rounded font-mono text-[9px] text-accent space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="text-white/90">&gt;&gt;&gt; {log}</div>
              ))}
            </div>
          )}
        </SpotlightCard>

        {/* Direct Coordinates */}
        <SpotlightCard className="p-4">
          <h2 className="text-sm font-bold text-accent mb-3 tracking-widest uppercase">
            <ShinyText text="Direct Coordinates" />
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px] text-accent">
            <a 
              href="mailto:max@example.com" 
              className="border border-dashed border-accent/30 p-2 bg-accent/5 hover:border-accent text-center transition-colors duration-300"
            >
              <span className="text-accent font-bold block mb-0.5">// MAILNODE:</span>
              <span className="text-white hover:text-accent transition-colors duration-300">max@example.com</span>
            </a>
            <a 
              href="https://linkedin.com/in/max" 
              target="_blank" 
              rel="noreferrer" 
              className="border border-dashed border-accent/30 p-2 bg-accent/5 hover:border-accent text-center transition-colors duration-300"
            >
              <span className="text-accent font-bold block mb-0.5">// LINKEDIN:</span>
              <span className="text-white hover:text-accent transition-colors duration-300 font-bold">linkedin.com/in/max</span>
            </a>
            <a 
              href="https://github.com/Maxcleetus" 
              target="_blank" 
              rel="noreferrer" 
              className="border border-dashed border-accent/30 p-2 bg-accent/5 hover:border-accent text-center transition-colors duration-300"
            >
              <span className="text-accent font-bold block mb-0.5">// GITHUB:</span>
              <span className="text-white hover:text-accent transition-colors duration-300 font-bold">github.com/Maxcleetus</span>
            </a>
          </div>
        </SpotlightCard>
      </div>
    </motion.div>
  );
}

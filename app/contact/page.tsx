"use client";

import Link from "next/link";
import React, { useState } from "react";
import SpotlightCard from "@/componenets/SpotlightCard";
import ShinyText from "@/componenets/ShinyText";
import GlitchText from "@/componenets/GlitchText";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    setLogs(["Initializing outbound server handshake...", "Preparing payload envelopes..."]);

    setTimeout(() => {
      setLogs((prev) => [...prev, "Encrypting packet content with TLS_RSA...", "Routing packets through gateway..."]);
    }, 800);

    setTimeout(() => {
      setLogs((prev) => [...prev, "Transmission successful. Node acknowledged."]);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <main className="absolute top-[73px] bottom-[64px] left-0 right-0 w-full bg-transparent z-10 text-white overflow-hidden flex flex-col">
      <div className="flex-1 w-full h-full p-6 max-w-[1000px] mx-auto overflow-y-auto hide-scrollbar space-y-6">
        
        {/* Navigation and Title */}
        <div className="flex flex-col gap-4 border-b border-dashed border-accent/20 pb-4">
          <Link 
            href="/" 
            className="text-xs font-mono text-accent/60 hover:text-accent tracking-widest transition-colors duration-300"
          >
            &lt;= [ BACK_TO_CONSOLE ]
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-accent uppercase">
            <GlitchText text="Establish Uplink Channels" />
          </h1>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Outbound Dispatch Form (md:col-span-8) */}
          <div className="md:col-span-8">
            <SpotlightCard className="p-6 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-accent mb-4 tracking-widest uppercase">
                  <ShinyText text="Outbound Packet Dispatch" />
                </h2>
                
                {status !== "success" ? (
                  <form onSubmit={handleDispatch} className="space-y-4 font-mono text-xs text-accent">
                    <div>
                      <label className="block text-[10px] text-accent/50 mb-1">// TRANSMITTER_NAME:</label>
                      <div className="flex items-center border border-dashed border-accent/20 bg-accent/5 p-2 rounded">
                        <span className="text-accent/60 mr-2">&gt;</span>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          className="flex-1 bg-transparent text-white outline-none border-none caret-accent"
                          placeholder="Your identity..."
                          required
                          disabled={status === "sending"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-accent/50 mb-1">// RESPONSE_MAILNODE:</label>
                      <div className="flex items-center border border-dashed border-accent/20 bg-accent/5 p-2 rounded">
                        <span className="text-accent/60 mr-2">&gt;</span>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          className="flex-1 bg-transparent text-white outline-none border-none caret-accent"
                          placeholder="yourname@domain.com"
                          required
                          disabled={status === "sending"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-accent/50 mb-1">// PAYLOAD_MESSAGE:</label>
                      <div className="flex items-start border border-dashed border-accent/20 bg-accent/5 p-2 rounded">
                        <span className="text-accent/60 mr-2 mt-0.5">&gt;</span>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="flex-1 bg-transparent text-white outline-none border-none caret-accent resize-none"
                          placeholder="Compose transmission payload..."
                          required
                          disabled={status === "sending"}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full text-center py-2.5 border border-dashed border-accent hover:bg-accent/10 text-accent font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {status === "sending" ? "[ ROUTING_TRANSMISSION... ]" : "[ DISPATCH_PAYLOAD ]"}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4 font-mono text-xs text-accent text-center py-8">
                    <p className="text-base text-accent font-bold tracking-wider">// PACKET RECEIVED BY SEC-9 GATEWAY</p>
                    <p className="text-accent/80">Your message payload has been successfully dispatched. Uplink reply is pending.</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-4 py-2 border border-dashed border-accent hover:bg-accent/10 transition-all text-xs tracking-wider cursor-pointer"
                    >
                      [ SEND NEW MESSAGE ]
                    </button>
                  </div>
                )}
              </div>

              {/* simulated console logs below form */}
              {logs.length > 0 && (
                <div className="mt-4 border border-dashed border-accent/20 bg-black/40 p-3 rounded font-mono text-[9px] text-accent/80 space-y-1">
                  <span className="text-[8px] text-accent/40 block border-b border-dashed border-accent/10 pb-0.5 mb-1">// UPLINK_SHELL_LOG</span>
                  {logs.map((log, i) => (
                    <div key={i}>&gt;&gt;&gt; {log}</div>
                  ))}
                </div>
              )}
            </SpotlightCard>
          </div>

          {/* Social Links Panel (md:col-span-4) */}
          <div className="md:col-span-4">
            <SpotlightCard className="p-6 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-accent mb-4 tracking-widest uppercase">
                  <ShinyText text="Direct Coordinates" />
                </h2>
                
                <div className="space-y-6 font-mono text-xs text-accent">
                  <div className="border border-dashed border-accent/20 p-3 bg-accent/5">
                    <span className="text-[9px] text-accent/50 block font-mono">// MAILBOX_NODE:</span>
                    <a href="mailto:max@example.com" className="text-sm font-bold text-accent hover:text-white transition-colors duration-300">
                      max@example.com
                    </a>
                  </div>

                  <div className="border border-dashed border-accent/20 p-3 bg-accent/5">
                    <span className="text-[9px] text-accent/50 block font-mono">// LINKEDIN_NODE:</span>
                    <a href="https://linkedin.com/in/max" target="_blank" rel="noreferrer" className="text-sm font-bold text-accent hover:text-white transition-colors duration-300">
                      linkedin.com/in/max
                    </a>
                  </div>

                  <div className="border border-dashed border-accent/20 p-3 bg-accent/5">
                    <span className="text-[9px] text-accent/50 block font-mono">// GITHUB_NODE:</span>
                    <a href="https://github.com/Maxcleetus" target="_blank" rel="noreferrer" className="text-sm font-bold text-accent hover:text-white transition-colors duration-300">
                      github.com/Maxcleetus
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-accent/10 mt-6 text-center text-[9px] font-mono text-accent/30">
                // COMPLETED CHANNELS ACTIVE
              </div>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </main>
  );
}
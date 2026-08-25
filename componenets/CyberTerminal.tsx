"use client";

import React, { useEffect, useState, useRef } from "react";
import SpotlightCard from "./SpotlightCard";
import ShinyText from "./ShinyText";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

const COMMAND_SUGGESTIONS = ["help", "neofetch", "skills", "projects", "contact", "clear"];

export default function CyberTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [uptime, setUptime] = useState("0s");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(Date.now());

  // 🔹 Update uptime tracker
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

  // 🔹 Boot welcome sequence
  useEffect(() => {
    const bootLines: TerminalLine[] = [
      { text: "MAX_OS [Version 2.0.26] UPLINK_ONLINE", type: "system" },
      { text: "Connecting to sector gateway...", type: "system" },
      { text: "Handshake verified. Access granted.", type: "system" },
      { text: "Type 'help' or click target suggestions below.", type: "output" },
    ];

    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, line]);
      }, (index + 1) * 300);
    });
  }, []);

  // 🔹 Auto scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // 🔹 Commands handler
  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const newLines: TerminalLine[] = [
      { text: `guest@max-cleetus-os:~$ ${trimmed}`, type: "input" },
    ];

    if (lower === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else if (lower === "help") {
      newLines.push({
        text: "Available commands: help, neofetch, skills, projects, contact, clear",
        type: "output",
      });
    } else if (lower === "neofetch") {
      const activeTheme = document.body.getAttribute("data-theme") || "cyan";
      newLines.push({
        text: `  /\\_/\\      OS: MaxOS v2.0.26\n ( o.o )     Kernel: Next.js 16.2\n  > ^ <      Shell: React 19.2\n /     \\     Uptime: ${uptime}\n(|  |  |)    Host: Cleetus-Console\n \\__|_/      Active Theme: ${activeTheme.toUpperCase()}`,
        type: "output",
      });
    } else if (lower === "skills") {
      newLines.push(
        { text: "NEXT.JS   [██████████] 100%", type: "output" },
        { text: "REACT     [██████████] 100%", type: "output" },
        { text: "NODE.JS   [████████░░] 80%", type: "output" },
        { text: "MONGODB   [████████░░] 80%", type: "output" },
        { text: "AI/LLMS   [███████░░░] 70%", type: "output" }
      );
    } else if (lower === "projects") {
      newLines.push(
        { text: "Target Archives Found:", type: "output" },
        { text: "1. Waste Detection AI - Deep learning waste detector using Flask.", type: "output" },
        { text: "2. Syllabus Tracker - Next.js tracking system with integrated AI.", type: "output" },
        { text: "3. Portfolio Website - Dynamic neon retro console UI.", type: "output" }
      );
    } else if (lower === "contact") {
      newLines.push(
        { text: "COMMUNICATIONS LINK:", type: "output" },
        { text: "Email: max@example.com", type: "output" },
        { text: "GitHub: github.com/max", type: "output" },
        { text: "LinkedIn: linkedin.com/in/max", type: "output" }
      );
    } else {
      newLines.push({
        text: `Error: Command '${trimmed}' not found. Type 'help' for suggestions.`,
        type: "error",
      });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  return (
    <SpotlightCard className="flex-1 flex flex-col justify-between p-6 border border-dashed rounded-lg bg-[rgba(var(--accent-rgb),0.02)] h-full overflow-hidden">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Terminal Header */}
        <div className="flex justify-between items-center pb-2 border-b border-dashed border-accent/20 mb-3">
          <h2 className="text-xl font-bold text-accent tracking-widest uppercase">
            <ShinyText text="Interactive Uplink" />
          </h2>
          <span className="text-[9px] font-mono text-accent/40 tracking-wider">PORT: 3000</span>
        </div>

        {/* Scrollable log feed */}
        <div className="flex-1 overflow-y-auto font-mono text-xs pr-1 mb-3 hide-scrollbar space-y-2 select-text">
          {history.map((line, i) => {
            let color = "text-accent/90";
            if (line.type === "input") color = "text-white font-bold";
            if (line.type === "error") color = "text-red-400";
            if (line.type === "system") color = "text-accent/40";

            return (
              <div key={i} className={`whitespace-pre-line leading-relaxed ${color}`}>
                {line.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Console command input */}
        <div className="flex items-center font-mono text-xs border border-dashed border-accent/20 bg-accent/5 p-2 rounded">
          <span className="text-accent font-bold mr-2">guest@max-cleetus-os:~$</span>
          <input
            type="text"
            className="flex-1 bg-transparent text-white outline-none border-none caret-accent"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            placeholder="Type command..."
          />
        </div>
      </div>

      {/* Suggestion tags */}
      <div className="mt-4 pt-3 border-t border-dashed border-accent/10">
        <span className="text-[9px] font-mono text-accent/40 block mb-1.5 tracking-widest">// QUICK_TARGETS:</span>
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {COMMAND_SUGGESTIONS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 border border-dashed border-accent/30 text-accent/70 hover:text-accent hover:border-accent hover:bg-accent/5 rounded cursor-pointer transition-all duration-300"
            >
              [{cmd}]
            </button>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}

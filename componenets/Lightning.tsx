"use client";

import { useEffect, useState } from "react";

export default function Lightning() {
  const [path, setPath] = useState("");
  const [left, setLeft] = useState("50%");
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0);

  // ⚡ Generate realistic zig-zag path
  const generateLightning = () => {
    let x = 50;
    let y = 0;
    let path = `M ${x} ${y}`;

    for (let i = 0; i < 10; i++) {
      x += (Math.random() - 0.5) * 30; // random horizontal
      y += 20 + Math.random() * 20; // downward progression
      path += ` L ${x} ${y}`;
    }

    return path;
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const trigger = () => {
      setLeft(`${10 + Math.random() * 80}%`);
      setPath(generateLightning());
      setActive(true);
      setPhase(1);

      // ⚡ flicker
      setTimeout(() => setPhase(2), 60);
      setTimeout(() => setPhase(3), 120);

      setTimeout(() => {
        setActive(false);
        setPhase(0);
      }, 220);

      timeout = setTimeout(trigger, 2500 + Math.random() * 3000);
    };

    trigger();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">

      {/* ⚡ Main Lightning */}
      {active && (
        <svg
          viewBox="0 0 100 200"
          className="absolute top-[-10px] w-[20px]"
          style={{
            left,
            height: "100%",
          }}
        >
          {/* Glow */}
          <path
            d={path}
            stroke="#22d3ee"
            strokeWidth="4"
            opacity="0.3"
            style={{ filter: "blur(2px)" }}
          />

          {/* Core thin lightning */}
          <path
            d={path}
            stroke="#a5f3fc"
            strokeWidth="6"
            style={{
              filter:
                "drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 12px #22d3ee)",
            }}
          />
        </svg>
      )}

      {/* ⚡ subtle flash (very minimal) */}
      <div
        className="absolute inset-0"
        style={{
          opacity:
            phase === 1
              ? 0.15
              : phase === 2
              ? 0.08
              : phase === 3
              ? 0.12
              : 0,
          background: "white",
          transition: "opacity 0.05s linear",
        }}
      />
    </div>
  );
}
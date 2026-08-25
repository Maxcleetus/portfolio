"use client";

import { useEffect, useState } from "react";

export default function Lightning() {
  const [path, setPath] = useState("");
  const [left, setLeft] = useState("50%");
  const [topPos, setTopPos] = useState("10%");
  const [hgt, setHgt] = useState("20vh");
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0);

  // ⚡ Generate realistic small electric zig-zag
  const generateLightning = () => {
    let x = 50;
    let y = 0;
    let path = `M ${x} ${y}`;

    // Fewer segments and smaller drops for realistic small lightning
    for (let i = 0; i < 6; i++) {
      x += (Math.random() - 0.5) * 40; 
      y += 10 + Math.random() * 20; 
      path += ` L ${x} ${y}`;
    }

    return path;
  };

  useEffect(() => {
    let loopTimeout: ReturnType<typeof setTimeout>;

    const fireLightning = (x?: number, y?: number) => {
      if (x !== undefined && y !== undefined) {
        // Adjust X alignment so lightning sparks originate precisely underneath the mouse
        setLeft(`${x - 15}px`); 
        setTopPos(`${y}px`);
      } else {
        setLeft(`${10 + Math.random() * 80}%`);
        setTopPos(`${5 + Math.random() * 60}%`);
      }
      setHgt(`${10 + Math.random() * 15}vh`);

      setPath(generateLightning());
      setActive(true);
      setPhase(1);

      // ⚡ flicker
      setTimeout(() => setPhase(2), 50);
      setTimeout(() => setPhase(3), 100);

      setTimeout(() => {
        setActive(false);
        setPhase(0);
      }, 200);
    };

    const runRandomLoop = () => {
      fireLightning();
      loopTimeout = setTimeout(runRandomLoop, 4000 + Math.random() * 6000);
    };

    // Start background lightning
    runRandomLoop();

    return () => {
      clearTimeout(loopTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* ⚡ Main Lightning */}
      {active && (
        <svg
          viewBox="0 0 100 150"
          preserveAspectRatio="none"
          className="absolute w-[25px] md:w-[35px] pointer-events-none"
          style={{
            left,
            top: topPos,
            height: hgt,
            overflow: "visible",
          }}
        >
          {/* Glow */}
          <path
            d={path}
            stroke="var(--accent)"
            strokeWidth="6"
            opacity="0.2"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "blur(4px)" }}
          />

          {/* Core thin lightning */}
          <path
            d={path}
            stroke="white"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{
              filter:
                "drop-shadow(0 0 4px var(--accent)) drop-shadow(0 0 8px var(--accent))",
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
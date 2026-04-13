"use client";

import { useEffect, useState, useRef } from "react";

const CELL = 15;
const LENGTH = 15;
const BASE_SPEED = 150;

type Segment = { x: number; y: number };

export default function SnakeBackground() {
  const [snake, setSnake] = useState<Segment[]>([]);
  const [isReady, setIsReady] = useState(false);

  const dirRef = useRef<Segment>({ x: 1, y: 0 });
  const snakeRef = useRef<Segment[]>([]);
  const gridRef = useRef<{ cols: number; rows: number }>({ cols: 0, rows: 0 });
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 🔹 Setup grid + mouse tracking
  useEffect(() => {
    const updateGrid = () => {
      gridRef.current = {
        cols: Math.floor(window.innerWidth / CELL),
        rows: Math.floor(window.innerHeight / CELL),
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: Math.floor(e.clientX / CELL),
        y: Math.floor(e.clientY / CELL),
      };
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    window.addEventListener("mousemove", handleMouseMove);

    const startX = Math.floor(gridRef.current.cols / 2);
    const startY = Math.floor(gridRef.current.rows / 2);

    const initial: Segment[] = Array.from({ length: LENGTH }, (_, i) => ({
      x: startX - i,
      y: startY,
    }));

    snakeRef.current = initial;
    setSnake(initial);
    setIsReady(true);

    return () => {
      window.removeEventListener("resize", updateGrid);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 🔹 Snake movement loop
  useEffect(() => {
    if (!isReady) return;

    const interval = setInterval(() => {
      const prevSnake = snakeRef.current;
      const head = prevSnake[0];
      const { cols, rows } = gridRef.current;
      const mouse = mouseRef.current;

      let dx = mouse.x - head.x;
      let dy = mouse.y - head.y;

      let nextDir = dirRef.current;

      // 🎯 Move toward mouse (axis priority)
      if (Math.abs(dx) > Math.abs(dy)) {
        nextDir = { x: dx > 0 ? 1 : -1, y: 0 };
      } else if (dy !== 0) {
        nextDir = { x: 0, y: dy > 0 ? 1 : -1 };
      }

      let nextX = head.x + nextDir.x;
      let nextY = head.y + nextDir.y;

      // 🧱 Boundary handling
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
        const fallbackDirs = [
          { x: 1, y: 0 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: -1 },
        ];

        const safe = fallbackDirs.find((d) => {
          const nx = head.x + d.x;
          const ny = head.y + d.y;
          return nx >= 0 && nx < cols && ny >= 0 && ny < rows;
        });

        if (safe) nextDir = safe;

        nextX = head.x + nextDir.x;
        nextY = head.y + nextDir.y;
      }

      dirRef.current = nextDir;

      const newSnake = [
        { x: nextX, y: nextY },
        ...prevSnake.slice(0, prevSnake.length - 1),
      ];

      snakeRef.current = newSnake;
      setSnake([...newSnake]);
    }, BASE_SPEED);

    return () => clearInterval(interval);
  }, [isReady]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 🌐 Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(#22d3ee22 1px, transparent 1px),
            linear-gradient(90deg, #22d3ee22 1px, transparent 1px)
          `,
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      {/* 🌊 Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_70%)]" />

      {/* 🐍 Snake */}
      {snake.map((s, i) => {
        const isHead = i === 0;
        return (
          <div
            key={`snake-${i}`}
            className="absolute flex items-center justify-center"
            style={{
              width: CELL,
              height: CELL,
              left: s.x * CELL,
              top: s.y * CELL,
              transition: `left ${BASE_SPEED}ms linear, top ${BASE_SPEED}ms linear`,
            }}
          >
            <div
              style={{
                width: isHead ? "70%" : "60%",
                height: isHead ? "70%" : "60%",
                background: isHead ? "#a5f3fc" : "#22d3ee",
                clipPath:
                  "polygon(0 0, 100% 0, 100% 40%, 60% 40%, 60% 60%, 100% 60%, 100% 100%, 0 100%, 0 60%, 40% 60%, 40% 40%, 0 40%)",
                opacity: isHead ? 1 : 0.25 + (1 - i / snake.length) * 0.5,
                borderRadius: "3px",
                boxShadow: isHead
                  ? "0 0 12px #22d3ee, 0 0 30px #22d3ee"
                  : "0 0 6px #22d3ee",
                transform: isHead ? "scale(1.2)" : "scale(1)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
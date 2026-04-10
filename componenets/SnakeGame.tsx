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

  useEffect(() => {
    const updateGrid = () => {
      gridRef.current = {
        cols: Math.floor(window.innerWidth / CELL),
        rows: Math.floor(window.innerHeight / CELL),
      };
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);

    const startX = Math.floor(gridRef.current.cols / 2);
    const startY = Math.floor(gridRef.current.rows / 2);

    const initial: Segment[] = Array.from({ length: LENGTH }, (_, i) => ({
      x: startX - i,
      y: startY,
    }));

    snakeRef.current = initial;
    setSnake(initial);
    setIsReady(true);

    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const interval = setInterval(() => {
      const prevSnake = snakeRef.current;
      const head = prevSnake[0];
      const currentDir = dirRef.current;
      const { cols, rows } = gridRef.current;

      const possibleTurns =
        currentDir.x !== 0
          ? [{ x: 0, y: 1 }, { x: 0, y: -1 }]
          : [{ x: 1, y: 0 }, { x: -1, y: 0 }];

      let nextDir = currentDir;

      if (Math.random() < 0.05) {
        nextDir = possibleTurns[Math.floor(Math.random() * possibleTurns.length)];
      }

      let nextX = head.x + nextDir.x;
      let nextY = head.y + nextDir.y;

      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
        const safeTurn = possibleTurns.find((t) => {
          const nx = head.x + t.x;
          const ny = head.y + t.y;
          return nx >= 0 && nx < cols && ny >= 0 && ny < rows;
        });

        if (safeTurn) {
          nextDir = safeTurn;
        } else {
          nextDir = { x: -currentDir.x, y: -currentDir.y };
        }
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
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_70%)]" />

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
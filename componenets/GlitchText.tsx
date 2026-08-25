"use client";

import { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
  triggerOnHover?: boolean;
}

const CYBER_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function GlitchText({
  text,
  className = "",
  speed = 30,
  triggerOnHover = true,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const originalText = text;

  const startDecryptAnimation = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return originalText[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
        isAnimating.current = false;
        setDisplayText(originalText);
      }

      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    startDecryptAnimation();

    // Periodically trigger the scramble animation to create a living HUD effect
    const intervalId = setInterval(() => {
      startDecryptAnimation();
    }, 10000 + Math.random() * 5000); // Every 10-15s

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover) startDecryptAnimation();
      }}
    >
      {displayText}
    </span>
  );
}

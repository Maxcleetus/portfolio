"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  className?: string;
  disabled?: boolean;
  speed?: number;
}

export default function ShinyText({
  text,
  className = "",
  disabled = false,
  speed = 5,
}: ShinyTextProps) {
  const animationStyle = disabled
    ? {}
    : {
        animation: `shiny-text ${speed}s linear infinite`,
      };

  return (
    <span
      style={animationStyle}
      className={`inline-block bg-[linear-gradient(120deg,rgba(34,211,238,0.1)_40%,#e0f7fa_50%,rgba(34,211,238,0.1)_60%)] bg-300% bg-clip-text text-transparent ${className}`}
    >
      {text}
    </span>
  );
}

"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function Waveform({
  bars = 40,
  playing = false,
  progress = 0,
  className = "",
}: {
  bars?: number;
  playing?: boolean;
  progress?: number;
  className?: string;
}) {
  const heights = useMemo(
    () =>
      Array.from({ length: bars }, (_, i) => {
        const seedVal = Math.sin(i * 12.9898) * 43758.5453;
        const frac = seedVal - Math.floor(seedVal);
        return Math.round((0.25 + frac * 0.75) * 1000) / 1000;
      }),
    [bars]
  );

  const activeCount = Math.round((progress / 100) * bars);

  return (
    <div className={`flex h-full items-center gap-[3px] ${className}`}>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className={`w-[3px] flex-1 rounded-full ${
            i < activeCount
              ? "bg-white"
              : "bg-white/30"
          }`}
          style={{ height: `${(h * 100).toFixed(2)}%` }}
          animate={
            playing
              ? { scaleY: [1, 0.4 + h * 0.6, 1] }
              : { scaleY: 1 }
          }
          transition={{
            duration: 0.9 + h * 0.6,
            repeat: playing ? Infinity : 0,
            ease: "easeInOut",
            delay: i * 0.02,
          }}
        />
      ))}
    </div>
  );
}

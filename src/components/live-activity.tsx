"use client";

import { useEffect, useState } from "react";

const MIN = 3;
const MAX = 12;
const TICK_MS = 15000;

export function LiveActivity({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only, avoids SSR/client mismatch
    setCount(MIN + Math.floor(Math.random() * (MAX - MIN)));
    const id = setInterval(() => {
      setCount((prev) => {
        const step = Math.random() > 0.5 ? 1 : -1;
        return Math.min(MAX, Math.max(MIN, (prev ?? MIN) + step));
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  if (count === null) {
    return <span className={`inline-block h-5 ${className}`} aria-hidden />;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 ${className}`}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {count} músicas do Dia dos Pais sendo compostas agora
    </span>
  );
}

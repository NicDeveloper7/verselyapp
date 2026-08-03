"use client";

import { useEffect, useState } from "react";

function getRemaining(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CampaignCountdown({
  target,
  compact = false,
  className = "",
}: {
  target: string;
  compact?: boolean;
  className?: string;
}) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only countdown, avoids SSR/client clock mismatch
    setRemaining(getRemaining(target));
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!remaining) {
    return <div className={`h-5 ${className}`} aria-hidden />;
  }

  if (compact) {
    return (
      <span className={`font-mono text-xs font-semibold tabular-nums ${className}`}>
        {remaining.days}d {pad(remaining.hours)}h {pad(remaining.minutes)}m {pad(remaining.seconds)}s
      </span>
    );
  }

  const segments = [
    { value: remaining.days, label: "dias" },
    { value: remaining.hours, label: "horas" },
    { value: remaining.minutes, label: "min" },
    { value: remaining.seconds, label: "seg" },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="font-mono text-sm font-bold tabular-nums leading-none">
              {pad(seg.value)}
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-wide text-white/70">
              {seg.label}
            </span>
          </div>
          {i < segments.length - 1 && <span className="text-white/30">:</span>}
        </div>
      ))}
    </div>
  );
}

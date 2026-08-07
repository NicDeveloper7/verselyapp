"use client";

import { useEffect, useState } from "react";
import { Music2 } from "lucide-react";

const HOUR_MS = 60 * 60 * 1000;

function parseUtc(sqliteDatetime: string) {
  // SQLite's datetime('now') returns "YYYY-MM-DD HH:MM:SS" in UTC with no
  // timezone marker — without the "Z", browsers parse it as local time,
  // which would silently shift the countdown by however far off UTC the
  // visitor's clock is (3h in Brazil).
  return new Date(sqliteDatetime.replace(" ", "T") + "Z").getTime();
}

function formatClock(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function ProductionCountdown({ approvedAt }: { approvedAt: string }) {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    const startedAt = parseUtc(approvedAt);

    function tick() {
      setRemainingMs(Math.max(0, HOUR_MS - (Date.now() - startedAt)));
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [approvedAt]);

  if (remainingMs === null) {
    return <div className="mt-8 h-40" aria-hidden />;
  }

  const done = remainingMs <= 0;
  const progress = 1 - remainingMs / HOUR_MS;

  return (
    <div className="mt-8 rounded-2xl border border-border bg-foreground/[0.02] p-7">
      <div className="flex items-center justify-center gap-2 text-sm font-semibold">
        <Music2 size={16} className="text-primary" />
        {done ? "Sua música já deve estar pronta!" : "Sua música foi iniciada"}
      </div>

      <p className="mt-1 text-center text-sm text-muted">
        {done
          ? "Confira seu WhatsApp — ela já foi enviada por lá."
          : "Será finalizada em até 1 hora. Por favor, aguarde."}
      </p>

      {!done && (
        <>
          <p className="mt-5 text-center font-heading text-5xl font-extrabold tabular-nums gradient-text">
            {formatClock(remainingMs)}
          </p>

          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-foreground/[0.08]">
            <div
              className="h-full rounded-full gradient-brand transition-[width] duration-1000 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-mount flag to avoid hydration mismatch with next-themes
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`h-9 w-9 ${className}`} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Alternar modo escuro"
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground ${className}`}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

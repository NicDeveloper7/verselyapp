"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Pause, Play, SkipBack, SkipForward, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlbumArt } from "@/components/album-art";
import { Waveform } from "@/components/waveform";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { ORIGINAL_PRICE, PRICE } from "@/lib/pricing";
import type { Campaign } from "@/lib/campaigns/types";

const benefits = [
  "Música 100% Personalizada",
  "Produção Profissional",
  "Entrega Rápida",
  "Um Presente Verdadeiramente Marcante",
];

const DURATION = 198; // 3:18

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Hero({ campaign }: { campaign: Campaign }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setElapsed((prev) => {
        const next = prev + delta;
        if (next >= DURATION) {
          setPlaying(false);
          return 0;
        }
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing]);

  const progress = (elapsed / DURATION) * 100;
  const { hero } = campaign;

  return (
    <section
      id="top"
      className={`relative overflow-hidden pb-24 sm:pb-32 ${
        campaign.banner ? "pt-44 sm:pt-52" : "pt-36 sm:pt-44"
      }`}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full ${campaign.theme.blobPrimary} blur-[120px]`}
        />
        <div
          className={`absolute -right-32 top-40 h-96 w-96 animate-blob rounded-full ${campaign.theme.blobAccent} blur-[100px]`}
        />
        <div
          className={`absolute -left-32 bottom-0 h-96 w-96 animate-blob rounded-full bg-secondary/20 blur-[100px] [animation-delay:4s]`}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-4 py-1.5 text-sm font-medium text-foreground/70">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            {hero.eyebrow}
          </div>

          <h1 className="text-balance font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headline}{" "}
            <span className="gradient-text">{hero.headlineHighlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{hero.subheadline}</p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm font-medium">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={13} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={getWhatsAppLink(campaign.whatsappMessage)} external size="lg">
              {hero.primaryCta}
            </Button>
            <Button
              href={campaign.songs.length > 0 ? "#collection" : "#testimonials"}
              variant="secondary"
              size="lg"
            >
              <Play size={16} className="fill-current" />
              {hero.secondaryCta}
            </Button>
          </div>

          <p className="mt-4 text-sm font-medium text-foreground/70">
            A partir de <span className="line-through text-muted">{ORIGINAL_PRICE}</span>{" "}
            <span className="font-bold text-accent">{PRICE}</span> — oferta por tempo limitado
          </p>
        </motion.div>

        {/* Right column: floating player mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:mx-0"
        >
          <div className="animate-float rounded-[28px] p-[1px] shadow-2xl shadow-primary/20">
            <div className="glass rounded-[28px] p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <AlbumArt seed={0} palette={campaign.theme.albumPalette} className="h-20 w-20 shrink-0" />
                <div className="min-w-0">
                  <p className="truncate font-heading text-lg font-semibold">{hero.playerTitle}</p>
                  <p className="text-sm text-muted">{hero.playerSubtitle}</p>
                </div>
              </div>

              <div className="relative mt-6 h-16 overflow-hidden rounded-2xl bg-foreground/90 px-4 py-3 dark:bg-white/10">
                <Waveform playing={playing} progress={progress} />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-medium text-muted">
                <span>{formatTime(elapsed)}</span>
                <span>{formatTime(DURATION)}</span>
              </div>

              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.08]">
                <div
                  className="h-full rounded-full gradient-brand transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-5 flex items-center justify-center gap-6">
                <button
                  type="button"
                  aria-label="Anterior"
                  className="text-foreground/50 transition-colors hover:text-foreground"
                >
                  <SkipBack size={20} />
                </button>
                <button
                  type="button"
                  aria-label={playing ? "Pausar" : "Tocar"}
                  onClick={() => setPlaying((v) => !v)}
                  className="flex h-14 w-14 items-center justify-center rounded-full gradient-brand text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
                >
                  {playing ? (
                    <Pause size={22} className="fill-current" />
                  ) : (
                    <Play size={22} className="fill-current pl-0.5" />
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Próxima"
                  className="text-foreground/50 transition-colors hover:text-foreground"
                >
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass absolute -left-6 -top-6 hidden rounded-2xl px-4 py-3 shadow-xl sm:block"
          >
            <div className="flex items-center gap-2">
              <div className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-1 text-sm font-bold">4,9/5 de Avaliação</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="glass absolute -bottom-6 -right-4 hidden rounded-2xl px-4 py-3 shadow-xl sm:block"
          >
            <p className="font-heading text-lg font-bold gradient-text">75.000+</p>
            <p className="text-xs text-muted">Músicas Criadas</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass absolute -bottom-8 left-1/3 hidden rounded-2xl px-4 py-2.5 shadow-xl md:block"
          >
            <p className="text-xs font-semibold text-foreground/80">⚡ Entrega em Até 1 Hora</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

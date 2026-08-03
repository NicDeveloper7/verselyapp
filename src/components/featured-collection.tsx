"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Quote, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AlbumArt } from "@/components/album-art";
import { Waveform } from "@/components/waveform";
import { CampaignBadge } from "@/components/campaign-badge";
import { CampaignCountdown } from "@/components/campaign-countdown";
import type { Campaign, CampaignSong } from "@/lib/campaigns/types";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function CollectionCard({
  song,
  index,
  campaign,
  isPlaying,
  elapsed,
  duration,
  onToggle,
}: {
  song: CampaignSong;
  index: number;
  campaign: Campaign;
  isPlaying: boolean;
  elapsed: number;
  duration: number;
  onToggle: () => void;
}) {
  const progress = duration > 0 ? (elapsed / duration) * 100 : 0;

  return (
    <ScrollReveal delay={(index % 3) * 0.1}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group h-full overflow-hidden rounded-2xl border border-border bg-foreground/[0.02] shadow-sm transition-shadow hover:shadow-xl"
      >
        <div className="relative">
          <AlbumArt
            seed={index}
            palette={campaign.theme.albumPalette}
            rounded="rounded-none"
            className="aspect-[4/3] w-full"
          />
          {song.badge && (
            <span
              className={`absolute left-3 top-3 rounded-full bg-gradient-to-r ${campaign.theme.ribbonGradient} px-2.5 py-1 text-[11px] font-bold ${campaign.theme.ribbonText} shadow-sm`}
            >
              {song.badge}
            </span>
          )}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isPlaying ? `Pausar ${song.title}` : `Tocar ${song.title}`}
            className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause size={20} className="fill-current" />
            ) : (
              <Play size={20} className="fill-current pl-0.5" />
            )}
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <p className="font-heading text-lg font-semibold">{song.title}</p>
            <span className="shrink-0 rounded-full bg-foreground/[0.05] px-2.5 py-1 text-[11px] font-semibold text-foreground/60">
              {formatTime(duration)}
            </span>
          </div>
          <p className="mt-0.5 text-xs font-medium text-muted">{song.genre}</p>

          {song.lyricPreview && (
            <div className="mt-3 flex items-start gap-2 text-sm italic leading-relaxed text-foreground/70">
              <Quote size={14} className="mt-1 shrink-0 text-primary/40" />
              <span>{song.lyricPreview}</span>
            </div>
          )}

          <p className="mt-3 text-sm leading-relaxed text-muted">{song.description}</p>

          <div className="mt-4 h-8 overflow-hidden rounded-lg bg-foreground/[0.05] px-2 py-1.5 dark:bg-white/[0.06]">
            <Waveform playing={isPlaying} progress={progress} bars={32} className="opacity-80" />
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-muted">
            <span>{formatTime(elapsed)}</span>
            <div className="mx-2 h-1 flex-1 overflow-hidden rounded-full bg-foreground/[0.08]">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${campaign.theme.ribbonGradient} transition-[width] duration-100`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

function ComingSoonCard({ campaign, index }: { campaign: Campaign; index: number }) {
  return (
    <ScrollReveal delay={(index % 3) * 0.1}>
      <div className="relative flex h-full min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-foreground/[0.02] p-8 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_50%_30%,var(--color-primary),transparent_55%)]" />
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r ${campaign.theme.ribbonGradient} text-blue-950 shadow-lg`}
        >
          <Sparkles size={22} />
        </motion.span>
        <p className="relative mt-5 font-heading text-lg font-semibold">Mais faixas a caminho</p>
        <p className="relative mt-2 max-w-[220px] text-sm leading-relaxed text-muted">
          Estamos gravando novas homenagens para o Dia dos Pais. Volte em breve para ouvir.
        </p>
        <span
          className={`relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${campaign.theme.ribbonGradient} px-3 py-1 text-xs font-bold ${campaign.theme.ribbonText}`}
        >
          Em produção
        </span>
      </div>
    </ScrollReveal>
  );
}

export function FeaturedCollection({ campaign }: { campaign: Campaign }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const raf = useRef<number | null>(null);

  const activeSong = campaign.songs.find((s) => s.id === playingId);

  // Real <audio> playback for songs that have an audioSrc.
  useEffect(() => {
    if (!activeSong?.audioSrc) return;

    const audio = new Audio(activeSong.audioSrc);
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      setDurations((prev) => ({ ...prev, [activeSong.id]: audio.duration }));
    };
    const onTimeUpdate = () => setElapsed(audio.currentTime);
    const onEnded = () => {
      setPlayingId(null);
      setElapsed(0);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.play().catch(() => setPlayingId(null));

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, [activeSong]);

  // Simulated waveform fallback for songs without a real audio file.
  useEffect(() => {
    if (!activeSong || activeSong.audioSrc) return;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setElapsed((prev) => {
        const next = prev + delta;
        if (next >= activeSong.durationSeconds) {
          setPlayingId(null);
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
  }, [activeSong]);

  if (campaign.songs.length === 0) return null;

  const handleToggle = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
      setElapsed(0);
      return;
    }
    setElapsed(0);
    setPlayingId(id);
  };

  return (
    <section id="collection" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <CampaignBadge campaign={campaign} className="mb-4" />
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {campaign.collectionTitle}
          </h2>
          <p className="mt-4 text-lg text-muted">{campaign.collectionSubtitle}</p>
          {campaign.banner?.countdownTarget && (
            <div
              className={`mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${campaign.theme.bannerGradient} px-4 py-2 text-white`}
            >
              <span className="text-xs font-semibold">Termina em:</span>
              <CampaignCountdown compact target={campaign.banner.countdownTarget} />
            </div>
          )}
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaign.songs.map((song, i) => (
            <CollectionCard
              key={song.id}
              song={song}
              index={i}
              campaign={campaign}
              isPlaying={playingId === song.id}
              elapsed={playingId === song.id ? elapsed : 0}
              duration={durations[song.id] ?? song.durationSeconds}
              onToggle={() => handleToggle(song.id)}
            />
          ))}
          <ComingSoonCard campaign={campaign} index={campaign.songs.length} />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Lightbulb,
  Mic2,
  PenLine,
  SlidersHorizontal,
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Waveform } from "@/components/waveform";

const slides = [
  {
    icon: Lightbulb,
    eyebrow: "Como tudo começou",
    title: "E se toda história pudesse virar canção?",
    description:
      "Foi essa pergunta simples que deu origem ao nosso estúdio — a vontade de transformar memórias em algo que se possa ouvir para sempre.",
    tag: "Origem",
  },
  {
    icon: Mic2,
    eyebrow: "Quem faz acontecer",
    title: "Músicos de verdade, apaixonados por histórias",
    description:
      "Reunimos compositores, produtores e instrumentistas que tratam cada projeto como se fosse a própria história deles.",
    tag: "Equipe",
  },
  {
    icon: PenLine,
    eyebrow: "O processo criativo",
    title: "Tudo começa com você",
    description:
      "Antes de escrever a primeira linha, a gente escuta cada detalhe da sua história — porque é isso que faz a música soar verdadeira.",
    tag: "Processo",
  },
  {
    icon: SlidersHorizontal,
    eyebrow: "Produção",
    title: "Qualidade de estúdio, sem atalhos",
    description:
      "Gravação, mixagem e masterização profissional em cada faixa, para que sua música soe tão bem quanto a história merece.",
    tag: "Produção",
  },
  {
    icon: Heart,
    eyebrow: "Nossa missão",
    title: "Milhares de histórias, um só propósito",
    description:
      "Ajudar pessoas a guardar seus momentos mais importantes em forma de música — para reviver sempre que quiserem.",
    tag: "Missão",
  },
];

export function StudioStory() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  };

  useEffect(() => {
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];
  const Icon = slide.icon;

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            A História do Nosso Estúdio
          </h2>
          <p className="mt-4 text-lg text-muted">
            Conheça um pouco de quem está por trás de cada música.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-primary/15">
            <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#1a1530] via-[#312a5c] to-[#4b2f6b]">
              <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_25%_25%,#EC4899,transparent_40%),radial-gradient(circle_at_75%_75%,#6C63FF,transparent_45%)]" />
              <div className="absolute inset-x-0 bottom-0 h-24 px-8 opacity-[0.15] sm:h-32">
                <Waveform playing bars={64} progress={0} />
              </div>
              <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_50%_120%,transparent_30%,rgba(0,0,0,0.35))]" />

              <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/70 backdrop-blur-sm sm:left-6 sm:top-6">
                {slide.tag} · {index + 1}/{slides.length}
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white shadow-lg shadow-black/20 backdrop-blur-sm sm:h-20 sm:w-20">
                    <Icon size={30} />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {slide.eyebrow}
                  </p>
                  <p className="mt-3 max-w-xl text-balance font-heading text-xl font-bold text-white sm:text-2xl">
                    {slide.title}
                  </p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                    {slide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Slide anterior"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground/[0.06]"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  aria-label={`Ir para o slide ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 gradient-brand" : "w-2 bg-foreground/15"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Próximo slide"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground/[0.06]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

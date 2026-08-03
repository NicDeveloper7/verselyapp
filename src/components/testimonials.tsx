"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { CampaignTestimonial } from "@/lib/campaigns/types";

export function Testimonials({ testimonials }: { testimonials: CampaignTestimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
    },
    [testimonials.length]
  );

  useEffect(() => {
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Amado por Milhares de Pessoas
          </h2>
          <p className="mt-4 text-lg text-muted">
            Reações reais de quem transformou sua história em uma música.
          </p>
        </ScrollReveal>

        <div className="relative mt-14">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border bg-foreground/[0.02] p-8 sm:p-12">
            <Quote
              className="absolute right-8 top-8 text-primary/10"
              size={64}
              strokeWidth={1.5}
            />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex text-accent">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-balance text-lg leading-relaxed sm:text-xl">
                  “{current.review}”
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full gradient-brand text-sm font-bold text-white">
                    {current.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{current.name}</p>
                    <p className="text-sm text-muted">{current.location} · Compra verificada</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Depoimento anterior"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground/[0.06]"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  aria-label={`Ir para o depoimento ${i + 1}`}
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
              aria-label="Próximo depoimento"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground/[0.06]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

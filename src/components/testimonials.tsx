"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, PenLine, Quote, Star } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";
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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Histórias Que Já Emocionaram Pais e Filhos
          </h2>
          <p className="mt-4 text-lg text-muted">
            Relatos de quem já transformou sua história em uma música com a gente.
          </p>
        </ScrollReveal>

        <div className="relative mt-14">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border bg-foreground/[0.02] p-8 sm:p-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col-reverse items-center gap-8 sm:flex-row sm:items-start"
              >
                <div className="relative flex-1">
                  <Quote
                    className="absolute -left-1 -top-1 text-primary/10"
                    size={56}
                    strokeWidth={1.5}
                  />
                  <div className="relative flex text-accent">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <p className="relative mt-5 text-balance text-lg leading-relaxed sm:text-xl">
                    “{current.review}”
                  </p>
                  <div className="relative mt-7 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full gradient-brand text-sm font-bold text-white">
                      {current.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{current.name}</p>
                      {current.location && <p className="text-sm text-muted">{current.location}</p>}
                    </div>
                  </div>
                </div>

                {current.screenshot && (
                  <div className="shrink-0">
                    <Image
                      src={current.screenshot.src}
                      alt={`Print da conversa de WhatsApp com ${current.name}`}
                      width={current.screenshot.width}
                      height={current.screenshot.height}
                      className="h-auto max-h-[360px] w-auto max-w-[200px] rounded-xl border border-border object-contain shadow-lg sm:max-w-[220px]"
                    />
                  </div>
                )}
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

          <div className="mt-8 flex justify-center">
            <Button
              href={getWhatsAppLink(
                "Olá! Sou cliente e quero deixar minha avaliação sobre a música que fiz. 💛"
              )}
              external
              variant="secondary"
            >
              <PenLine size={16} />
              Deixar uma Avaliação
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

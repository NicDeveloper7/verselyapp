"use client";

import { motion } from "framer-motion";
import { Award, Cake, Gift, Heart, HeartHandshake, Plane } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { fatherMoments } from "@/lib/data";

const icons = [Gift, Cake, Plane, HeartHandshake, Award, Heart];

export function MomentsGrid() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Qual Momento Vamos Celebrar?
          </h2>
          <p className="mt-4 text-lg text-muted">
            Não precisa ser só o Dia dos Pais — qualquer motivo é bom pra emocionar seu pai.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {fatherMoments.map((moment, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={moment.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex h-full flex-col items-center rounded-2xl border border-border bg-foreground/[0.02] p-5 text-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-snug">{moment.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{moment.description}</p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

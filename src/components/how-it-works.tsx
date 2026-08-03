"use client";

import { motion } from "framer-motion";
import { Disc3, Gift, PenLine, SlidersHorizontal } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { steps } from "@/lib/data";

const icons = [PenLine, Disc3, SlidersHorizontal, Gift];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-4 text-lg text-muted">
            Da sua história a uma música pronta em quatro passos simples.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-foreground/[0.02] p-7"
                >
                  <div className="absolute -right-4 -top-4 font-heading text-7xl font-extrabold text-foreground/[0.04] transition-colors group-hover:text-primary/[0.08]">
                    {step.number}
                  </div>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl gradient-brand text-white shadow-lg shadow-primary/20">
                    <Icon size={22} />
                  </div>
                  <h3 className="relative mt-5 font-heading text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

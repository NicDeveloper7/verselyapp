"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { statistics } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 gradient-brand opacity-95" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_15%_20%,white,transparent_35%),radial-gradient(circle_at_85%_80%,white,transparent_35%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center text-white lg:grid-cols-4">
          {statistics.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <p className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-white/80 sm:text-base">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

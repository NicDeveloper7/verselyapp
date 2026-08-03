import { Check, Minus, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { comparisonRows } from "@/lib/data";

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={18} className="text-primary" strokeWidth={2.5} />
    ) : (
      <Minus size={18} className="text-muted/50" />
    );
  }
  return <span>{value}</span>;
}

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Por Que Nos Escolher
          </h2>
          <p className="mt-4 text-lg text-muted">
            Veja como uma música verdadeiramente personalizada se compara a alternativas genéricas.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-14 overflow-hidden rounded-2xl border border-border shadow-xl shadow-black/[0.02]">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-foreground/[0.02] text-sm font-semibold sm:grid-cols-[1.6fr_1fr_1fr]">
            <div className="px-4 py-4 sm:px-6" />
            <div className="flex items-center justify-center gap-1.5 gradient-brand px-3 py-4 text-center text-white">
              <Sparkles size={15} />
              <span>Nosso Serviço</span>
            </div>
            <div className="px-3 py-4 text-center text-foreground/60">Outros</div>
          </div>

          {comparisonRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.4fr_1fr_1fr] items-center text-sm sm:grid-cols-[1.6fr_1fr_1fr] ${
                i % 2 === 1 ? "bg-foreground/[0.015]" : ""
              }`}
            >
              <div className="px-4 py-4 font-medium sm:px-6">{row.label}</div>
              <div className="flex items-center justify-center px-3 py-4 text-center font-semibold text-primary">
                <Cell value={row.ours} />
              </div>
              <div className="flex items-center justify-center px-3 py-4 text-center text-muted">
                <Cell value={row.others} />
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

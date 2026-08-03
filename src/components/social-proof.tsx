import { pressMentions } from "@/lib/data";

export function SocialProof() {
  const loop = [...pressMentions, ...pressMentions];

  return (
    <section className="border-y border-border py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Já apareceu em
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-16">
            {loop.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 font-heading text-xl font-bold text-foreground/30 grayscale transition-colors hover:text-foreground/50"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { trustBadges } from "@/lib/data";

export function SocialProof() {
  const loop = [...trustBadges, ...trustBadges];

  return (
    <section className="border-y border-border py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Por que confiar na gente
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-16">
            {loop.map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="shrink-0 whitespace-nowrap text-sm font-semibold text-foreground/50 transition-colors hover:text-foreground/70"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

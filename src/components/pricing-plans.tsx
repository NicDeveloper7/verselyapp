import { Check, Flame } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/plans";
import { getWhatsAppLink } from "@/lib/whatsapp";
import type { Campaign } from "@/lib/campaigns/types";

export function PricingPlans({ campaign }: { campaign: Campaign }) {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Escolha o Tamanho da Emoção
          </h2>
          <p className="mt-4 text-lg text-muted">
            Toda música é 100% original e produzida por músicos de verdade — a diferença está em quanto você quer emocionar.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const message = `${campaign.whatsappMessage} Quero o plano ${plan.name} (${plan.price}).`;

            return (
              <ScrollReveal key={plan.id} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    plan.highlighted
                      ? "border-primary/40 bg-primary/[0.03] shadow-xl shadow-primary/10"
                      : "border-border bg-foreground/[0.02]"
                  }`}
                >
                  {plan.tagline && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full gradient-brand px-3 py-1 text-xs font-bold text-white shadow-md">
                      <Flame size={12} className="fill-current" />
                      {plan.tagline}
                    </span>
                  )}

                  <p className="font-heading text-lg font-semibold">{plan.name}</p>

                  <div className="mt-3 flex items-baseline gap-2">
                    {plan.originalPrice && (
                      <span className="text-sm font-medium text-muted line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="font-heading text-3xl font-extrabold gradient-text">
                      {plan.price}
                    </span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {plan.features.map((feature) => {
                      const isDivider = feature.startsWith("Tudo do");
                      return (
                        <li
                          key={feature}
                          className={
                            isDivider
                              ? "pt-1 text-xs font-semibold uppercase tracking-wide text-foreground/50"
                              : "flex items-start gap-2.5 leading-relaxed"
                          }
                        >
                          {!isDivider && (
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Check size={11} strokeWidth={3} />
                            </span>
                          )}
                          {feature}
                        </li>
                      );
                    })}
                  </ul>

                  <Button
                    href={`/pedido?plan=${plan.id}`}
                    variant={plan.highlighted ? "primary" : "secondary"}
                    className="mt-7 w-full"
                  >
                    Comprar Agora — {plan.price}
                  </Button>

                  <Button
                    href={getWhatsAppLink(message)}
                    external
                    variant="ghost"
                    className="mt-2 w-full"
                  >
                    ou fale no WhatsApp primeiro
                  </Button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

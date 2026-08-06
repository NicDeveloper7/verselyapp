import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { PricingPromo } from "@/components/pricing-promo";
import { TrustRow } from "@/components/trust-row";
import { getWhatsAppLink } from "@/lib/whatsapp";
import type { Campaign } from "@/lib/campaigns/types";

export function FinalCTA({ campaign }: { campaign: Campaign }) {
  const headline = campaign.hero.finalCtaHeadline ?? "Pronto para Transformar Sua História em Música?";
  const subheadline =
    campaign.hero.finalCtaSubheadline ?? "Crie uma música personalizada que será lembrada para sempre.";

  return (
    <section id="order" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 gradient-brand opacity-[0.07]" />
        <div className={`absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full ${campaign.theme.blobPrimary} blur-[140px]`} />
        <div className={`absolute -bottom-24 -right-24 h-72 w-72 rounded-full ${campaign.theme.blobAccent} blur-[110px]`} />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-secondary/20 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-balance font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">{subheadline}</p>

          <div className="mt-8 flex justify-center">
            <PricingPromo campaign={campaign} />
          </div>

          <div className="mt-8 flex justify-center">
            <Button href={getWhatsAppLink(campaign.whatsappMessage)} external size="lg">
              {campaign.hero.primaryCta}
              <ArrowRight size={18} />
            </Button>
          </div>

          <TrustRow className="mt-6 justify-center" />
        </ScrollReveal>
      </div>
    </section>
  );
}

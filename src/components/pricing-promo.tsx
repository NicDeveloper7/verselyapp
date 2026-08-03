"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { CampaignCountdown } from "@/components/campaign-countdown";
import type { Campaign } from "@/lib/campaigns/types";
import { DISCOUNT_LABEL, ORIGINAL_PRICE, PRICE } from "@/lib/pricing";

export function PricingPromo({ campaign, className = "" }: { campaign: Campaign; className?: string }) {
  return (
    <div
      className={`relative mx-auto inline-flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-accent/40 bg-accent/[0.04] px-8 py-6 ${className}`}
    >
      <motion.span
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-accent to-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg"
      >
        <Flame size={12} className="fill-current" />
        Oferta relâmpago — {DISCOUNT_LABEL}
      </motion.span>

      <div className="mt-2 flex items-baseline gap-3">
        <span className="text-lg font-medium text-muted line-through">{ORIGINAL_PRICE}</span>
        <span className="font-heading text-4xl font-extrabold gradient-text sm:text-5xl">{PRICE}</span>
      </div>

      <p className="text-sm font-semibold text-foreground/80">
        Essa oferta especial acaba em breve — garanta antes que o preço volte ao normal.
      </p>

      {campaign.banner?.countdownTarget && (
        <div
          className={`mt-1 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${campaign.theme.bannerGradient} px-4 py-1.5 text-white`}
        >
          <span className="text-xs font-semibold">Termina em:</span>
          <CampaignCountdown compact target={campaign.banner.countdownTarget} />
        </div>
      )}
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import type { Campaign } from "@/lib/campaigns/types";
import { CampaignCountdown } from "@/components/campaign-countdown";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function PromoBanner({ campaign }: { campaign: Campaign }) {
  const { banner } = campaign;
  if (!banner) return null;

  return (
    <div className={`bg-gradient-to-r ${campaign.theme.bannerGradient} text-white`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 py-2 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-semibold">
          <span className="mr-1.5">{banner.icon}</span>
          {banner.title}
          <span className="hidden font-normal text-white/80 sm:inline"> — {banner.message}</span>
        </span>

        {banner.countdownTarget && (
          <CampaignCountdown target={banner.countdownTarget} className="hidden sm:flex" />
        )}

        <a
          href={getWhatsAppLink(campaign.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold transition-colors hover:bg-white/25"
        >
          {banner.ctaLabel}
          <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}

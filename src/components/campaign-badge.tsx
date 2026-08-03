import { Sparkles } from "lucide-react";
import type { Campaign } from "@/lib/campaigns/types";

export function CampaignBadge({
  campaign,
  className = "",
}: {
  campaign: Campaign;
  className?: string;
}) {
  if (!campaign.badge) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${campaign.theme.ribbonGradient} px-3 py-1 text-xs font-bold ${campaign.theme.ribbonText} shadow-sm ${className}`}
    >
      <Sparkles size={12} />
      {campaign.badge}
    </span>
  );
}

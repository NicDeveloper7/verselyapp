import type { Campaign, CampaignSchedule } from "./types";
import { evergreenCampaign } from "./evergreen";
import { fathersDayCampaign } from "./fathers-day";
import { mothersDayCampaign } from "./mothers-day";
import { christmasCampaign } from "./christmas";
import { valentinesCampaign } from "./valentines";
import { birthdayCampaign } from "./birthday";
import { anniversaryCampaign } from "./anniversary";

export const campaigns: Record<string, Campaign> = {
  "fathers-day": fathersDayCampaign,
  "mothers-day": mothersDayCampaign,
  christmas: christmasCampaign,
  valentines: valentinesCampaign,
  birthday: birthdayCampaign,
  anniversary: anniversaryCampaign,
  evergreen: evergreenCampaign,
};

/**
 * Controls which campaign is live.
 *
 * - Set to a specific id (e.g. "fathers-day") to force that campaign on,
 *   regardless of the date — this is how you enable/disable a campaign
 *   without touching any page structure.
 * - Set to "auto" to let each campaign's `schedule` window decide based
 *   on the current date, falling back to `evergreen` when none match.
 *
 * To add a new seasonal campaign: create a file in this folder following
 * the same `Campaign` shape and register it in the map above — no
 * component needs to change.
 */
export const ACTIVE_CAMPAIGN_ID: string = "fathers-day";

function isWithinSchedule(date: Date, schedule: CampaignSchedule): boolean {
  const toOrdinal = (monthDay: string) => {
    const [month, day] = monthDay.split("-").map(Number);
    return month * 100 + day;
  };

  const current = (date.getMonth() + 1) * 100 + date.getDate();
  const start = toOrdinal(schedule.startMonthDay);
  const end = toOrdinal(schedule.endMonthDay);

  if (start <= end) return current >= start && current <= end;
  return current >= start || current <= end; // window wraps across year-end
}

export function getActiveCampaign(now: Date = new Date()): Campaign {
  if (ACTIVE_CAMPAIGN_ID !== "auto") {
    const forced = campaigns[ACTIVE_CAMPAIGN_ID];
    if (forced && forced.active) return forced;
  }

  for (const campaign of Object.values(campaigns)) {
    if (campaign.id === "evergreen" || !campaign.active || !campaign.schedule) continue;
    if (isWithinSchedule(now, campaign.schedule)) return campaign;
  }

  return campaigns.evergreen;
}

export type { Campaign, CampaignSong, CampaignTestimonial, CampaignBanner } from "./types";

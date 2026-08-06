export type CampaignSong = {
  id: string;
  title: string;
  genre: string;
  duration: string;
  durationSeconds: number;
  /** Omit when there's no real transcript yet — the card hides the quote block. */
  lyricPreview?: string;
  description: string;
  badge?: string;
  /** Path under /public to a real audio file (e.g. "/audio/track.mp3"). When absent, the card falls back to the simulated waveform demo. */
  audioSrc?: string;
};

export type CampaignTestimonial = {
  name: string;
  /** Omit when there's no verifiable city/state to show — avoids implying a specific, checkable claim. */
  location?: string;
  initials: string;
  rating: number;
  review: string;
};

export type CampaignBanner = {
  icon: string;
  title: string;
  message: string;
  ctaLabel: string;
  countdownTarget?: string;
};

export type CampaignHero = {
  eyebrow: string;
  headline: string;
  headlineHighlight: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  playerTitle: string;
  playerSubtitle: string;
  /** Headline/subheadline for the closing CTA section. Falls back to generic copy when omitted. */
  finalCtaHeadline?: string;
  finalCtaSubheadline?: string;
};

export type CampaignTheme = {
  /** Tailwind classes for the two decorative hero blobs. */
  blobPrimary: string;
  blobAccent: string;
  /** Tailwind gradient stop classes for ribbon-style badges. */
  ribbonGradient: string;
  ribbonText: string;
  /** Tailwind gradient stop classes for the top promo banner. */
  bannerGradient: string;
  /** Gradient classes used by AlbumArt for this campaign's songs. */
  albumPalette: string[];
};

export type CampaignSchedule = {
  /** Recurring yearly window, "MM-DD" format. Wraps across year-end if start > end. */
  startMonthDay: string;
  endMonthDay: string;
};

export type Campaign = {
  id: string;
  name: string;
  /** Enable/disable switch — an inactive campaign is never auto-selected. */
  active: boolean;
  /** Recurring calendar window used when the registry resolves campaigns automatically. */
  schedule?: CampaignSchedule;
  /** Short label shown in badges/ribbons across the site. Empty string hides the badge. */
  badge: string;
  /** Pre-filled text sent when a "buy" CTA opens WhatsApp for this campaign. */
  whatsappMessage: string;
  theme: CampaignTheme;
  hero: CampaignHero;
  banner: CampaignBanner | null;
  collectionTitle: string;
  collectionSubtitle: string;
  songs: CampaignSong[];
  testimonials: CampaignTestimonial[];
};

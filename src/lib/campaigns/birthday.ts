import { PRICE } from "@/lib/pricing";
import type { Campaign } from "./types";

/**
 * Birthdays aren't tied to a calendar window, so this campaign has no
 * `schedule` — it only activates when forced via ACTIVE_CAMPAIGN_ID.
 */
export const birthdayCampaign: Campaign = {
  id: "birthday",
  name: "Aniversário",
  active: true,
  badge: "Presente de Aniversário",
  whatsappMessage: `Olá! Vi a promoção de aniversário (${PRICE}) e quero criar uma música personalizada. 🎂`,
  theme: {
    blobPrimary: "bg-secondary/25",
    blobAccent: "bg-amber-300/25",
    ribbonGradient: "from-secondary to-accent",
    ribbonText: "text-white",
    bannerGradient: "from-secondary via-accent to-primary",
    albumPalette: [
      "from-[#A855F7] via-[#EC4899] to-[#FDE68A]",
      "from-[#7C3AED] via-[#D946EF] to-[#FBCFE8]",
      "from-[#6D28D9] via-[#C026D3] to-[#FDE68A]",
      "from-[#9333EA] via-[#F472B6] to-[#FDE68A]",
    ],
  },
  hero: {
    eyebrow: "O presente de aniversário que ninguém esquece",
    headline: "Transforme o Aniversário em uma",
    headlineHighlight: "Música Só Dele",
    subheadline:
      "Conte a história de quem está fazendo aniversário e receba uma música personalizada para celebrar.",
    primaryCta: "Criar Música de Aniversário",
    secondaryCta: "Ouvir Exemplos de Aniversário",
    playerTitle: "Mais Um Ano Assim",
    playerSubtitle: "A história dele(a), em música",
  },
  banner: {
    icon: "🎂",
    title: "Presente de Aniversário",
    message: "Surpreenda com um presente que ninguém mais vai dar.",
    ctaLabel: "Criar Agora",
  },
  collectionTitle: "Coleção Aniversário",
  collectionSubtitle: "Músicas para celebrar mais um ano de vida.",
  songs: [
    {
      id: "bd1",
      title: "Mais Um Ano Assim",
      genre: "Pop",
      duration: "2:52",
      durationSeconds: 172,
      lyricPreview: "\"Mais uma vela, mais uma história / que a gente guarda pra sempre na memória.\"",
      description: "Uma canção animada para celebrar cada novo ano de vida.",
      badge: "Presente Mais Popular",
    },
    {
      id: "bd2",
      title: "Feliz Você Existir",
      genre: "R&B",
      duration: "3:04",
      durationSeconds: 184,
      lyricPreview: "\"Não é sobre a idade, é sobre ser feliz por você existir.\"",
      description: "Uma homenagem carinhosa para quem faz o mundo melhor só por estar nele.",
    },
    {
      id: "bd3",
      title: "Brinde a Você",
      genre: "Soul",
      duration: "3:12",
      durationSeconds: 192,
      lyricPreview: "\"Ergo esse brinde, essa taça, essa canção / por tudo que você é, meu coração.\"",
      description: "Elegante e emocionante, perfeita para o momento do parabéns.",
      badge: "Escolha da Equipe",
    },
  ],
  testimonials: [
    {
      name: "Vanessa Lopes",
      location: "Manaus, AM",
      initials: "VL",
      rating: 5,
      review: "Tocamos na hora do bolo e todo mundo cantou junto. Momento inesquecível.",
    },
    {
      name: "Eduardo Pires",
      location: "Ribeirão Preto, SP",
      initials: "EP",
      rating: 5,
      review: "Foi o melhor presente de aniversário que eu já recebi na vida, sem dúvida nenhuma.",
    },
    {
      name: "Carla Mendes",
      location: "Joinville, SC",
      initials: "CM",
      rating: 5,
      review: "A surpresa foi perfeita. Ela não parava de perguntar quem tinha escrito a letra.",
    },
  ],
};

import { PRICE } from "@/lib/pricing";
import type { Campaign } from "./types";

/**
 * Anniversaries aren't tied to a calendar window, so this campaign has no
 * `schedule` — it only activates when forced via ACTIVE_CAMPAIGN_ID.
 */
export const anniversaryCampaign: Campaign = {
  id: "anniversary",
  name: "Aniversário de Casamento",
  active: true,
  badge: "Especial de Bodas",
  whatsappMessage: `Olá! Vi a promoção de bodas (${PRICE}) e quero criar nossa música. 💍`,
  theme: {
    blobPrimary: "bg-amber-400/25",
    blobAccent: "bg-primary/20",
    ribbonGradient: "from-amber-300 to-yellow-500",
    ribbonText: "text-amber-950",
    bannerGradient: "from-amber-700 via-yellow-600 to-amber-800",
    albumPalette: [
      "from-[#78350F] via-[#D97706] to-[#FDE68A]",
      "from-[#92400E] via-[#F59E0B] to-[#FEF3C7]",
      "from-[#713F12] via-[#EAB308] to-[#FDE68A]",
      "from-[#854D0E] via-[#F59E0B] to-[#FFFBEB]",
    ],
  },
  hero: {
    eyebrow: "Celebre cada ano ao lado um do outro",
    headline: "Transforme os Anos Juntos em uma",
    headlineHighlight: "Música Para Sempre",
    subheadline:
      "Conte a história do casal e receba uma música personalizada para celebrar essa jornada.",
    primaryCta: "Criar Nossa Música",
    secondaryCta: "Ouvir Exemplos de Bodas",
    playerTitle: "Toda Essa Estrada",
    playerSubtitle: "A jornada de vocês, em música",
  },
  banner: {
    icon: "💍",
    title: "Especial de Bodas",
    message: "Celebre cada ano juntos com um presente que conta a história de vocês.",
    ctaLabel: "Criar Agora",
  },
  collectionTitle: "Coleção Bodas",
  collectionSubtitle: "Músicas para celebrar quantos anos forem, juntos.",
  songs: [
    {
      id: "an1",
      title: "Toda Essa Estrada",
      genre: "Balada Acústica",
      duration: "3:19",
      durationSeconds: 199,
      lyricPreview: "\"Foram tantos anos de estrada, de altos e baixos / e eu escolheria cada um de novo.\"",
      description: "Uma canção sobre a jornada construída a dois, ano após ano.",
      badge: "Escolha da Equipe",
    },
    {
      id: "an2",
      title: "Ainda Escolho Você",
      genre: "Soul",
      duration: "3:07",
      durationSeconds: 187,
      lyricPreview: "\"Depois de tudo que vivemos, eu ainda escolho você / todos os dias, sem pensar duas vezes.\"",
      description: "Uma reafirmação de amor, ideal para bodas de qualquer ano.",
      badge: "Presente Mais Popular",
    },
    {
      id: "an3",
      title: "Nosso Endereço",
      genre: "R&B",
      duration: "2:58",
      durationSeconds: 178,
      lyricPreview: "\"Não importa a casa, a rua ou a cidade / você é o único endereço que eu preciso saber.\"",
      description: "Sobre o lar que dois corações constroem juntos, não importa onde estejam.",
    },
  ],
  testimonials: [
    {
      name: "Roberta Cunha",
      location: "Niterói, RJ",
      initials: "RC",
      rating: 5,
      review: "Presenteei meu marido nas nossas bodas de prata. Ele guardou a letra impressa na carteira.",
    },
    {
      name: "Marcelo Dias",
      location: "Sorocaba, SP",
      initials: "MD",
      rating: 5,
      review: "Contei toda a nossa história e a música ficou tão real que parecia que a gente mesmo tinha escrito.",
    },
    {
      name: "Fernanda Rocha",
      location: "Uberlândia, MG",
      initials: "FR",
      rating: 5,
      review: "Tocamos na festa de bodas de ouro dos meus pais. Não sobrou olho seco na sala.",
    },
  ],
};

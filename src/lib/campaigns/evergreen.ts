import { PRICE } from "@/lib/pricing";
import type { Campaign } from "./types";

/**
 * The default, occasion-agnostic campaign. Used whenever no seasonal
 * campaign is active — see `getActiveCampaign` in `./index.ts`.
 */
export const evergreenCampaign: Campaign = {
  id: "evergreen",
  name: "Padrão",
  active: true,
  badge: "",
  whatsappMessage: `Olá! Vi a promoção (${PRICE}) e quero criar uma música personalizada.`,
  theme: {
    blobPrimary: "bg-primary/20",
    blobAccent: "bg-accent/20",
    ribbonGradient: "from-primary to-accent",
    ribbonText: "text-white",
    bannerGradient: "from-primary via-secondary to-accent",
    albumPalette: [
      "from-[#6C63FF] via-[#8B63FF] to-[#EC4899]",
      "from-[#A855F7] via-[#C063E8] to-[#EC4899]",
      "from-[#6C63FF] via-[#7C6CF0] to-[#A855F7]",
      "from-[#EC4899] via-[#D6579E] to-[#6C63FF]",
    ],
  },
  hero: {
    eyebrow: "Músicas personalizadas, produzidas por músicos de verdade",
    headline: "Transforme Sua História em uma",
    headlineHighlight: "Música Inesquecível",
    subheadline:
      "Conte sua história, escolha seu estilo musical favorito e receba uma música personalizada e produzida profissionalmente em até 1 hora.",
    primaryCta: "Criar Minha Música",
    secondaryCta: "Ver Depoimentos",
    playerTitle: "Pele Dourada",
    playerSubtitle: "Sua história, em Soul",
  },
  banner: null,
  collectionTitle: "",
  collectionSubtitle: "",
  songs: [],
  testimonials: [
    {
      name: "Amanda Reis",
      location: "São Paulo, SP",
      initials: "AR",
      rating: 5,
      review:
        "Pedi uma música pras bodas de pérola dos meus pais e a sala inteira se emocionou. Contou a história deles melhor do que eu mesma conseguiria escrever.",
    },
    {
      name: "Marcos Lima",
      location: "Belo Horizonte, MG",
      initials: "ML",
      rating: 5,
      review:
        "A qualidade da produção me impressionou — parecia que eu tava ouvindo uma música tocando no rádio. Valeu cada centavo.",
    },
    {
      name: "Priscila Nogueira",
      location: "Curitiba, PR",
      initials: "PN",
      rating: 5,
      review:
        "Do envio da nossa história até receber a faixa final foram menos de dois dias. Minha irmã ainda ouve em loop.",
    },
    {
      name: "Daniel Oliveira",
      location: "Recife, PE",
      initials: "DO",
      rating: 5,
      review:
        "Já comprei muito presente ao longo dos anos, mas nada teve o impacto desse. Senti que realmente ouviram o que eu escrevi.",
    },
    {
      name: "Sofia Bezerra",
      location: "Porto Alegre, RS",
      initials: "SB",
      rating: 5,
      review:
        "O processo de revisão foi bem tranquilo, e a equipe foi gentil do início ao fim. A música virou parte do nosso casamento pra sempre.",
    },
  ],
};

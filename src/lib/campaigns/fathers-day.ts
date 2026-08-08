import { PRICE } from "@/lib/pricing";
import type { Campaign } from "./types";

export const fathersDayCampaign: Campaign = {
  id: "fathers-day",
  name: "Dia dos Pais",
  active: true,
  schedule: { startMonthDay: "07-15", endMonthDay: "08-09" },
  badge: "Especial Dia dos Pais",
  whatsappMessage: `Olá! Vi a promoção do Dia dos Pais (${PRICE}) e quero emocionar meu pai com uma música só dele. 🎁`,
  theme: {
    blobPrimary: "bg-blue-600/25",
    blobAccent: "bg-amber-400/25",
    ribbonGradient: "from-amber-400 to-yellow-500",
    ribbonText: "text-blue-950",
    bannerGradient: "from-blue-800 via-blue-700 to-blue-900",
    albumPalette: [
      "from-[#1E3A8A] via-[#2563EB] to-[#D4AF37]",
      "from-[#1E40AF] via-[#3B82F6] to-[#F5D485]",
      "from-[#172554] via-[#1D4ED8] to-[#D4AF37]",
      "from-[#0F2A6B] via-[#2563EB] to-[#EAB308]",
    ],
  },
  hero: {
    eyebrow: "Uma homenagem perfeita para o seu herói",
    headline: "Um Presente Que Vai",
    headlineHighlight: "Emocionar Seu Pai de Verdade",
    subheadline:
      "Conte pra gente a história de vocês e receba uma música só dele em até 1 hora — pronta para guardar (e ouvir) para sempre.",
    primaryCta: "Quero Emocionar Meu Pai 🎁",
    secondaryCta: "Ouvir Exemplos do Dia dos Pais",
    playerTitle: "O Homem Que Me Criou",
    playerSubtitle: "Sua história com ele, em música",
    finalCtaHeadline: "Seu Pai Merece Ouvir Isso",
    finalCtaSubheadline:
      "Uma música feita só para ele, pronta para arrancar um sorriso (ou uma lágrima) no Dia dos Pais. Garanta antes que a promoção acabe.",
    shareDescription:
      "Transforme a história com seu pai numa música só dele — em poucos cliques, pronta em até 1 hora. 🎁",
  },
  banner: {
    icon: "🎁",
    title: "Especial Dia dos Pais",
    message: "Peça hoje e crie um presente inesquecível para o seu pai.",
    ctaLabel: "Criar Agora",
    countdownTarget: "2026-08-09T23:59:59-03:00",
  },
  collectionTitle: "Coleção Dia dos Pais",
  collectionSubtitle:
    "Ouça algumas das histórias que já viraram música — e fique de olho, tem muito mais chegando.",
  songs: [
    {
      id: "fd1",
      title: "Cartas para o Papai",
      genre: "Balada Acústica",
      duration: "3:02",
      durationSeconds: 182,
      description:
        "Uma carta em forma de música, para o pai que sempre soube dizer as palavras certas.",
      badge: "Escolha da Equipe",
      audioSrc: "/audio/cartas-para-o-papai.mp3",
    },
    {
      id: "fd2",
      title: "Meu Herói para Sempre",
      genre: "Pop Emocional",
      duration: "3:15",
      durationSeconds: 195,
      description: "Um hino animado para o pai que sempre esteve lá, capa e tudo.",
      badge: "Presente Mais Popular",
      audioSrc: "/audio/meu-heroi-para-sempre.mp3",
    },
    {
      id: "fd3",
      title: "Meu Herói Tem Seu Nome",
      genre: "Balada Emotiva",
      duration: "4:05",
      durationSeconds: 245,
      description: "Uma homenagem que carrega o nome dele em cada verso.",
      audioSrc: "/audio/meu-heroi-tem-seu-nome.mp3",
    },
    {
      id: "fd4",
      title: "Meu Herói, Reginaldo",
      genre: "Sertanejo Raiz",
      duration: "3:46",
      durationSeconds: 226,
      description: "A história de um pai chamado Reginaldo, contada em música.",
      audioSrc: "/audio/meu-heroi-reginaldo.mp3",
    },
    {
      id: "fd5",
      title: "Obrigado por Tudo, Pai",
      genre: "MPB Acústico",
      duration: "4:53",
      durationSeconds: 293,
      description: "Um agradecimento sincero para o pai que fez tudo por ele.",
      audioSrc: "/audio/obrigado-por-tudo-pai.mp3",
    },
  ],
  // Real customer reactions, screenshotted from actual WhatsApp
  // conversations — first names only, as shown in the chat itself.
  testimonials: [
    {
      name: "Isadora",
      initials: "IS",
      rating: 5,
      review: "Caiu um cisco aqui, muito obrigada 🥹",
      screenshot: { src: "/reviews/isadora.png", width: 828, height: 1022 },
    },
    {
      name: "Assis",
      initials: "AS",
      rating: 5,
      review: "Perfeito, com lágrimas aqui. Agradeço muito, obrigado.",
      screenshot: { src: "/reviews/assis.png", width: 827, height: 411 },
    },
    {
      name: "Agatha",
      initials: "AG",
      rating: 5,
      review: "Já chorei... ele é tudo pra mim, e essa música fala tudo.",
      screenshot: { src: "/reviews/agatha.png", width: 828, height: 1703 },
    },
  ],
};

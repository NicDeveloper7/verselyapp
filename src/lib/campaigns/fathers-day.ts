import { PRICE } from "@/lib/pricing";
import type { Campaign } from "./types";

export const fathersDayCampaign: Campaign = {
  id: "fathers-day",
  name: "Dia dos Pais",
  active: true,
  schedule: { startMonthDay: "07-15", endMonthDay: "08-09" },
  badge: "Especial Dia dos Pais",
  whatsappMessage: `Olá! Vi a promoção do Dia dos Pais (${PRICE}) e quero criar a Música do Papai. 🎁`,
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
    eyebrow: "Uma homenagem sob medida para o seu herói",
    headline: "Dê ao Papai um Presente",
    headlineHighlight: "Que Ele Nunca Vai Esquecer",
    subheadline:
      "Transforme suas memórias favoritas em uma música personalizada que ele vai guardar para sempre.",
    primaryCta: "Criar a Música do Papai",
    secondaryCta: "Ouvir Exemplos do Dia dos Pais",
    playerTitle: "O Homem Que Me Criou",
    playerSubtitle: "Sua história com ele, em música",
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
  ],
  testimonials: [
    {
      name: "Camila Duarte",
      location: "São Paulo, SP",
      initials: "CD",
      rating: 5,
      review:
        "Meu pai chorou que nem criança quando ouviu a música. Vou lembrar desse momento pro resto da vida.",
    },
    {
      name: "Rafael Teixeira",
      location: "Belo Horizonte, MG",
      initials: "RT",
      rating: 5,
      review:
        "Foi de longe o melhor presente de Dia dos Pais que eu já dei. Ele pediu pra tocar de novo na hora, uns três vezes seguidas.",
    },
    {
      name: "Bianca Souza",
      location: "Recife, PE",
      initials: "BS",
      rating: 5,
      review: "Meu pai falou que foi o presente mais especial que ele já ganhou na vida dele.",
    },
    {
      name: "Thiago Almeida",
      location: "Curitiba, PR",
      initials: "TA",
      rating: 5,
      review:
        "Contei uns causos que só a nossa família entende, e a letra ficou do jeitinho que eu queria. Emocionou todo mundo lá na festa.",
    },
    {
      name: "Larissa Martins",
      location: "Porto Alegre, RS",
      initials: "LM",
      rating: 5,
      review:
        "Meu pai é osso duro de roer, não chora fácil não — mas dessa vez chorou. Já decidi: vou repetir isso todo Dia dos Pais.",
    },
  ],
};

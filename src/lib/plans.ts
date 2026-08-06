export type Plan = {
  id: string;
  name: string;
  price: string;
  /** Integer cents — kept in sync with `price` by hand, used only for display/estimates now. The real charged amount lives in Cakto. */
  priceCents: number;
  originalPrice?: string;
  tagline?: string;
  /** Feature lines for this plan. Each plan already lists everything from the tier below it. */
  features: string[];
  highlighted?: boolean;
  /**
   * Cakto checkout link for this plan (order bumps/upsell/downsell are
   * configured natively in the Cakto dashboard, not in this app).
   */
  checkoutUrl: string | null;
};

export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 27,90",
    priceCents: 2790,
    originalPrice: "R$ 59,90",
    features: [
      "Letra 100% personalizada com a história do seu pai",
      "Produção profissional (voz, instrumentos e mixagem)",
      "Entrega em até 1 hora, direto no WhatsApp",
      "1 revisão gratuita incluída",
    ],
    checkoutUrl: "https://pay.cakto.com.br/98b33k4_1025214",
  },
  {
    id: "emocionante",
    name: "Emocionante",
    price: "R$ 47,90",
    priceCents: 4790,
    tagline: "Mais escolhido",
    highlighted: true,
    features: [
      "Tudo do Essencial, mais:",
      "Letra impressa em PDF artesanal, pronta pra imprimir ou enviar",
      "Entrega prioritária",
      "2 revisões gratuitas incluídas",
    ],
    checkoutUrl: "https://pay.cakto.com.br/ww4o7xn_1025532",
  },
  {
    id: "memoria-viva",
    name: "Memória Viva",
    price: "R$ 67,90",
    priceCents: 6790,
    features: [
      "Tudo do Emocionante, mais:",
      "Vídeo personalizado com fotos do seu pai e de vocês dois",
      "Entrega prioritária máxima",
    ],
    checkoutUrl: "https://pay.cakto.com.br/featqsr_1025538",
  },
];

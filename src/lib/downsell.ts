export const DOWNSELL_OFFER_ID = "downsell";

export const downsellOffer = {
  id: DOWNSELL_OFFER_ID,
  name: "Oferta Especial",
  price: "R$ 15,00",
  priceCents: 1500,
  /**
   * Filled in once a discounted offer exists in Cakto and the link is
   * confirmed. The popup stays hidden until this is set, so it never
   * shows a "special offer" that doesn't actually lead anywhere.
   */
  checkoutUrl: "https://pay.cakto.com.br/qymuknf_1026946" as string | null,
};

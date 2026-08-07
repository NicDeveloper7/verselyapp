import { NextResponse } from "next/server";
import { insertOrder } from "@/lib/db";
import { plans } from "@/lib/plans";
import { downsellOffer, DOWNSELL_OFFER_ID } from "@/lib/downsell";
import { buildCaktoCheckoutUrl } from "@/lib/cakto";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const {
    planId,
    customerName,
    customerWhatsapp,
    customerEmail,
    fatherName,
    story,
    genre,
    mood,
    vocalType,
    referenceTrack,
  } = body as Record<string, unknown>;

  const asText = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);

  // The discount popup's offer isn't a listed plan, so it's resolved
  // separately rather than living in the plans array shown on the pricing
  // section.
  const plan = planId === DOWNSELL_OFFER_ID ? downsellOffer : plans.find((p) => p.id === planId);
  if (!plan) {
    return NextResponse.json({ error: "Plano inválido." }, { status: 400 });
  }
  if (!plan.checkoutUrl) {
    return NextResponse.json(
      { error: "Esse plano ainda não está disponível para compra. Fale com a gente no WhatsApp." },
      { status: 503 }
    );
  }

  const whatsapp = typeof customerWhatsapp === "string" ? customerWhatsapp.trim() : "";
  const email = typeof customerEmail === "string" ? customerEmail.trim() : "";

  if (
    typeof customerName !== "string" ||
    !customerName.trim() ||
    typeof story !== "string" ||
    !story.trim() ||
    (!whatsapp && !email)
  ) {
    return NextResponse.json(
      { error: "Preencha seu nome, a história e pelo menos um contato (WhatsApp ou e-mail)." },
      { status: 400 }
    );
  }

  let order;
  try {
    order = await insertOrder({
      planId: plan.id,
      planName: plan.name,
      priceCents: plan.priceCents,
      customerName: customerName.trim(),
      customerWhatsapp: whatsapp || null,
      customerEmail: email || null,
      fatherName: asText(fatherName),
      story: story.trim(),
      genre: asText(genre),
      mood: asText(mood),
      vocalType: asText(vocalType),
      referenceTrack: asText(referenceTrack),
    });
  } catch (err) {
    console.error("Failed to insert order", err);
    return NextResponse.json(
      { error: "Não conseguimos salvar seu pedido. Tente novamente." },
      { status: 500 }
    );
  }

  const checkoutUrl = buildCaktoCheckoutUrl(plan.checkoutUrl, {
    name: customerName.trim(),
    email: email || null,
    whatsapp: whatsapp || null,
  });

  return NextResponse.json({ orderId: order.id, checkoutUrl });
}

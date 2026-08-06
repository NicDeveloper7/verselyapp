import { NextResponse } from "next/server";
import { insertOrder } from "@/lib/db";
import { plans } from "@/lib/plans";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const { planId, customerName, customerWhatsapp, customerEmail, fatherName, story, genre } =
    body as Record<string, unknown>;

  const plan = plans.find((p) => p.id === planId);
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
    order = insertOrder({
      planId: plan.id,
      planName: plan.name,
      priceCents: plan.priceCents,
      customerName: customerName.trim(),
      customerWhatsapp: whatsapp || null,
      customerEmail: email || null,
      fatherName: typeof fatherName === "string" && fatherName.trim() ? fatherName.trim() : null,
      story: story.trim(),
      genre: typeof genre === "string" && genre.trim() ? genre.trim() : null,
    });
  } catch (err) {
    console.error("Failed to insert order", err);
    return NextResponse.json(
      { error: "Não conseguimos salvar seu pedido. Tente novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({ orderId: order.id, checkoutUrl: plan.checkoutUrl });
}

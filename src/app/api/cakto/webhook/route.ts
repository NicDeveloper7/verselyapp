import { NextResponse } from "next/server";
import { getPendingOrders, markOrderApproved } from "@/lib/db";
import { findMatchingOrder, verifyWebhookToken, type CaktoPurchasePayload } from "@/lib/cakto";

export async function POST(request: Request) {
  if (!verifyWebhookToken(request)) {
    return NextResponse.json({ error: "Invalid webhook token" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as CaktoPurchasePayload | null;
  if (!body?.data) {
    return NextResponse.json({ ok: true });
  }

  // We only act on approved purchases — refused/refunded/etc. just get acknowledged.
  if (body.event !== "purchase_approved") {
    return NextResponse.json({ ok: true });
  }

  const { data } = body;
  const match = findMatchingOrder(await getPendingOrders(), {
    email: data.customer?.email,
    phone: data.customer?.phone,
  });

  if (!match) {
    console.error(
      `Cakto purchase_approved with no matching pending order (Cakto order ${data.id}, customer ${data.customer?.email} / ${data.customer?.phone}).`
    );
    return NextResponse.json({ ok: true });
  }

  await markOrderApproved(match.id, {
    caktoOrderId: data.id,
    caktoRefId: data.refId,
    paidAmountCents: Math.round(data.amount * 100),
  });

  return NextResponse.json({ ok: true });
}

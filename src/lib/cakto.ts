import type { Order } from "@/lib/db";

/**
 * Cakto has no external-reference/metadata field to stamp our own order id
 * onto a purchase, so incoming webhooks are matched back to a pending
 * order by the customer's email or phone instead. Comparing the last 8
 * digits of the phone tolerates differences in country/area code
 * formatting between what the customer typed on our form and on Cakto's
 * own checkout form.
 */
function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() || null;
}

function normalizePhoneSuffix(phone: string | null | undefined) {
  const digits = phone?.replace(/\D/g, "") ?? "";
  return digits.length >= 8 ? digits.slice(-8) : null;
}

export function findMatchingOrder(
  pendingOrders: Order[],
  contact: { email?: string | null; phone?: string | null }
): Order | null {
  const email = normalizeEmail(contact.email);
  const phoneSuffix = normalizePhoneSuffix(contact.phone);

  const candidates = pendingOrders.filter((order) => {
    const emailMatch = email && normalizeEmail(order.customer_email) === email;
    const phoneMatch = phoneSuffix && normalizePhoneSuffix(order.customer_whatsapp) === phoneSuffix;
    return emailMatch || phoneMatch;
  });

  if (candidates.length === 0) return null;

  // Most recently created match wins if somehow more than one qualifies.
  candidates.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return candidates[0];
}

/**
 * We can't confirm exactly how Cakto signs its webhook payloads, so
 * instead of trusting an undocumented mechanism, the webhook URL
 * registered in the Cakto dashboard carries our own secret as a query
 * param (e.g. .../api/cakto/webhook?token=xxx) and we just check for it.
 */
export function verifyWebhookToken(request: Request): boolean {
  const expected = process.env.CAKTO_WEBHOOK_TOKEN;
  if (!expected) return false;

  const url = new URL(request.url);
  return url.searchParams.get("token") === expected;
}

export type CaktoPurchasePayload = {
  event: string;
  data: {
    id: string;
    refId: string;
    amount: number;
    status: string;
    customer: {
      name: string;
      email: string;
      phone: string;
    };
    product: {
      id: string;
      name: string;
    };
  };
};

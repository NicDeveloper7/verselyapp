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

function normalizePhoneForCakto(phone: string) {
  const digits = phone.replace(/\D/g, "");
  // Cakto's prefill expects the country code first — assume Brazilian
  // numbers typed without it (10-11 digits: area code + number).
  return digits.startsWith("55") ? digits : `55${digits}`;
}

/**
 * Cakto's checkout accepts ?name=&email=&phone= to prefill the buyer's
 * details — using it means what the customer typed on our form is what
 * ends up on the Cakto side too, instead of relying on them retyping it
 * identically for findMatchingOrder to work.
 */
export function buildCaktoCheckoutUrl(
  baseUrl: string,
  info: { name: string; email?: string | null; whatsapp?: string | null }
) {
  const params = new URLSearchParams({ name: info.name });
  if (info.email) {
    params.set("email", info.email);
    params.set("confirmEmail", info.email);
  }
  if (info.whatsapp) {
    params.set("phone", normalizePhoneForCakto(info.whatsapp));
  }
  return `${baseUrl}?${params.toString()}`;
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

/**
 * WhatsApp number every "buy" CTA deep-links to. International format,
 * digits only (country code + area code + number, no symbols or spaces).
 */
export const WHATSAPP_NUMBER = "5513978131637";

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

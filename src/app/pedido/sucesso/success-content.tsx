"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import type { Order } from "@/lib/db";
import { AutoWhatsApp } from "@/components/auto-whatsapp";
import { ProductionCountdown } from "./production-countdown";

const POLL_MS = 5000;

function formatCents(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buildWhatsAppMessage(order: Order) {
  const shortId = order.id.slice(0, 8);
  return [
    `🎁 Pedido pago! #${shortId}`,
    `Plano: ${order.plan_name}`,
    `Total: ${formatCents(order.paid_amount_cents ?? order.price_cents)}`,
    "",
    `Cliente: ${order.customer_name}`,
    order.customer_whatsapp ? `WhatsApp: ${order.customer_whatsapp}` : null,
    order.customer_email ? `E-mail: ${order.customer_email}` : null,
    order.father_name ? `Nome do pai: ${order.father_name}` : null,
    order.genre ? `Estilo: ${order.genre}` : null,
    order.mood ? `Clima: ${order.mood}` : null,
    order.vocal_type ? `Voz: ${order.vocal_type}` : null,
    order.reference_track ? `Referência: ${order.reference_track}` : null,
    "",
    "História:",
    order.story,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function SuccessContent({ fallbackMessage }: { fallbackMessage: string }) {
  const [status, setStatus] = useState<"loading" | "found" | "not-found">("loading");
  const [order, setOrder] = useState<Order | null>(null);
  const orderIdRef = useRef<string | null>(null);
  const orderRef = useRef<Order | null>(null);
  orderRef.current = order;

  useEffect(() => {
    const id = window.localStorage.getItem("pending_order_id");
    if (!id) {
      setStatus("not-found");
      return;
    }
    orderIdRef.current = id;

    function fetchOrder() {
      fetch(`/api/orders/${orderIdRef.current}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.order) {
            setOrder(data.order);
            setStatus("found");
          } else {
            setStatus("not-found");
          }
        })
        .catch(() => setStatus((prev) => (prev === "loading" ? "not-found" : prev)));
    }

    fetchOrder();
    // Keep checking while payment hasn't been confirmed yet — the Cakto
    // webhook can land a few seconds after the redirect back to this page.
    const poll = setInterval(() => {
      if (orderRef.current?.status && orderRef.current.status !== "pending") {
        clearInterval(poll);
        return;
      }
      fetchOrder();
    }, POLL_MS);

    return () => clearInterval(poll);
  }, []);

  const approved = order?.status === "approved";
  const shortId = order ? order.id.slice(0, 8) : "";
  const whatsappLink = getWhatsAppLink(order ? buildWhatsAppMessage(order) : fallbackMessage);

  return (
    <>
      <span
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
          approved ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-500"
        }`}
      >
        {approved ? <CheckCircle2 size={32} /> : <Clock size={32} />}
      </span>

      <h1 className="mt-6 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {approved ? "Pagamento confirmado!" : "Estamos confirmando seu pagamento"}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-muted">
        {approved
          ? "Recebemos seu pedido e o pagamento já foi aprovado. Vamos abrir o WhatsApp com todos os detalhes — é só confirmar o envio."
          : "Já recebemos seu pedido. A confirmação do pagamento pode levar alguns instantes — esta página atualiza sozinha assim que sair de \"pendente\"."}
      </p>

      {order && (
        <p className="mt-2 text-sm text-muted">
          Pedido #{shortId} · Plano {order.plan_name}
        </p>
      )}

      {status !== "loading" && (
        <div className="mt-8 flex justify-center">
          <AutoWhatsApp link={whatsappLink} />
        </div>
      )}

      {approved && order?.approved_at && <ProductionCountdown approvedAt={order.approved_at} />}
    </>
  );
}

import { MessageCircle } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/db";
import { getWhatsAppLink } from "@/lib/whatsapp";

function formatCents(cents: number | null) {
  if (cents === null) return "—";
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const statusLabel: Record<OrderStatus, string> = {
  pending: "Aguardando pagamento",
  approved: "Pago",
  rejected: "Recusado",
  cancelled: "Cancelado",
};

const statusClass: Record<OrderStatus, string> = {
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  approved: "bg-primary/10 text-primary",
  rejected: "bg-red-500/10 text-red-600 dark:text-red-400",
  cancelled: "bg-foreground/10 text-foreground/60",
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p className="text-sm text-muted">Nenhum pedido ainda.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-foreground/[0.02] text-left text-xs font-semibold uppercase tracking-wide text-muted">
            <th className="px-4 py-3">Quando</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Plano</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Contato</th>
            <th className="px-4 py-3">Detalhes da Música</th>
            <th className="px-4 py-3">História</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-border last:border-0">
              <td className="whitespace-nowrap px-4 py-3 align-top text-xs text-muted">
                {order.created_at}
              </td>
              <td className="px-4 py-3 align-top">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[order.status]}`}
                >
                  {statusLabel[order.status]}
                </span>
                {order.status === "approved" && (
                  <p className="mt-1 text-xs text-muted">{formatCents(order.paid_amount_cents)}</p>
                )}
              </td>
              <td className="px-4 py-3 align-top font-medium">{order.plan_name}</td>
              <td className="px-4 py-3 align-top">{order.customer_name}</td>
              <td className="px-4 py-3 align-top">
                <div className="flex flex-col gap-1">
                  {order.customer_whatsapp && (
                    <a
                      href={getWhatsAppLink(`Olá ${order.customer_name}!`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      <MessageCircle size={13} />
                      {order.customer_whatsapp}
                    </a>
                  )}
                  {order.customer_email && <span className="text-muted">{order.customer_email}</span>}
                </div>
              </td>
              <td className="px-4 py-3 align-top text-muted">
                {order.father_name && <p>Pai: {order.father_name}</p>}
                {order.genre && <p>Estilo: {order.genre}</p>}
                {order.mood && <p>Clima: {order.mood}</p>}
                {order.vocal_type && <p>Voz: {order.vocal_type}</p>}
                {order.reference_track && <p>Ref.: {order.reference_track}</p>}
              </td>
              <td className="max-w-xs px-4 py-3 align-top">
                <details>
                  <summary className="cursor-pointer text-primary">Ver história</summary>
                  <p className="mt-1 whitespace-pre-wrap text-muted">{order.story}</p>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

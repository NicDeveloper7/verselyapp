import { Lock, MessageCircleHeart, ShieldCheck } from "lucide-react";

const items = [
  { icon: Lock, label: "Pagamento seguro via Pix" },
  { icon: MessageCircleHeart, label: "Atendimento humano, sem robôs" },
  { icon: ShieldCheck, label: "Garantia de satisfação" },
];

export function TrustRow({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-1.5 text-xs font-medium text-foreground/60">
          <Icon size={14} className="shrink-0 text-primary" />
          {label}
        </li>
      ))}
    </ul>
  );
}

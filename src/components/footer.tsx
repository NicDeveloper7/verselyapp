import { Lock, MessageCircle, Music2 } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import type { Campaign } from "@/lib/campaigns/types";

const navColumn = [
  { label: "Ver Exemplos", href: "#collection" },
  { label: "Planos", href: "#pricing" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const legalColumn = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Serviço", href: "#" },
  { label: "Política de Reembolso", href: "#" },
];

function formatWhatsAppNumber(number: string) {
  // "55" + area code (2) + local number — formats as (AA) XXXXX-XXXX
  const local = number.slice(2);
  return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
}

export function Footer({ campaign }: { campaign: Campaign }) {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-12 sm:flex-row">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2 font-heading text-lg font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white">
                <Music2 size={18} />
              </span>
              Versely
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Músicas personalizadas, escritas e produzidas para as pessoas e
              momentos que mais importam.
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-foreground/60">
              <Lock size={13} className="text-primary" />
              Pagamento seguro via Pix
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <p className="text-sm font-semibold">Navegação</p>
              <ul className="mt-4 space-y-3">
                {navColumn.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold">Legal</p>
              <ul className="mt-4 space-y-3">
                {legalColumn.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Fale Com a Gente</p>
            <a
              href={getWhatsAppLink(campaign.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <MessageCircle size={15} className="text-primary" />
              {formatWhatsAppNumber(WHATSAPP_NUMBER)}
            </a>
            <p className="mt-2 text-xs text-muted">Atendimento humano, 7 dias por semana.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Versely. Todos os direitos reservados.</p>
          <p>Feito com carinho, uma história de cada vez.</p>
        </div>
      </div>
    </footer>
  );
}

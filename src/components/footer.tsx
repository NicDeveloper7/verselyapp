import { Music2 } from "lucide-react";

const columns = [
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#" },
      { label: "Como Funciona", href: "#how-it-works" },
      { label: "Contato", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Serviço", href: "#" },
      { label: "Política de Reembolso", href: "#" },
    ],
  },
];

export function Footer() {
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
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
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
            ))}
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

"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function AutoWhatsApp({ link, label = "Enviar Meus Detalhes no WhatsApp" }: { link: string; label?: string }) {
  const opened = useRef(false);

  useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    window.open(link, "_blank", "noopener,noreferrer");
  }, [link]);

  return (
    <div>
      <Button href={link} external size="lg">
        {label}
      </Button>
      <p className="mt-3 text-xs text-muted">
        Abrimos o WhatsApp com tudo preenchido — se não abriu automaticamente, toque no botão acima.
      </p>
    </div>
  );
}

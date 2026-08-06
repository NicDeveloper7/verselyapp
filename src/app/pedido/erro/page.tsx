import { XCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { getActiveCampaign } from "@/lib/campaigns";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function OrderErrorPage() {
  const campaign = getActiveCampaign();

  return (
    <>
      <Navbar campaign={campaign} />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-40 text-center sm:px-6 sm:pt-48 lg:px-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <XCircle size={32} />
        </span>

        <h1 className="mt-6 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Seu pagamento não foi concluído
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted">
          Não tem problema — nada foi cobrado. Você pode tentar de novo ou falar direto com a
          gente no WhatsApp pra finalizar o pedido.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/pedido" size="lg">
            Tentar Novamente
          </Button>
          <Button href={getWhatsAppLink(campaign.whatsappMessage)} external variant="secondary" size="lg">
            Falar no WhatsApp
          </Button>
        </div>
      </main>
      <Footer campaign={campaign} />
    </>
  );
}

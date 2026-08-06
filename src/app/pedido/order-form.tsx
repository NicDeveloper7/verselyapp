"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustRow } from "@/components/trust-row";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { plans } from "@/lib/plans";
import type { Campaign } from "@/lib/campaigns/types";

const genres = ["Pop", "Sertanejo", "MPB", "Rock", "Gospel", "Jazz", "Rap", "R&B", "Soul"];

type Screen = "plan" | "father" | "genre" | "story" | "contact" | "review";

const SCREEN_ORDER: Screen[] = ["plan", "father", "genre", "story", "contact", "review"];

export function OrderForm({ campaign }: { campaign: Campaign }) {
  const searchParams = useSearchParams();
  const planFromUrl = searchParams.get("plan");

  const [screen, setScreen] = useState<Screen>("plan");
  const [history, setHistory] = useState<Screen[]>([]);

  const [planId, setPlanId] = useState(
    plans.find((p) => p.id === planFromUrl)?.id ?? plans[0].id
  );
  const [fatherName, setFatherName] = useState("");
  const [genre, setGenre] = useState("");
  const [story, setStory] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = plans.find((p) => p.id === planId) ?? plans[0];

  function goTo(next: Screen) {
    setHistory((h) => [...h, screen]);
    setScreen(next);
  }

  function goBack() {
    setHistory((h) => {
      if (h.length === 0) return h;
      const copy = [...h];
      const prev = copy.pop()!;
      setScreen(prev);
      return copy;
    });
  }

  const canSubmit = customerName.trim() && story.trim() && (customerWhatsapp.trim() || customerEmail.trim());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          fatherName,
          customerName,
          customerWhatsapp,
          customerEmail,
          genre,
          story,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Algo deu errado. Tente novamente.");
        setLoading(false);
        return;
      }

      // Cakto's checkout link doesn't echo our order id back on return, so
      // we stash it here and the success page reads it back from the same
      // browser/origin once the customer lands on /pedido/sucesso.
      window.localStorage.setItem("pending_order_id", data.orderId);
      window.location.href = data.checkoutUrl;
    } catch {
      setError("Não conseguimos conectar. Verifique sua internet e tente novamente.");
      setLoading(false);
    }
  }

  const progress = ((SCREEN_ORDER.indexOf(screen) + 1) / SCREEN_ORDER.length) * 100;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.08]">
        <motion.div
          className="h-full rounded-full gradient-brand"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-border bg-foreground/[0.02] p-6 sm:p-8"
        >
          {screen === "plan" && (
            <div>
              <h1 className="font-heading text-2xl font-bold">Escolha o plano</h1>
              <p className="mt-1 text-sm text-muted">Você pode trocar a qualquer momento.</p>
              <div className="mt-6 space-y-3">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlanId(p.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-colors ${
                      p.id === planId ? "border-primary bg-primary/5" : "border-border hover:bg-foreground/[0.03]"
                    }`}
                  >
                    <span>
                      <span className="block font-semibold">{p.name}</span>
                      <span className="block text-xs text-muted">{p.tagline ?? " "}</span>
                    </span>
                    <span className="font-heading font-bold gradient-text">{p.price}</span>
                  </button>
                ))}
              </div>
              <Button onClick={() => goTo("father")} size="lg" className="mt-7 w-full">
                Continuar <ArrowRight size={16} />
              </Button>
            </div>
          )}

          {screen === "father" && (
            <div>
              <h1 className="font-heading text-2xl font-bold">Como podemos chamar seu pai?</h1>
              <p className="mt-1 text-sm text-muted">O nome ou apelido que aparece na música. (Opcional)</p>
              <input
                autoFocus
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="mt-6 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Ex: Seu João, Pai, Painho..."
              />
              <Nav onBack={goBack} onNext={() => goTo("genre")} />
            </div>
          )}

          {screen === "genre" && (
            <div>
              <h1 className="font-heading text-2xl font-bold">Qual estilo musical?</h1>
              <p className="mt-1 text-sm text-muted">Se não souber, a gente sugere. (Opcional)</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenre(genre === g ? "" : g)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      genre === g
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-foreground/[0.04]"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <Nav onBack={goBack} onNext={() => goTo("story")} />
            </div>
          )}

          {screen === "story" && (
            <div>
              <h1 className="font-heading text-2xl font-bold">Conte a história de vocês</h1>
              <p className="mt-1 text-sm text-muted">Uma lembrança, um apelido, algo que só vocês dois entendem.</p>
              <textarea
                autoFocus
                required
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={5}
                className="mt-6 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Comece a escrever..."
              />
              <Nav onBack={goBack} onNext={() => goTo("contact")} disabled={!story.trim()} />
            </div>
          )}

          {screen === "contact" && (
            <div>
              <h1 className="font-heading text-2xl font-bold">Seus dados</h1>
              <p className="mt-1 text-sm text-muted">
                Preencha seu nome e pelo menos um contato (WhatsApp ou e-mail). Use o mesmo contato
                na hora de pagar, pra a gente conseguir confirmar seu pedido automaticamente.
              </p>
              <div className="mt-6 space-y-4">
                <input
                  autoFocus
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Seu nome"
                />
                <input
                  value={customerWhatsapp}
                  onChange={(e) => setCustomerWhatsapp(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Seu WhatsApp"
                />
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Seu e-mail (se preferir)"
                />
              </div>
              <Nav
                onBack={goBack}
                onNext={() => goTo("review")}
                disabled={!customerName.trim() || (!customerWhatsapp.trim() && !customerEmail.trim())}
              />
            </div>
          )}

          {screen === "review" && (
            <form onSubmit={handleSubmit}>
              <h1 className="font-heading text-2xl font-bold">Confira seu pedido</h1>
              <div className="mt-5 space-y-2 rounded-xl border border-border bg-background/50 p-4 text-sm">
                <div className="flex justify-between font-heading text-base font-bold">
                  <span>Plano {plan.name}</span>
                  <span className="gradient-text">{plan.price}</span>
                </div>
              </div>

              {error && (
                <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" disabled={loading || !canSubmit} className="mt-6 w-full">
                {loading ? (
                  "Processando..."
                ) : (
                  <>
                    <Check size={18} />
                    Ir para o Pagamento — {plan.price}
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={goBack}
                className="mt-3 flex w-full items-center justify-center gap-1.5 text-sm font-medium text-muted hover:text-foreground"
              >
                <ArrowLeft size={14} /> Voltar
              </button>

              <TrustRow className="mt-6 justify-center" />

              <p className="mt-4 text-center text-sm text-muted">
                Prefere conversar antes?{" "}
                <a
                  href={getWhatsAppLink(campaign.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Fale no WhatsApp
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Nav({
  onBack,
  onNext,
  disabled = false,
}: {
  onBack: () => void;
  onNext: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="mt-7 flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-foreground/[0.06]"
        aria-label="Voltar"
      >
        <ArrowLeft size={16} />
      </button>
      <Button onClick={onNext} disabled={disabled} size="lg" className="flex-1">
        Continuar <ArrowRight size={16} />
      </Button>
    </div>
  );
}

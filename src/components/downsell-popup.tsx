"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICE } from "@/lib/pricing";
import { downsellOffer, DOWNSELL_OFFER_ID } from "@/lib/downsell";

const TIME_TRIGGER_MS = 20_000;
const COUNTDOWN_SECONDS = 10 * 60;
const SESSION_KEY = "downsell_shown";

export function DownsellPopup() {
  const [visible, setVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const shownRef = useRef(false);

  // Trigger: whichever comes first — 45s on the page, or the classic
  // desktop "mouse heading for the tab bar" exit intent. Time-based is
  // what actually fires on mobile, where most of this traffic comes from.
  useEffect(() => {
    if (!downsellOffer.checkoutUrl) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    function trigger() {
      if (shownRef.current) return;
      shownRef.current = true;
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }

    const timer = setTimeout(trigger, TIME_TRIGGER_MS);

    // Touch browsers sometimes synthesize mouseout events on scroll/tap,
    // which was firing this "exit intent" on mobile too. Only real
    // mouse-driven devices (hover + fine pointer) get this listener.
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    function onMouseOut(e: MouseEvent) {
      if (e.clientY <= 0) trigger();
    }
    if (hasMouse) {
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      clearTimeout(timer);
      if (hasMouse) document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [visible]);

  if (!downsellOffer.checkoutUrl) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-border bg-background p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/[0.06]"
            >
              <X size={16} />
            </button>

            <p className="text-xs font-bold uppercase tracking-wide text-accent">
              Espera — oferta especial
            </p>
            <h3 className="mt-2 text-balance font-heading text-2xl font-bold">
              Que tal emocionar seu pai por menos?
            </h3>
            <p className="mt-2 text-sm text-muted">
              Só pra quem ainda está pensando: leve a música do seu pai com um desconto exclusivo.
            </p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-base font-medium text-muted line-through">{PRICE}</span>
              <span className="font-heading text-4xl font-extrabold gradient-text">
                {downsellOffer.price}
              </span>
            </div>

            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-accent">
              <Clock size={13} />
              Essa oferta expira em {minutes}:{seconds.toString().padStart(2, "0")}
            </p>

            <Button href={`/pedido?offer=${DOWNSELL_OFFER_ID}`} size="lg" className="mt-6 w-full">
              Quero Aproveitar Agora
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

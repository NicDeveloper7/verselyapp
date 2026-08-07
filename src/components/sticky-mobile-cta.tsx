"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Campaign } from "@/lib/campaigns/types";

export function StickyMobileCTA({ campaign }: { campaign: Campaign }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] glass md:hidden"
        >
          <p className="mb-1.5 text-center text-[11px] font-medium text-foreground/60">
            🔒 Pix seguro · 👤 Atendimento humano no WhatsApp
          </p>
          <Button href="/pedido?plan=essencial" className="w-full">
            {campaign.hero.primaryCta}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

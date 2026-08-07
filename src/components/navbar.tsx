"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Music2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { PromoBanner } from "@/components/promo-banner";
import { CampaignBadge } from "@/components/campaign-badge";
import type { Campaign } from "@/lib/campaigns/types";

const links = [
  { href: "#how-it-works", label: "Como Funciona" },
  { href: "#collection", label: "Músicas" },
  { href: "#pricing", label: "Planos" },
  { href: "#testimonials", label: "Avaliações" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar({ campaign }: { campaign: Campaign }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <PromoBanner campaign={campaign} />

      <div className={`transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
              scrolled ? "glass shadow-lg shadow-black/[0.03]" : ""
            }`}
          >
            <a href="#top" className="flex items-center gap-2 font-heading text-lg font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white">
                <Music2 size={18} />
              </span>
              Versely
              <span className="ml-1 hidden lg:inline-flex">
                <CampaignBadge campaign={campaign} />
              </span>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <Button href="/pedido?plan=essencial" size="md">
                {campaign.hero.primaryCta}
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                aria-label="Alternar menu"
                onClick={() => setOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden md:hidden"
              >
                <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-background p-3 shadow-xl">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-foreground/[0.06]"
                    >
                      {link.label}
                    </a>
                  ))}
                  <Button href="/pedido?plan=essencial" className="mt-2 w-full">
                    {campaign.hero.primaryCta}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

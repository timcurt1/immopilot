"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";

const NAV = [
  { href: "/solution", label: "Solution" },
  { href: "/fonctionnalites", label: "Fonctionnalités" },
  { href: "/cas-dusage", label: "Cas d'usage" },
  { href: "/securite", label: "Sécurité" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/ressources", label: "Ressources" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(15,23,42,0.04)]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Aller au contenu principal
      </a>
      <div className="mx-auto max-w-6xl px-6 lg:px-8 h-18 flex items-center justify-between" style={{ height: 72 }}>
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="shrink-0">
          <Link href="/" aria-label="ImmoPilot — Accueil">
            <Logo />
          </Link>
        </motion.div>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV.map((item, i) => {
            const active = pathname.startsWith(item.href);
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.04 }}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-3.5 right-3.5 bottom-1 h-px bg-ink origin-left transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          className="hidden lg:flex items-center gap-3"
        >
          <Link href="/login" className="px-3.5 py-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors">
            Se connecter
          </Link>
          <Button href="/demande-demo" size="md">
            Demander une démo
          </Button>
        </motion.div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-line bg-white overflow-hidden"
          >
            <div className="px-6 py-6">
              <nav className="grid gap-1 mb-6" aria-label="Navigation mobile">
                {NAV.map((item, i) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.03 * i }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`block py-3 px-2 text-base font-medium border-b border-line last:border-0 ${
                          active ? "text-brand-600" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.03 * NAV.length }}
                className="grid gap-3"
              >
                <Button href="/demande-demo" size="lg" className="w-full" onClick={() => setOpen(false)}>
                  Demander une démo
                </Button>
                <Button href="/login" variant="secondary" size="lg" className="w-full" onClick={() => setOpen(false)}>
                  Se connecter
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

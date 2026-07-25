"use client";

import { useState } from "react";
import {
  Mail, Calendar, Building2, Users, Globe2, Phone, FileSignature, Database, Home, MailCheck,
} from "lucide-react";
import { LogoMark } from "./Logo";

const NODES = [
  { label: "Outlook", detail: "Synchronisation des e-mails et du calendrier", icon: Mail },
  { label: "Gmail", detail: "Réception et envoi des messages clients", icon: MailCheck },
  { label: "Google Calendar", detail: "Planification des visites et rendez-vous", icon: Calendar },
  { label: "Microsoft 365", detail: "Environnement bureautique et messagerie", icon: Globe2 },
  { label: "Logiciel immobilier", detail: "Rapprochement des biens et mandats", icon: Home },
  { label: "CRM", detail: "Centralisation des contacts commerciaux", icon: Users },
  { label: "Portails d'annonces", detail: "Réception automatique des demandes", icon: Building2 },
  { label: "Téléphonie", detail: "Historique des appels associé aux fiches", icon: Phone },
  { label: "Signature électronique", detail: "Signature des documents contractuels", icon: FileSignature },
  { label: "Stockage documentaire", detail: "Classement automatique des pièces", icon: Database },
];

export function IntegrationsConstellation() {
  const [active, setActive] = useState<number | null>(null);
  const radius = 42;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {NODES.map((_, i) => {
          const angle = (i / NODES.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          const isActive = active === i;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke={isActive ? "#3557FF" : "#D8DEEB"}
              strokeWidth={isActive ? 0.6 : 0.35}
              strokeDasharray="1.6 1.6"
              className={isActive ? "animate-dash" : ""}
            />
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_16px_40px_rgba(15,23,42,0.14)] border border-line px-2">
          <LogoMark size={26} />
        </span>
        <span className="text-xs font-semibold text-ink">ImmoPilot</span>
      </div>

      {NODES.map((node, i) => {
        const angle = (i / NODES.length) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        const isActive = active === i;
        return (
          <button
            key={node.label}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1.5 group"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-white transition-all duration-200 ${
                isActive ? "border-brand-400 shadow-[0_10px_30px_rgba(53,87,255,0.25)] scale-110" : "border-line shadow-sm"
              }`}
            >
              <node.icon size={18} className={isActive ? "text-brand-600" : "text-ink-soft"} />
            </span>
            <span className="text-[10px] font-semibold text-ink-soft whitespace-nowrap hidden sm:block">{node.label}</span>
            {isActive && (
              <span className="absolute top-full mt-2 w-44 rounded-lg bg-ink text-white text-[11px] leading-snug px-2.5 py-2 text-center shadow-xl z-20">
                {node.detail}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

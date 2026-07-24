"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const KEY = "immopilot_cookie_notice_dismissed";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY) !== "1") setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto max-w-2xl flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-white border border-line px-5 py-4 shadow-[0_20px_50px_rgba(15,23,42,0.15)]">
        <Cookie size={18} className="text-brand-600 shrink-0 hidden sm:block" />
        <p className="text-xs text-ink-soft leading-relaxed flex-1 text-center sm:text-left">
          Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.{" "}
          <Link href="/legal/cookies" className="underline text-ink hover:text-brand-600">
            En savoir plus
          </Link>
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(KEY, "1");
            window.dispatchEvent(new Event("immopilot:cookie-notice-dismissed"));
            setVisible(false);
          }}
          className="shrink-0 h-9 px-4 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-brand-700 transition-colors"
        >
          J'ai compris
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { globalSearch } from "@/lib/actions";

type Result = { type: string; id: string; title: string; subtitle: string; href: string };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestId = useRef(0);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function onTriggerClick(e: MouseEvent) {
      if ((e.target as HTMLElement)?.closest("[data-command-palette-trigger]")) setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onTriggerClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onTriggerClick);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setPending(false);
      return;
    }
    setPending(true);
    const thisRequest = ++requestId.current;
    const handle = setTimeout(async () => {
      const result = await globalSearch(query);
      if (requestId.current !== thisRequest) return; // une requête plus récente a déjà été lancée
      setResults(result.results);
      setPending(false);
    }, 200);
    return () => clearTimeout(handle);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-ink/40" onClick={() => setOpen(false)}>
      <div className="w-full max-w-xl rounded-2xl border border-line bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <Search size={16} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un prospect, un bien, un dossier, une tâche…"
            className="flex-1 outline-none text-sm text-ink placeholder:text-muted"
          />
          <button type="button" onClick={() => setOpen(false)} className="text-muted hover:text-ink shrink-0">
            <X size={16} />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {pending && <p className="px-4 py-3 text-sm text-muted">Recherche…</p>}
          {!pending && query.trim().length >= 2 && results.length === 0 && (
            <p className="px-4 py-3 text-sm text-muted">Aucun résultat pour « {query} ».</p>
          )}
          {results.map((r) => (
            <button
              key={`${r.type}-${r.id}`}
              onClick={() => {
                setOpen(false);
                router.push(r.href);
              }}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface transition-colors border-b border-line last:border-b-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{r.title}</p>
                <p className="text-xs text-muted truncate">{r.subtitle}</p>
              </div>
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-brand-600 bg-brand-50 rounded-full px-2 py-1">
                {r.type}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

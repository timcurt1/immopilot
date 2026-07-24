const STATUS_TONES: Record<string, string> = {
  Nouveau: "bg-brand-50 text-brand-700",
  Qualifié: "bg-brand-50 text-brand-700",
  "À relancer": "bg-warning-soft text-amber-700",
  "Dossier en cours": "bg-warning-soft text-amber-700",
  "Prêt à valider": "bg-positive-soft text-green-700",
  Signé: "bg-positive-soft text-green-700",
  Élevée: "bg-danger-soft text-red-700",
  Moyenne: "bg-warning-soft text-amber-700",
  Faible: "bg-surface-2 text-ink-soft",
  Disponible: "bg-positive-soft text-green-700",
  "Sous offre": "bg-warning-soft text-amber-700",
  Loué: "bg-surface-2 text-ink-soft",
  validé: "bg-positive-soft text-green-700",
  manquant: "bg-danger-soft text-red-700",
  "à vérifier": "bg-warning-soft text-amber-700",
  Confirmée: "bg-positive-soft text-green-700",
  "À confirmer": "bg-warning-soft text-amber-700",
};

export function StatusBadge({ value }: { value: string }) {
  const tone = STATUS_TONES[value] || "bg-surface-2 text-ink-soft";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

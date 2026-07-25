import { GENERAL_FAQ, PRICING_FAQ } from "./marketingContent";

export type AssistantEntry = { question: string; answer: string };

export const SECURITY_FAQ: AssistantEntry[] = [
  {
    question: "Où sont hébergées nos données ?",
    answer: "Hébergement européen privilégié lorsque le projet de déploiement le permet, avec isolation des données entre organisations.",
  },
  {
    question: "Qui peut accéder à nos données ?",
    answer: "Chaque collaborateur dispose d'un accès limité à son rôle et à son périmètre. Les administrateurs de l'organisation définissent ces droits.",
  },
  {
    question: "Que se passe-t-il en cas de résiliation ?",
    answer: "Les données de l'organisation peuvent être exportées ou supprimées à sa demande, selon la politique de conservation convenue.",
  },
];

export const ASSISTANT_FAQ: Record<"tarifs" | "securite" | "generic", AssistantEntry[]> = {
  tarifs: [...PRICING_FAQ, ...GENERAL_FAQ.filter((f) => f.question.includes("commencer") || f.question.includes("formation"))],
  securite: [...GENERAL_FAQ.filter((f) => f.question.includes("RGPD") || f.question.includes("modèles publics")), ...SECURITY_FAQ],
  generic: GENERAL_FAQ,
};

const ALL_ENTRIES: AssistantEntry[] = [...GENERAL_FAQ, ...PRICING_FAQ, ...SECURITY_FAQ];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

const STOPWORDS = new Set([
  "le", "la", "les", "un", "une", "des", "de", "du", "et", "ou", "est", "il", "elle", "ce", "que",
  "qui", "pour", "avec", "sur", "dans", "vos", "votre", "notre", "nos", "je", "on", "a", "au", "aux",
  "combien", "comment", "pourquoi", "quand", "quel", "quelle", "quels", "quelles", "cette", "cet",
  "ces", "leur", "leurs", "vous", "nous", "mon", "ma", "mes", "ton", "ta", "tes", "son", "sa", "ses",
]);

export function findBestAnswer(input: string): AssistantEntry | null {
  const inputWords = normalize(input).split(/\s+/).filter((w) => w.length > 2 && !STOPWORDS.has(w));
  if (inputWords.length === 0) return null;

  let best: { entry: AssistantEntry; score: number } | null = null;
  for (const entry of ALL_ENTRIES) {
    const haystack = normalize(`${entry.question} ${entry.answer}`);
    const score = inputWords.reduce((acc, w) => (haystack.includes(w) ? acc + 1 : acc), 0);
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }
  const threshold = inputWords.length <= 1 ? 1 : 2;
  return best && best.score >= threshold ? best.entry : null;
}

export const GENERAL_FAQ = [
  {
    question: "ImmoPilot remplace-t-il les collaborateurs ?",
    answer:
      "Non. ImmoPilot automatise certaines tâches répétitives et aide les collaborateurs à retrouver ou exploiter les informations plus facilement. Les décisions restent sous contrôle humain.",
  },
  {
    question: "ImmoPilot peut-il se connecter à notre logiciel métier ?",
    answer:
      "Des connexions peuvent être étudiées selon le logiciel utilisé, les interfaces disponibles et les besoins du projet.",
  },
  {
    question: "Combien de temps faut-il pour déployer ImmoPilot ?",
    answer:
      "Le délai dépend du périmètre, du nombre d'utilisateurs et des intégrations nécessaires. Un pilote limité peut être mis en place avant un déploiement plus large.",
  },
  {
    question: "Les réponses sont-elles envoyées automatiquement ?",
    answer:
      "Les actions peuvent être configurées pour nécessiter une validation humaine. L'agence conserve la maîtrise de ses communications.",
  },
  {
    question: "ImmoPilot est-il conforme au RGPD ?",
    answer:
      "Le produit est conçu selon les principes du RGPD : limitation des données, contrôle des accès, traçabilité, export et suppression.",
  },
  {
    question: "Nos données servent-elles à entraîner des modèles publics ?",
    answer:
      "Les données d'une organisation ne sont pas utilisées pour entraîner un modèle public sans consentement explicite.",
  },
  {
    question: "ImmoPilot fonctionne-t-il pour la location et la transaction ?",
    answer: "Oui, l'interface et les automatisations peuvent être adaptées aux différents métiers de l'agence.",
  },
  {
    question: "Peut-on personnaliser les processus ?",
    answer: "Oui. Les statuts, priorités, modèles, règles et étapes peuvent être configurés selon l'organisation.",
  },
  {
    question: "Une formation est-elle prévue ?",
    answer: "Oui. Un accompagnement à la prise en main et des supports accessibles depuis la plateforme sont prévus.",
  },
  {
    question: "Peut-on commencer avec quelques collaborateurs ?",
    answer:
      "Oui. Une phase pilote est recommandée pour mesurer l'usage, recueillir les retours et ajuster les paramètres avant une généralisation.",
  },
];

export const PRICING_FAQ = [
  {
    question: "Comment est calculé le prix d'ImmoPilot ?",
    answer:
      "La tarification est établie selon le nombre d'utilisateurs, les fonctionnalités activées et le niveau d'intégration avec votre environnement logiciel.",
  },
  {
    question: "Existe-t-il un engagement minimum ?",
    answer: "Les conditions contractuelles sont étudiées avec vous lors de l'échange de découverte, selon votre projet.",
  },
  {
    question: "Peut-on changer de formule en cours de route ?",
    answer: "Oui, une agence peut évoluer d'une formule à l'autre à mesure que ses besoins et ses équipes grandissent.",
  },
  {
    question: "Une phase pilote est-elle facturée différemment ?",
    answer: "Les conditions d'une phase pilote sont définies au cas par cas selon le périmètre et la durée souhaités.",
  },
];

export const PLAN_ORDER = ["essentiel", "agence", "reseau"] as const;
export type PricingPlanId = (typeof PLAN_ORDER)[number];

export const PRICING_PLANS: Record<
  PricingPlanId,
  { label: string; tagline: string; cta: string; ctaHref: string; highlighted?: boolean; features: string[] }
> = {
  essentiel: {
    label: "ImmoPilot Essentiel",
    tagline: "Pour une petite agence souhaitant centraliser ses prospects et structurer son suivi.",
    cta: "Demander une estimation",
    ctaHref: "/demande-demo",
    features: [
      "Fiches prospects",
      "Tableau de bord",
      "Assistant ImmoPilot",
      "Tâches et rappels",
      "Modèles de réponses",
      "Support standard",
    ],
  },
  agence: {
    label: "ImmoPilot Agence",
    tagline: "Pour les agences souhaitant automatiser davantage leur suivi commercial et opérationnel.",
    cta: "Demander une démonstration",
    ctaHref: "/demande-demo",
    highlighted: true,
    features: [
      "Toutes les fonctions Essentiel",
      "Qualification automatique",
      "Synthèse des dossiers",
      "Relances assistées",
      "Préparation des visites",
      "Comptes rendus de visite",
      "Statistiques d'activité",
      "Paramétrage de l'agence",
      "Accompagnement au déploiement",
    ],
  },
  reseau: {
    label: "ImmoPilot Réseau",
    tagline: "Pour les groupes, franchises et organisations multi-agences.",
    cta: "Parler à notre équipe",
    ctaHref: "/contact",
    features: [
      "Toutes les fonctions Agence",
      "Administration multi-agences",
      "Droits avancés",
      "Statistiques consolidées",
      "Personnalisation des processus",
      "Intégrations spécifiques",
      "Accompagnement dédié",
      "Conditions contractuelles adaptées",
    ],
  },
};

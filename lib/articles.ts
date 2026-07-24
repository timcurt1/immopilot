export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  body: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "ia-agence-immobiliere",
    title: "Comment utiliser l'IA dans une agence immobilière ?",
    description: "Un panorama concret des usages de l'intelligence artificielle pour une agence, sans jargon technique.",
    category: "Intelligence artificielle et immobilier",
    date: "2026-06-02",
    readTime: "6 min",
    author: "Équipe ImmoPilot",
    body: [
      "L'intelligence artificielle appliquée à l'immobilier ne consiste pas à remplacer les collaborateurs, mais à les décharger des tâches répétitives qui occupent une part importante de leur journée : lecture des demandes, classement des documents, rédaction de relances.",
      "Concrètement, une agence peut s'appuyer sur l'IA pour qualifier automatiquement une demande entrante, préparer une réponse ou signaler un dossier incomplet. Ces automatisations restent soumises à une validation humaine avant tout envoi.",
      "L'enjeu n'est pas d'adopter la technologie la plus avancée, mais celle qui s'intègre le mieux dans les habitudes existantes de l'équipe, avec un déploiement progressif et mesuré.",
    ],
  },
  {
    slug: "taches-automatisables-immobilier",
    title: "Quelles tâches peut-on automatiser dans le secteur immobilier ?",
    description: "Qualification, relances, synthèse de dossiers : la liste des tâches qui gagnent le plus à être assistées.",
    category: "Productivité en agence",
    date: "2026-05-20",
    readTime: "5 min",
    author: "Équipe ImmoPilot",
    body: [
      "Toutes les tâches ne se valent pas face à l'automatisation. Les plus adaptées sont celles qui sont répétitives, chronophages et fondées sur des règles claires : qualification d'une demande, détection d'un dossier incomplet, préparation d'une relance.",
      "À l'inverse, les décisions qui engagent la relation avec un client ou un candidat doivent rester sous contrôle humain : le rôle de l'automatisation est de préparer le travail, pas de le conclure à la place du collaborateur.",
      "Une agence gagne à commencer par une ou deux tâches à fort volume avant d'élargir progressivement le périmètre automatisé.",
    ],
  },
  {
    slug: "suivi-prospects-immobiliers",
    title: "Comment améliorer le suivi des prospects immobiliers ?",
    description: "Centraliser, prioriser et relancer : les trois leviers pour ne plus perdre un prospect en cours de route.",
    category: "Location",
    date: "2026-05-08",
    readTime: "7 min",
    author: "Équipe ImmoPilot",
    body: [
      "Un prospect immobilier se perd rarement par manque d'intérêt : il se perd parce que le suivi n'est pas homogène d'un collaborateur à l'autre, ou parce qu'une relance a été oubliée dans la charge quotidienne.",
      "Centraliser les informations dans une fiche unique par prospect est la première étape. La seconde consiste à faire émerger automatiquement les priorités : qui doit être relancé aujourd'hui, quel dossier est bloqué, quelle visite approche.",
      "Enfin, la relance elle-même gagne à être préparée à l'avance, pour que le collaborateur n'ait plus qu'à la vérifier avant de l'envoyer.",
    ],
  },
  {
    slug: "ia-rgpd-agence-immobiliere",
    title: "IA et RGPD : quelles précautions pour une agence immobilière ?",
    description: "Les principes essentiels pour utiliser l'intelligence artificielle sans compromettre la conformité RGPD.",
    category: "Sécurité et RGPD",
    date: "2026-04-22",
    readTime: "6 min",
    author: "Équipe ImmoPilot",
    body: [
      "L'usage de l'intelligence artificielle dans une agence immobilière implique de traiter des données personnelles sensibles : identité, revenus, situation locative. Le RGPD impose donc un cadre strict, quel que soit l'outil utilisé.",
      "Les principes clés sont la limitation des données collectées au strict nécessaire, le contrôle des accès selon le rôle de chaque collaborateur, la traçabilité des actions et la possibilité d'exporter ou de supprimer les données à la demande.",
      "Un outil d'IA responsable ne doit jamais utiliser les données d'une organisation pour entraîner un modèle public sans consentement explicite.",
    ],
  },
  {
    slug: "reduire-delais-demandes-locatives",
    title: "Comment réduire les délais de traitement des demandes locatives ?",
    description: "Trois causes fréquentes de lenteur dans le traitement locatif, et comment les corriger.",
    category: "Location",
    date: "2026-04-10",
    readTime: "5 min",
    author: "Équipe ImmoPilot",
    body: [
      "Les délais de traitement locatif s'allongent souvent pour trois raisons : les demandes ne sont pas immédiatement qualifiées, les pièces manquantes sont détectées tardivement, et le suivi dépend de la disponibilité d'un seul collaborateur.",
      "Automatiser la qualification initiale d'une demande permet de gagner un temps précieux dès la première étape. Signaler immédiatement les pièces manquantes évite des allers-retours inutiles avec le candidat.",
      "Enfin, répartir la charge de suivi entre plusieurs collaborateurs, avec une vue partagée des priorités, évite qu'un dossier reste bloqué faute de disponibilité.",
    ],
  },
  {
    slug: "deploiement-ia-collaborateurs",
    title: "Comment réussir le déploiement d'un outil d'IA auprès des collaborateurs ?",
    description: "L'adoption d'un nouvel outil se joue autant sur l'accompagnement humain que sur la technologie.",
    category: "Transformation numérique",
    date: "2026-03-28",
    readTime: "6 min",
    author: "Équipe ImmoPilot",
    body: [
      "Un outil, aussi performant soit-il, n'apporte de valeur que s'il est réellement utilisé par les équipes. Le déploiement doit donc commencer par une phase de découverte, pour comprendre les habitudes et les priorités de l'agence.",
      "Une démonstration personnalisée, centrée sur les cas d'usage les plus pertinents pour l'équipe, facilite l'adhésion bien mieux qu'une présentation générique.",
      "Une phase pilote sur un périmètre limité permet de mesurer l'usage réel, de recueillir les retours des collaborateurs et d'ajuster la configuration avant une généralisation progressive.",
    ],
  },
  {
    slug: "ia-relation-client-immobilier",
    title: "Pourquoi l'IA ne remplace pas la relation client dans l'immobilier ?",
    description: "L'automatisation traite l'information ; la relation de confiance reste un travail humain.",
    category: "Études et guides",
    date: "2026-03-15",
    readTime: "5 min",
    author: "Équipe ImmoPilot",
    body: [
      "L'immobilier reste un métier de confiance : un achat, une location ou une gestion locative engagent des décisions personnelles importantes, souvent chargées d'émotion.",
      "L'intelligence artificielle peut préparer une réponse, résumer un dossier ou signaler une urgence, mais elle ne peut pas remplacer l'écoute, la négociation ou le conseil qu'apporte un collaborateur expérimenté.",
      "L'objectif d'un outil comme ImmoPilot n'est donc pas de réduire le contact humain, mais de libérer du temps pour que les collaborateurs puissent s'y consacrer pleinement.",
    ],
  },
  {
    slug: "structurer-phase-pilote-ia",
    title: "Comment structurer une phase pilote d'intelligence artificielle ?",
    description: "Périmètre, indicateurs, durée : les éléments clés pour cadrer un pilote utile.",
    category: "Études et guides",
    date: "2026-02-27",
    readTime: "6 min",
    author: "Équipe ImmoPilot",
    body: [
      "Une phase pilote réussie commence par un périmètre clairement délimité : une équipe, un type de dossier ou une seule agence, plutôt qu'un déploiement généralisé d'emblée.",
      "Il est utile de définir à l'avance quelques indicateurs simples à observer : temps consacré aux tâches répétitives, délais de réponse, ressenti des collaborateurs.",
      "Une durée de quelques semaines suffit généralement pour recueillir des retours exploitables et ajuster la configuration avant d'envisager une généralisation à d'autres équipes.",
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

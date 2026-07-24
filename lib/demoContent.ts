export type DemoProspect = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  project: "Location" | "Transaction" | "Gestion locative";
  propertyType: string;
  budget: string;
  location: string;
  situation: string;
  score: number;
  status: "Nouveau" | "Qualifié" | "À relancer" | "Dossier en cours" | "Prêt à valider" | "Signé";
  urgency: "Élevée" | "Moyenne" | "Faible";
  lastInteraction: string;
  nextAction: string;
  assignedTo: string;
  notes: string;
  documents: { label: string; status: "validé" | "manquant" | "à vérifier" }[];
  timeline: { date: string; label: string }[];
};

export const DEMO_PROSPECTS: DemoProspect[] = [
  {
    id: "camille-lefevre",
    firstName: "Camille",
    lastName: "Lefèvre",
    email: "camille.lefevre@email.fr",
    phone: "06 12 34 56 78",
    project: "Location",
    propertyType: "T2",
    budget: "700 € CC",
    location: "Clermont-Ferrand — centre",
    situation: "CDI",
    score: 87,
    status: "Qualifié",
    urgency: "Élevée",
    lastInteraction: "Il y a 3 jours",
    nextAction: "Envoyer une relance",
    assignedTo: "Léa Bonnet",
    notes: "Souhaite emménager rapidement, proche des transports en commun.",
    documents: [
      { label: "Pièce d'identité", status: "validé" },
      { label: "Justificatif de domicile", status: "validé" },
      { label: "Contrat de travail", status: "manquant" },
      { label: "Avis d'imposition", status: "manquant" },
    ],
    timeline: [
      { date: "Il y a 3 jours", label: "Demande reçue depuis un portail d'annonces" },
      { date: "Il y a 3 jours", label: "Qualification automatique par ImmoPilot" },
      { date: "Il y a 3 jours", label: "Fiche prospect créée" },
    ],
  },
  {
    id: "jordan-taylor",
    firstName: "Jordan",
    lastName: "Taylor",
    email: "jordan.taylor@email.fr",
    phone: "06 11 22 33 44",
    project: "Location",
    propertyType: "T3",
    budget: "1250 € CC",
    location: "Paris 11e",
    situation: "CDI",
    score: 82,
    status: "Dossier en cours",
    urgency: "Moyenne",
    lastInteraction: "Hier",
    nextAction: "Demander l'avis d'imposition",
    assignedTo: "Léa Bonnet",
    notes: "Dossier presque complet, très réactif par e-mail.",
    documents: [
      { label: "Pièce d'identité", status: "validé" },
      { label: "Justificatif de domicile", status: "validé" },
      { label: "Contrat de travail", status: "validé" },
      { label: "Avis d'imposition", status: "manquant" },
    ],
    timeline: [
      { date: "Il y a 6 jours", label: "Demande reçue par e-mail" },
      { date: "Il y a 4 jours", label: "Visite réalisée" },
      { date: "Hier", label: "Compte rendu de visite généré par ImmoPilot" },
    ],
  },
  {
    id: "thomas-nguyen",
    firstName: "Thomas",
    lastName: "Nguyen",
    email: "thomas.nguyen@email.fr",
    phone: "06 33 21 44 90",
    project: "Location",
    propertyType: "Studio",
    budget: "690 € CC",
    location: "Lyon 3e",
    situation: "Étudiant",
    score: 64,
    status: "À relancer",
    urgency: "Moyenne",
    lastInteraction: "Il y a 5 jours",
    nextAction: "Relancer après 48h sans réponse",
    assignedTo: "Karim Aziz",
    notes: "Cherche pour la rentrée universitaire, garant disponible.",
    documents: [
      { label: "Pièce d'identité", status: "validé" },
      { label: "Garant — avis d'imposition", status: "validé" },
      { label: "Justificatif de scolarité", status: "à vérifier" },
    ],
    timeline: [
      { date: "Il y a 7 jours", label: "Demande reçue" },
      { date: "Il y a 5 jours", label: "Dernier échange avec le candidat" },
    ],
  },
  {
    id: "sophie-marchal",
    firstName: "Sophie",
    lastName: "Marchal",
    email: "sophie.marchal@email.fr",
    phone: "06 45 67 89 10",
    project: "Transaction",
    propertyType: "Maison 4 pièces",
    budget: "320 000 €",
    location: "Nantes — Chantenay",
    situation: "Primo-accédante",
    score: 91,
    status: "Prêt à valider",
    urgency: "Élevée",
    lastInteraction: "Aujourd'hui",
    nextAction: "Confirmer l'offre d'achat",
    assignedTo: "Karim Aziz",
    notes: "Financement pré-accordé par sa banque, très motivée.",
    documents: [
      { label: "Pièce d'identité", status: "validé" },
      { label: "Accord de financement", status: "validé" },
      { label: "Compromis de vente", status: "à vérifier" },
    ],
    timeline: [
      { date: "Il y a 3 semaines", label: "Premier contact en agence" },
      { date: "Il y a 1 semaine", label: "Deuxième visite du bien" },
      { date: "Aujourd'hui", label: "Offre d'achat reçue" },
    ],
  },
  {
    id: "amelie-roussel",
    firstName: "Amélie",
    lastName: "Roussel",
    email: "amelie.roussel@email.fr",
    phone: "06 98 76 54 32",
    project: "Gestion locative",
    propertyType: "Appartement loué",
    budget: "—",
    location: "Bordeaux — Chartrons",
    situation: "Locataire en place",
    score: 70,
    status: "Nouveau",
    urgency: "Élevée",
    lastInteraction: "Il y a 2 heures",
    nextAction: "Qualifier la demande d'intervention",
    assignedTo: "Nadia Fontaine",
    notes: "Signale une fuite d'eau dans la salle de bain.",
    documents: [],
    timeline: [{ date: "Il y a 2 heures", label: "Demande d'intervention reçue" }],
  },
  {
    id: "paul-simon",
    firstName: "Paul",
    lastName: "Simon",
    email: "paul.simon@email.fr",
    phone: "06 22 11 00 99",
    project: "Location",
    propertyType: "T1",
    budget: "560 € CC",
    location: "Clermont-Ferrand — Jaude",
    situation: "CDD",
    score: 55,
    status: "Nouveau",
    urgency: "Faible",
    lastInteraction: "Il y a 1 heure",
    nextAction: "Analyser la demande avec ImmoPilot",
    assignedTo: "Non assigné",
    notes: "Première demande, informations à confirmer.",
    documents: [],
    timeline: [{ date: "Il y a 1 heure", label: "Demande reçue depuis le site de l'agence" }],
  },
];

export const DEMO_PROPERTIES = [
  { id: "p1", title: "T2 lumineux — Clermont-Ferrand centre", type: "Location", price: "700 €/mois", city: "Clermont-Ferrand", status: "Disponible" },
  { id: "p2", title: "T3 rénové — Paris 11e", type: "Location", price: "1 250 €/mois", city: "Paris", status: "Sous offre" },
  { id: "p3", title: "Studio étudiant — Lyon 3e", type: "Location", price: "690 €/mois", city: "Lyon", status: "Disponible" },
  { id: "p4", title: "Maison 4 pièces — Nantes Chantenay", type: "Vente", price: "320 000 €", city: "Nantes", status: "Sous offre" },
  { id: "p5", title: "T1 centre-ville — Clermont-Ferrand Jaude", type: "Location", price: "560 €/mois", city: "Clermont-Ferrand", status: "Disponible" },
  { id: "p6", title: "Appartement 3 pièces — Bordeaux Chartrons", type: "Gestion locative", price: "980 €/mois", city: "Bordeaux", status: "Loué" },
];

export const DEMO_TASKS = [
  { id: "t1", title: "Relancer Camille Lefèvre — sans réponse depuis 3 jours", type: "Relance", priority: "Élevée", prospect: "camille-lefevre" },
  { id: "t2", title: "Demander l'avis d'imposition à Jordan Taylor", type: "Document", priority: "Moyenne", prospect: "jordan-taylor" },
  { id: "t3", title: "Relancer Thomas Nguyen après 48h", type: "Relance", priority: "Moyenne", prospect: "thomas-nguyen" },
  { id: "t4", title: "Confirmer l'offre d'achat de Sophie Marchal", type: "Validation", priority: "Élevée", prospect: "sophie-marchal" },
  { id: "t5", title: "Qualifier la demande d'intervention d'Amélie Roussel", type: "Gestion locative", priority: "Élevée", prospect: "amelie-roussel" },
  { id: "t6", title: "Analyser la nouvelle demande de Paul Simon", type: "Qualification", priority: "Faible", prospect: "paul-simon" },
  { id: "t7", title: "Préparer la visite de 15h30 — T2 Clermont-Ferrand", type: "Visite", priority: "Élevée", prospect: "camille-lefevre" },
  { id: "t8", title: "Générer le compte rendu de la visite de Jordan Taylor", type: "Compte rendu", priority: "Moyenne", prospect: "jordan-taylor" },
];

export const DEMO_VISITS = [
  { id: "v1", time: "10:00", prospect: "Paul Simon", property: "T1 — Clermont-Ferrand Jaude", status: "À confirmer" },
  { id: "v2", time: "15:30", prospect: "Camille Lefèvre", property: "T2 — Clermont-Ferrand centre", status: "Confirmée" },
  { id: "v3", time: "17:00", prospect: "Sophie Marchal", property: "Maison — Nantes Chantenay", status: "Confirmée" },
];

export const DEMO_MESSAGES = [
  { id: "m1", prospect: "Camille Lefèvre", preview: "Bonjour, avez-vous eu le temps de regarder mon dossier ?", time: "09:12", unread: true },
  { id: "m2", prospect: "Jordan Taylor", preview: "Voici mon contrat de travail comme demandé.", time: "Hier", unread: false },
  { id: "m3", prospect: "Amélie Roussel", preview: "La fuite s'est aggravée depuis ce matin.", time: "Il y a 2h", unread: true },
];

export const DEMO_AUTOMATIONS = [
  { id: "a1", title: "Qualifier automatiquement une nouvelle demande", trigger: "Lorsqu'une nouvelle demande arrive", active: true },
  { id: "a2", title: "Suggérer une relance", trigger: "Lorsqu'un prospect n'a pas reçu de réponse sous 48h", active: true },
  { id: "a3", title: "Signaler un dossier incomplet", trigger: "Lorsqu'un dossier est incomplet", active: true },
  { id: "a4", title: "Générer un compte rendu", trigger: "Lorsqu'une visite est marquée comme terminée", active: true },
  { id: "a5", title: "Alerter sur une échéance proche", trigger: "Lorsqu'une échéance approche", active: false },
  { id: "a6", title: "Prioriser un prospect chaud", trigger: "Lorsqu'un prospect devient prioritaire", active: false },
];

export const DEMO_KPIS = {
  totalDemandes: 46,
  tempsReponseMoyen: "1h50",
  demandesTraitees: "36/46",
  prospectsActifs: 24,
  visitesSemaine: 9,
  conversions: 7,
  dossiersIncomplets: 5,
  tachesEnRetard: 2,
};

export function getProspect(id: string) {
  return DEMO_PROSPECTS.find((p) => p.id === id);
}

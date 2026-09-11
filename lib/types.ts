export type Property = {
  id: string;
  title: string;
  address?: string | null;
  city?: string | null;
  rent: number;
  status?: string | null;
};

export type Application = {
  id: string;
  property_id?: string | null;
  candidate_email: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  city?: string | null;
  job_status?: string | null;
  income?: number | null;
  guarantor_status?: string | null;
  guarantor_income?: number | null;
  stage: string;
  activity: string;
  visit_status: string;
  score: number;
  signature_probability: number;
  score_source?: "ai" | "fallback" | "manuel" | null;
  note?: string | null;
  summary?: string | null;
  last_message?: string | null;
  assigned_to?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  property?: Property | null;
};

export type RentalDocument = {
  id: string;
  application_id: string;
  type: string;
  label: string;
  status: "manquant" | "à vérifier" | "validé" | "refusé" | "non requis";
  file_name?: string | null;
  storage_path?: string | null;
  rejection_reason?: string | null;
};

export type Visit = {
  id: string;
  application_id: string;
  scheduled_at?: string | null;
  status: "À confirmer" | "Confirmée" | "Effectuée" | "Annulée";
  address?: string | null;
  report_impression?: string | null;
  report_positives?: string | null;
  report_concerns?: string | null;
  report_signature_likelihood?: string | null;
  report_next_step?: string | null;
  report_generated_at?: string | null;
  application?: Application | null;
};

export type Task = {
  id: string;
  application_id: string;
  title: string;
  type: string;
  priority: "low" | "medium" | "high";
  status: "open" | "done" | "ignored";
  assigned_to?: string | null;
  created_at?: string | null;
  application?: Application | null;
};

export type Profile = {
  id: string;
  agency_id: string;
  role: string;
  full_name: string | null;
  email: string;
};

export type MessageTemplate = {
  id: string;
  agency_id: string;
  title: string;
  body: string;
  created_at?: string | null;
};

export type TimelineEvent = {
  id: string;
  application_id: string;
  label: string;
  created_at: string;
};

export type AiResult<T> = {
  source: "ai" | "fallback";
  data: T;
};

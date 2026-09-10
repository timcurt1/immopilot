-- ImmoPilot V25 SaaS Base
create extension if not exists "pgcrypto";
create table if not exists agencies(id uuid primary key default gen_random_uuid(),name text not null,city text,plan text check(plan in ('starter','pro','agence')) not null default 'starter',stripe_customer_id text,stripe_subscription_id text,subscription_status text,created_at timestamptz default now());
create table if not exists profiles(id uuid primary key references auth.users(id) on delete cascade,agency_id uuid references agencies(id) on delete cascade,email text unique not null,full_name text,role text check(role in ('admin','manager','agent','candidate')) not null default 'agent',created_at timestamptz default now());
create table if not exists properties(id uuid primary key default gen_random_uuid(),agency_id uuid references agencies(id) on delete cascade,title text not null,address text,city text,rent numeric not null,status text default 'active',created_at timestamptz default now());
create table if not exists applications(id uuid primary key default gen_random_uuid(),agency_id uuid references agencies(id) on delete cascade,property_id uuid references properties(id) on delete set null,candidate_email text not null,first_name text not null,last_name text not null,phone text,city text,job_status text,income numeric default 0,guarantor_status text,guarantor_income numeric default 0,stage text default 'À compléter',activity text default 'Document manquant',visit_status text default 'À confirmer',score integer default 0,signature_probability integer default 0,note text,last_message text,assigned_to uuid references profiles(id),created_at timestamptz default now(),updated_at timestamptz default now());
create table if not exists documents(id uuid primary key default gen_random_uuid(),application_id uuid references applications(id) on delete cascade,type text not null,label text not null,status text check(status in ('manquant','à vérifier','validé','refusé','non requis')) not null default 'manquant',file_name text,storage_path text,rejection_reason text,created_at timestamptz default now(),updated_at timestamptz default now(),unique(application_id,type));
create table if not exists visits(id uuid primary key default gen_random_uuid(),application_id uuid references applications(id) on delete cascade,scheduled_at timestamptz,status text default 'À confirmer',address text,created_at timestamptz default now());
create table if not exists messages(id uuid primary key default gen_random_uuid(),application_id uuid references applications(id) on delete cascade,sender text default 'ai',body text not null,created_at timestamptz default now());
create table if not exists tasks(id uuid primary key default gen_random_uuid(),application_id uuid references applications(id) on delete cascade,agency_id uuid references agencies(id) on delete cascade,title text not null,type text not null,priority text check(priority in ('low','medium','high')) default 'medium',status text check(status in ('open','done','ignored')) default 'open',created_at timestamptz default now());
create table if not exists timeline_events(id uuid primary key default gen_random_uuid(),application_id uuid references applications(id) on delete cascade,label text not null,created_at timestamptz default now());

-- Sécurité : si les tables existaient déjà avant l'ajout de ces colonnes/contraintes, on les rattrape ici (sans effet si déjà présentes).
alter table agencies add column if not exists plan text not null default 'starter';
alter table agencies add column if not exists stripe_customer_id text;
alter table agencies add column if not exists stripe_subscription_id text;
alter table agencies add column if not exists subscription_status text;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'agencies_plan_check') then
    alter table agencies add constraint agencies_plan_check check (plan in ('starter','pro','agence'));
  end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'documents_application_id_type_key') then
    alter table documents add constraint documents_application_id_type_key unique (application_id, type);
  end if;
end $$;
alter table documents add column if not exists rejection_reason text;
alter table visits add column if not exists report_impression text;
alter table visits add column if not exists report_positives text;
alter table visits add column if not exists report_concerns text;
alter table visits add column if not exists report_signature_likelihood text;
alter table visits add column if not exists report_next_step text;
alter table visits add column if not exists report_generated_at timestamptz;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'visits_status_check') then
    alter table visits add constraint visits_status_check check (status in ('À confirmer','Confirmée','Effectuée','Annulée'));
  end if;
end $$;

alter table agencies enable row level security;alter table profiles enable row level security;alter table properties enable row level security;alter table applications enable row level security;alter table documents enable row level security;alter table visits enable row level security;alter table messages enable row level security;alter table tasks enable row level security;alter table timeline_events enable row level security;
drop policy if exists "profile read own" on profiles;
create policy "profile read own" on profiles for select using (id=auth.uid());
drop policy if exists "agency applications access" on applications;
create policy "agency applications access" on applications for all using (agency_id in (select agency_id from profiles where id=auth.uid()) or candidate_email=(select email from profiles where id=auth.uid())) with check (agency_id in (select agency_id from profiles where id=auth.uid()));
drop policy if exists "agency properties access" on properties;
create policy "agency properties access" on properties for all using (agency_id in (select agency_id from profiles where id=auth.uid())) with check (agency_id in (select agency_id from profiles where id=auth.uid()));
drop policy if exists "documents linked access" on documents;
create policy "documents linked access" on documents for all using (exists(select 1 from applications a where a.id=documents.application_id and (a.agency_id in (select agency_id from profiles where id=auth.uid()) or a.candidate_email=(select email from profiles where id=auth.uid()))));
drop policy if exists "agency read own" on agencies;
create policy "agency read own" on agencies for select using (id in (select agency_id from profiles where id=auth.uid()));
drop policy if exists "visits linked access" on visits;
create policy "visits linked access" on visits for all using (exists(select 1 from applications a where a.id=visits.application_id and (a.agency_id in (select agency_id from profiles where id=auth.uid()) or a.candidate_email=(select email from profiles where id=auth.uid())))) with check (exists(select 1 from applications a where a.id=visits.application_id and a.agency_id in (select agency_id from profiles where id=auth.uid())));
drop policy if exists "messages linked access" on messages;
create policy "messages linked access" on messages for all using (exists(select 1 from applications a where a.id=messages.application_id and (a.agency_id in (select agency_id from profiles where id=auth.uid()) or a.candidate_email=(select email from profiles where id=auth.uid())))) with check (exists(select 1 from applications a where a.id=messages.application_id and a.agency_id in (select agency_id from profiles where id=auth.uid())));
drop policy if exists "timeline linked access" on timeline_events;
create policy "timeline linked access" on timeline_events for all using (exists(select 1 from applications a where a.id=timeline_events.application_id and (a.agency_id in (select agency_id from profiles where id=auth.uid()) or a.candidate_email=(select email from profiles where id=auth.uid())))) with check (exists(select 1 from applications a where a.id=timeline_events.application_id and a.agency_id in (select agency_id from profiles where id=auth.uid())));

-- Auto-provisioning : à l'inscription (signup=true dans les métadonnées auth), crée l'agence et le profil admin.
-- Si invited=true (invitation d'un coéquipier via auth.admin.inviteUserByEmail), rattache le profil à l'agence
-- et au rôle fournis dans les métadonnées au lieu de créer une nouvelle agence.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
declare
  new_agency_id uuid;
begin
  if (new.raw_user_meta_data->>'signup') = 'true' then
    insert into agencies(name) values (coalesce(new.raw_user_meta_data->>'agency_name','Nouvelle agence')) returning id into new_agency_id;
    insert into profiles(id,agency_id,email,full_name,role) values (new.id,new_agency_id,new.email,trim(coalesce(new.raw_user_meta_data->>'first_name','')||' '||coalesce(new.raw_user_meta_data->>'last_name','')),'admin');
  elsif (new.raw_user_meta_data->>'invited') = 'true' then
    insert into profiles(id,agency_id,email,full_name,role) values (new.id,(new.raw_user_meta_data->>'agency_id')::uuid,new.email,new.raw_user_meta_data->>'full_name',coalesce(new.raw_user_meta_data->>'role','agent'));
  end if;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- À chaque nouvelle candidature, crée les 7 documents attendus (statut manquant) pour que le suivi soit immédiatement utilisable.
create or replace function public.seed_default_documents() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into documents(application_id,type,label) values
    (new.id,'id','Pièce d’identité'),
    (new.id,'domicile','Justificatif domicile'),
    (new.id,'contrat','Contrat / attestation'),
    (new.id,'paie','Fiches de paie'),
    (new.id,'impots','Avis d’imposition'),
    (new.id,'rib','RIB'),
    (new.id,'garant','Garant')
  on conflict (application_id,type) do nothing;
  return new;
end;
$$;
drop trigger if exists on_application_created on applications;
create trigger on_application_created after insert on applications for each row execute function public.seed_default_documents();

-- Formulaire public de candidature : un visiteur non authentifié peut créer une candidature si le bien ciblé est actif.
drop policy if exists "public apply to active property" on applications;
create policy "public apply to active property" on applications for insert with check (exists(select 1 from properties p where p.id=applications.property_id and p.status='active'));
-- Un visiteur non authentifié peut consulter un bien actif pour remplir le formulaire de candidature.
drop policy if exists "public read active properties" on properties;
create policy "public read active properties" on properties for select using (status='active');

-- Créer un bucket privé dans Supabase Storage : rental-documents

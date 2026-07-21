# ImmoPilot V25 — SaaS Base

Cette version transforme ImmoPilot en vraie base SaaS.

## Stack

- Next.js 14
- TypeScript
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage pour documents
- Vercel-ready
- Mode local de secours si Supabase n’est pas configuré

## Pages incluses

- `/login` : connexion par magic link
- `/dashboard` : tâches du jour, KPI, priorités
- `/applications` : liste des candidatures
- `/applications/[id]` : fiche candidat complète
- `/properties` : biens et candidatures liées
- `/candidate` : portail candidat
- `/messages` : modèles IA
- `/settings` : sécurité, RGPD, déploiement

## Lancement local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Puis ouvrir :

```bash
http://localhost:3000
```

## Brancher Supabase

1. Crée un projet Supabase.
2. Va dans SQL Editor.
3. Exécute `supabase/schema.sql`.
4. Exécute `supabase/seed.sql`.
5. Crée un bucket Storage privé : `rental-documents`.
6. Copie les clés dans `.env.local`.

## Déploiement Vercel

1. Crée un repo GitHub.
2. Envoie le projet.
3. Connecte le repo à Vercel.
4. Ajoute les variables :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
5. Déploie.

## Important

Cette V25 est une base SaaS fonctionnelle de départ. Avant usage avec de vraies données : renforcer les policies RLS, finaliser l’upload Storage, ajouter une politique RGPD, logs et monitoring.

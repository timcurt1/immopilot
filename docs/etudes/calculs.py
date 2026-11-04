# Calculs des études ImmoPilot — reproductibles : python3 docs/etudes/calculs.py
# Chaque entrée est étiquetée FAIT (source dans 99-sources.md) ou HYPOTHÈSE (fourchette).
# Date de référence : 2026-11-04.

# ---------- Entrées ----------
FAIT = {
    "cartes_gestion_cci_2025": 15437,      # CCI, fichier national, au 01/01/2025 (via Immo Matin)
    "entreprises_6831Z_2016": 56218,       # INSEE Ésane, série 010147790 (2016)
    "candidats_par_annonce_S1_2025": 12.5, # Baromètre Manda S1 2025
    "candidats_par_annonce_S2_2025": 17,   # Baromètre Manda S2 2025
    "smic_brut_mensuel_juin_2026": 1867.02,# SMIC au 01/06/2026 (via Payfit)
    "heures_mensuelles_35h": 151.67,
    "taux_legal_pro_S2_2026": 2.75,        # arrêté du 26/06/2026
    "supabase_pro_usd": 25, "vercel_pro_usd": 20, "resend_pro_usd": 20,
    "haiku_in_usd_mtok": 0.10, "haiku_out_usd_mtok": 0.50,  # claude.com/pricing (page lue)
    "sonnet_in_usd_mtok": 2.0, "sonnet_out_usd_mtok": 10.0,
    "stripe_pct": 0.015, "stripe_fixe": 0.25, "stripe_billing_pct": 0.007,
    "remise_annuelle": 0.15,               # donnée fournie par Timéo
}
H = {  # HYPOTHÈSES : (basse, centrale, haute)
    "annonces_location_par_mois": (4, 8, 15),
    "minutes_gagnees_par_candidature": (3, 6, 10),
    "cout_horaire_charge_eur": (16, 20, 25),
    "part_independantes_parmi_cartes_G": (0.5, 0.6, 0.7),
    "usd_eur": 0.90,
    "appels_ia_par_agence_mois": 300, "tokens_in_par_appel": 3000, "tokens_out_par_appel": 600,
    "mix_essentiel": 0.7,                  # part des clients sur l’offre d’entrée
}
PRIX = {"essentiel": 39, "agence": 79}     # décision Phase 4 (€ HT / mois / agence)

def r(x, n=2): return round(x + 1e-9, n)
out = []
def p(k, v, formule): out.append((k, v, formule)); print(f"{k:58} {v:>12}   ← {formule}")

# ---------- 1. Coût horaire (contrôle de cohérence de l’hypothèse) ----------
smic_h = FAIT["smic_brut_mensuel_juin_2026"] / FAIT["heures_mensuelles_35h"]
p("SMIC horaire brut (€)", r(smic_h), "1 867,02 / 151,67")
p("Coût horaire chargé bas = SMIC × 1,30 (€)", r(smic_h * 1.30), "contrôle : ≈ hypothèse basse 16 €")

# ---------- 2. Valeur créée par agence ----------
cand_c = (FAIT["candidats_par_annonce_S1_2025"] + FAIT["candidats_par_annonce_S2_2025"]) / 2
cands = (FAIT["candidats_par_annonce_S1_2025"], cand_c, FAIT["candidats_par_annonce_S2_2025"])
for i, lab in enumerate(["basse", "centrale", "haute"]):
    a = H["annonces_location_par_mois"][i]; c = cands[i]; m = H["minutes_gagnees_par_candidature"][i]; h = H["cout_horaire_charge_eur"][i]
    heures = a * c * m / 60
    p(f"Heures gagnées / mois ({lab})", r(heures, 1), f"{a} annonces × {c} candidats × {m} min / 60")
    p(f"Valeur / mois ({lab}) €", r(heures * h), f"heures × {h} €/h")
    p(f"Valeur / an ({lab}) €", r(heures * h * 12), "× 12")
    if lab == "centrale":
        v_c = heures * h
        p("Prix plafond value-based 10 % – 20 % (centrale) €", f"{r(v_c*0.10)} – {r(v_c*0.20)}", "valeur mensuelle × 0,10 à 0,20")

# ---------- 3. Grille et remise annuelle ----------
for k, m in PRIX.items():
    pm = r(m * (1 - FAIT["remise_annuelle"]))
    p(f"{k} annuel : prix mensuel équivalent €", pm, f"{m} × 0,85")
    p(f"{k} annuel : total facturé €", r(pm * 12), f"{pm} × 12")
arpa = H["mix_essentiel"] * PRIX["essentiel"] + (1 - H["mix_essentiel"]) * PRIX["agence"]
p("ARPA mensuel (mix 70/30, hors remise) €", r(arpa), "0,7 × 39 + 0,3 × 79")

# ---------- 4. Coûts ----------
fixes_usd = FAIT["supabase_pro_usd"] + FAIT["vercel_pro_usd"]
fixes_eur = fixes_usd * H["usd_eur"]
p("Coûts fixes mensuels (Supabase Pro + Vercel Pro) €", r(fixes_eur), f"({FAIT['supabase_pro_usd']} + {FAIT['vercel_pro_usd']}) $ × 0,90")
p("+ Resend Pro si > 3 000 e-mails/mois €", r(FAIT["resend_pro_usd"] * H["usd_eur"]), "20 $ × 0,90")
tin = H["appels_ia_par_agence_mois"] * H["tokens_in_par_appel"] / 1e6
tout = H["appels_ia_par_agence_mois"] * H["tokens_out_par_appel"] / 1e6
ia_haiku = (tin * FAIT["haiku_in_usd_mtok"] + tout * FAIT["haiku_out_usd_mtok"]) * H["usd_eur"]
ia_sonnet = (tin * FAIT["sonnet_in_usd_mtok"] + tout * FAIT["sonnet_out_usd_mtok"]) * H["usd_eur"]
p("Coût IA / agence / mois — Haiku €", r(ia_haiku), f"{tin} M in × 0,10 $ + {tout} M out × 0,50 $")
p("Coût IA / agence / mois — Sonnet €", r(ia_sonnet), f"{tin} M in × 2 $ + {tout} M out × 10 $")
for k, m in PRIX.items():
    stripe = m * (FAIT["stripe_pct"] + FAIT["stripe_billing_pct"]) + FAIT["stripe_fixe"]
    var = stripe + ia_sonnet
    p(f"{k} : frais Stripe / mois €", r(stripe), f"{m} × (1,5 % + 0,7 %) + 0,25")
    p(f"{k} : marge brute hors fixes (IA Sonnet) %", r((m - var) / m * 100, 1), "(prix − Stripe − IA) / prix")

def marge_globale(n):
    rev = n * arpa
    var = n * (arpa * (FAIT["stripe_pct"] + FAIT["stripe_billing_pct"]) + FAIT["stripe_fixe"] + ia_sonnet)
    fixes = fixes_eur + (FAIT["resend_pro_usd"] * H["usd_eur"] if n > 15 else 0)
    return rev, rev - var - fixes
for n in (1, 2, 5, 10, 20, 35):
    rev, mb = marge_globale(n)
    p(f"{n:>2} clients : MRR / marge brute après fixes €", f"{r(rev)} / {r(mb)}", f"{n} × ARPA − variables − fixes ({r(mb/rev*100,1)} %)")
pm = next(n for n in range(1, 100) if marge_globale(n)[1] > 0)
p("Point mort (nombre de clients pour couvrir les coûts techniques)", pm, "premier n où marge > 0")

# ---------- 5. Scénarios MRR ----------
SCEN = {"prudent": (2, 5, 10), "central": (4, 10, 20), "ambitieux": (6, 15, 35)}
for s, (m3, m6, m12) in SCEN.items():
    p(f"MRR {s} à 3 / 6 / 12 mois €", f"{r(m3*arpa)} / {r(m6*arpa)} / {r(m12*arpa)}", f"{m3}/{m6}/{m12} clients × ARPA")
for d in (-0.2, 0, 0.2):
    p(f"Sensibilité prix {int(d*100):+d} % : MRR central 12 mois €", r(20 * arpa * (1 + d)), "à volume constant ; volume réel à mesurer (Van Westendorp)")
    p(f"  clients nécessaires pour 1 020 € de MRR à {int(d*100):+d} %", r(1020 / (arpa * (1 + d)), 1), "1 020 / (ARPA × (1 + d))")

# ---------- 6. TAM / SAM / SOM ----------
arr = arpa * 12
p("ARPA annuel €", r(arr), "ARPA × 12")
p("TAM (agences avec carte G × ARPA annuel) €", r(FAIT["cartes_gestion_cci_2025"] * arr, 0), "15 437 × ARPA annuel")
for i, lab in enumerate(["basse", "centrale", "haute"]):
    sh = H["part_independantes_parmi_cartes_G"][i]
    p(f"SAM indépendantes ({lab}, {int(sh*100)} %) €", r(FAIT["cartes_gestion_cci_2025"] * sh * arr, 0), f"15 437 × {sh} × ARPA annuel")
for s, (_, _, m12) in SCEN.items():
    p(f"SOM 12 mois ({s}) : ARR €", r(m12 * arr, 0), f"{m12} clients × ARPA annuel")
    p(f"  part du SAM central", f"{r(m12 / (FAIT['cartes_gestion_cci_2025']*0.6)*100, 2)} %", f"{m12} / (15 437 × 0,6)")

# ---------- 7. Offre fondateurs et contrôle du site ----------
for k, m in PRIX.items():
    p(f"Tarif fondateurs {k} (−30 %) €", r(m * 0.7), f"{m} × 0,70")
import re, pathlib
html = pathlib.Path(__file__).resolve().parents[2].joinpath("immopilot-site/index.html").read_text(encoding="utf-8")
site = [int(x) for x in re.findall(r'data-price-month="(\d+)"', html)]
p("Prix lus dans le site (data-price-month)", str(site), "doit être égal à la grille Phase 4")
assert site == [PRIX["essentiel"], PRIX["agence"]], "Écart entre le site et la grille !"
assert 'data-annual-discount="15"' in html and FAIT["remise_annuelle"] == 0.15, "Remise annuelle incohérente !"
p("Contrôle de cohérence site ↔ calculs", "OK", "assertions passées")

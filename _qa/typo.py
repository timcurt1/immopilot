# Typographie française sur le TEXTE visible uniquement (hors balises, attributs, <style>, <script>).
# Usage : python3 _qa/typo.py fichier.html [...]   — idempotent ; affiche le nombre de corrections.
import re, sys

NNBSP, NBSP = ' ', ' '

def fix_text(t):
    n0 = t
    t = re.sub(r'[  ]+([:;!?»])', NNBSP + r'\1', t)      # espace fine avant : ; ! ? »
    t = re.sub(r'«[  ]+', '«' + NNBSP, t)                  # espace fine après «
    t = re.sub(r'(\d)[  ]+%', r'\1' + NNBSP + '%', t)      # 15 %
    t = re.sub(r'(\d)[  ]+€', r'\1' + NBSP + '€', t)       # 40 €
    t = re.sub(r'n°[ ]+', 'n°' + NBSP, t)
    return t, (t != n0)

def run(path):
    s = open(path, encoding='utf-8').read()
    # Découpe : blocs à ignorer (style, script, commentaires, balises) vs texte.
    parts = re.split(r'(<style[\s\S]*?</style>|<script[\s\S]*?</script>|<!--[\s\S]*?-->|<[^>]+>)', s)
    count = 0
    for i, p in enumerate(parts):
        if i % 2 == 1 or not p.strip():
            continue
        new, changed = fix_text(p)
        if changed:
            count += 1; parts[i] = new
    open(path, 'w', encoding='utf-8').write(''.join(parts))
    print(f'{path}: {count} segment(s) de texte corrigé(s)')

for f in sys.argv[1:]:
    run(f)

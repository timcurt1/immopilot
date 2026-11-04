# Vérifications de contenu : marqueurs, anciens placeholders, liens, cohérence croisée.
import re, os, glob, html
ROOT = os.path.join(os.path.dirname(__file__), '..', 'immopilot-site')
files = ['index.html', 'legal.html'] + [os.path.relpath(f, ROOT) for f in glob.glob(os.path.join(ROOT, 'assets/js/*.js'))]
txt = {f: open(os.path.join(ROOT, f), encoding='utf-8').read() for f in files}

print('== Marqueurs [À COMPLÉTER] / [À VALIDER] (fichier:ligne)')
total = 0
for f, s in txt.items():
    for i, line in enumerate(s.split('\n'), 1):
        for m in re.finditer(r'\[À (COMPLÉTER|VALIDER)[^\]]*\]', line):
            total += 1; print(f'  {f}:{i}  {m.group(0)}')
print(f'  total : {total}')

print('== Anciens placeholders')
for pat in [r'lorem', r'\bTODO\b', r'href="#"', r'contact@immopilot\.world', r'votre@email', r'action=""', r'Starter|Croissance|Premium', r'Recommandé', r'Réponse sous 24']:
    hits = [f'{f}:{i}' for f, s in txt.items() for i, l in enumerate(s.split('\n'), 1) if re.search(pat, l, re.I)]
    print(f'  {pat:32} → {", ".join(hits) if hits else "aucun"}')

print('== Liens internes (ancres et fichiers)')
ids = {f: set(re.findall(r'id="([^"]+)"', txt[f])) for f in ['index.html', 'legal.html']}
bad = []
for f in ['index.html', 'legal.html']:
    for href in re.findall(r'href="([^"]+)"', txt[f]):
        if href.startswith(('http', 'mailto:', 'tel:', 'data:')) or href.startswith('#i-'): continue
        path, _, anchor = href.partition('#')
        target = f if path in ('',) else ('index.html' if path in ('./', '/') else path)
        if not os.path.exists(os.path.join(ROOT, target)): bad.append(f'{f} → {href} (fichier absent)'); continue
        if anchor and target in ids and anchor not in ids[target]: bad.append(f'{f} → {href} (ancre absente)')
print('  ' + ('\n  '.join(bad) if bad else 'tous valides'))

print('== Cohérence croisée')
plain = {f: html.unescape(re.sub(r'<[^>]+>', ' ', s)) for f, s in txt.items() if f.endswith('.html')}
for label, pat in [('remise annuelle 15 %', r'15\s?%'), ('montants en €', r'\d[\d\s ]*(,\d+)?\s?€'), ('e-mails', r'[\w.+-]+@[\w-]+\.[\w.]+')]:
    for f, s in plain.items():
        found = sorted(set(m.group(0).replace(' ', ' ').replace(' ', ' ') for m in re.finditer(pat, s)))
        print(f'  {label:22} {f:11} → {found if found else "aucun"}')

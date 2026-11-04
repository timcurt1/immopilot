# Non-régression : python3 _qa/diff.py baseline after  → écarts par palier (part de pixels qui changent)
import sys, os, glob
from PIL import Image, ImageChops
A, B = sys.argv[1], sys.argv[2]
root = os.path.join(os.path.dirname(__file__), 'out')
rows = []
for d in sorted(glob.glob(os.path.join(root, A, '*x*'))):
    name = os.path.basename(d)
    for f in sorted(glob.glob(d + '/p*.jpg')):
        g = os.path.join(root, B, name, os.path.basename(f))
        if not os.path.exists(g): continue
        a, b = Image.open(f).convert('L'), Image.open(g).convert('L')
        if a.size != b.size: rows.append((1.0, name, f[-7:-4], 'taille')); continue
        m = ImageChops.difference(a, b).point(lambda v: 255 if v > 40 else 0)
        h = m.histogram()[255] / (a.width * a.height)
        rows.append((h, name, os.path.basename(f)[1:3], m.getbbox()))
rows.sort(reverse=True)
print('paliers comparés:', len(rows), '| identiques (<0,1 %):', sum(1 for r in rows if r[0] < 0.001), '| > 2 %:', sum(1 for r in rows if r[0] > 0.02))
for r in rows[:int(sys.argv[3]) if len(sys.argv) > 3 else 40]:
    print(f'{r[0]*100:5.1f}%  {r[1]:16} palier {r[2]}  zone {r[3]}')

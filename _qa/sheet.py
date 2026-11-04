# Planche contact : python3 _qa/sheet.py <dossier> <sortie.png> <échelle> <colonnes> [premier] [dernier]
import sys, glob
from PIL import Image, ImageDraw
d, out, sc, cols = sys.argv[1], sys.argv[2], float(sys.argv[3]), int(sys.argv[4])
files = sorted(glob.glob(d + '/p*.jpg'))
a = int(sys.argv[5]) if len(sys.argv) > 5 else 0
b = int(sys.argv[6]) if len(sys.argv) > 6 else len(files) - 1
files = files[a:b + 1]
ims = [Image.open(f) for f in files]
w, h = int(ims[0].width * sc), int(ims[0].height * sc)
rows = (len(ims) + cols - 1) // cols
g = Image.new('RGB', (cols * (w + 4), rows * (h + 4)), (255, 0, 128))
for i, im in enumerate(ims):
    t = im.resize((w, h))
    ImageDraw.Draw(t).text((3, 3), files[i].split('/')[-1][1:3], fill=(255, 0, 128))
    g.paste(t, ((i % cols) * (w + 4), (i // cols) * (h + 4)))
g.save(out)

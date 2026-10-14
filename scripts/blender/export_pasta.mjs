// Eksport renderu z pasta_still_life.py do WebP z alfą (uruchom z katalogu repo):
//   node scripts/blender/export_pasta.mjs .claude/render/pasta.png src/images/makaron-3d.webp
import sharp from "sharp";

const [src = ".claude/render/pasta.png", dst = "src/images/makaron-3d.webp"] = process.argv.slice(2);

// Cień z shadow catchera to czarne piksele z alfą. Szeroka, blada poświata od
// dużych świateł wyglądała na kremie jak brudna plama i kończyła się twardo na
// krawędzi kadru, więc słabe cienie wygaszamy krzywą (alfa^2); gęsty cień
// kontaktowy pod makaronem zostaje.
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += info.channels) {
  const a = data[i + 3];
  if (a === 0) continue;
  const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
  if (lum < 0.06) {
    const t = a / 255;
    const faded = 255 * t * t * 0.85;
    data[i + 3] = faded < 3 ? 0 : Math.round(faded);
  }
}
const cleaned = await sharp(data, { raw: info }).png().toBuffer();
const trimmed = await sharp(cleaned).trim({ threshold: 1 }).toBuffer();
const out = await sharp(trimmed)
  .resize({ width: 1100, withoutEnlargement: true })
  .webp({ quality: 86, alphaQuality: 90 })
  .toFile(dst);
console.log(`${dst}: ${out.width}x${out.height}, ${Math.round(out.size / 1024)} KB`);

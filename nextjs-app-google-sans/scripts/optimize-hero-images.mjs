/**
 * Writes responsive WebP copies of every banner photo, so browsers download a
 * size that fits the screen instead of the 1–1.4 MB JPEG original.
 *
 *   node scripts/optimize-hero-images.mjs
 *
 * For public/assets/hero/<name>.jpg it writes <name>-1280.webp,
 * <name>-1920.webp and <name>-2560.webp beside it (never upscaling). Run it
 * again after adding or replacing a banner photo. components/HeroImage.tsx
 * picks these up automatically.
 */
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const DIR = 'public/assets/hero';
export const WIDTHS = [1280, 1920, 2560];

const sources = readdirSync(DIR).filter((file) => /\.jpe?g$/i.test(file));
for (const file of sources) {
  const input = join(DIR, file);
  const base = file.replace(/\.jpe?g$/i, '');
  const { width } = await sharp(input).metadata();
  const original = statSync(input).size;
  const sizes = [];
  for (const w of WIDTHS) {
    const output = join(DIR, `${base}-${w}.webp`);
    await sharp(input)
      .resize({ width: Math.min(w, width), withoutEnlargement: true })
      .webp({ quality: 60, effort: 5 })
      .toFile(output);
    sizes.push(`${w}: ${Math.round(statSync(output).size / 1024)} KB`);
  }
  console.log(`${file} (${Math.round(original / 1024)} KB) -> ${sizes.join(', ')}`);
}

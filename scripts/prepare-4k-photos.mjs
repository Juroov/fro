import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Run from the repository root after reviewing AI outputs in source-photos/enhanced.
// Originals are never overwritten. Public files are separate 3840px-long-edge masters.
async function main() {
  const provenance = JSON.parse(fs.readFileSync('content/photo-sources.json', 'utf8'));
  const originals = JSON.parse(fs.readFileSync('source-photos/manifest.json', 'utf8').replace(/^\uFEFF/, ''));
  const inputs = [];
  for (const entry of provenance.photos) {
    const name = path.basename(entry.asset, '.webp');
    const original = originals.find(photo => photo.source === entry.original);
    if (!original) throw new Error(`Missing original for ${name}`);
    const originalPath = path.join('source-photos/extracted', original.file);
    const originalMeta = await sharp(originalPath).rotate().metadata();
    const aiPath = path.join('source-photos/enhanced', `${name}.png`);
    const enhanced = Math.max(originalMeta.width, originalMeta.height) < 3840;
    if (enhanced && !fs.existsSync(aiPath)) throw new Error(`AI enhancement not ready: ${name}`);
    inputs.push({ name, originalPath, originalMeta, enhanced, input: enhanced ? aiPath : originalPath });
  }
  fs.mkdirSync('public/projects/4k', { recursive: true });
  const photos = [];
  for (const item of inputs) {
    const { width, height } = item.originalMeta;
    const factor = 3840 / Math.max(width, height);
    const outputWidth = Math.round(width * factor);
    const outputHeight = Math.round(height * factor);
    const inputMeta = await sharp(item.input).metadata();
    const aspectChange = Math.abs((inputMeta.width / inputMeta.height) / (width / height) - 1);
    if (aspectChange > 0.04) throw new Error(`Review changed framing: ${item.name} (${aspectChange})`);
    const result = await sharp(item.input).rotate().toColourspace('srgb')
      .resize(outputWidth, outputHeight, { fit: 'fill', kernel: 'lanczos3' })
      .webp({ quality: 95, effort: 6, smartSubsample: true })
      .toFile(`public/projects/4k/${item.name}.webp`);
    photos.push({ name: item.name, src: `/projects/4k/${item.name}.webp`,
      originalWidth: width, originalHeight: height, width: result.width, height: result.height,
      enhanced: item.enhanced, method: item.enhanced ? 'ai-restoration-and-4k-export' : 'native-source-4k-export',
      restorationWidth: inputMeta.width, restorationHeight: inputMeta.height, bytes: result.size });
  }
  fs.writeFileSync('content/photo-quality.json', JSON.stringify({
    date: '2026-11-08', longEdge: 3840, quality: 95,
    note: '4K denotes export dimensions, not native captured detail. AI-restored images may contain reconstructed fine detail. All original source files are preserved.', photos,
  }, null, 2) + '\n');
  console.log(JSON.stringify({count: photos.length, enhanced: photos.filter(p => p.enhanced).length,
    native: photos.filter(p => !p.enhanced).length, megabytes: +(photos.reduce((sum, p) => sum + p.bytes, 0) / 1024 / 1024).toFixed(2)}));
}
main().catch(error => { console.error(error); process.exitCode = 1; });

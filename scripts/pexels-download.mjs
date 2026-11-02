// Baixa uma foto horizontal do Pexels para cada cena do vídeo.
//
// Uso:  PEXELS_API_KEY=sua_chave node scripts/pexels-download.mjs
//       (acrescente --force para baixar de novo as que já existem)
//
// As buscas ficam em src/video/photo-queries.json (id da cena -> termo em inglês).
// As fotos vão para public/video/pexels/<id>.jpg e os créditos para
// src/video/photos.json, que o vídeo lê para saber quais cenas têm foto.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const queriesPath = join(root, "src/video/photo-queries.json");
const manifestPath = join(root, "src/video/photos.json");
const outDir = join(root, "public/video/pexels");

const key = process.env.PEXELS_API_KEY;
if (!key) {
  console.error("Defina PEXELS_API_KEY (crie grátis em https://www.pexels.com/api/).");
  process.exit(1);
}
const force = process.argv.includes("--force");

const queries = JSON.parse(readFileSync(queriesPath, "utf8"));
const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : {};
mkdirSync(outDir, { recursive: true });

const used = new Set(Object.values(manifest).map((p) => p.pexelsId));

for (const [id, query] of Object.entries(queries)) {
  const file = `video/pexels/${id}.jpg`;
  if (!force && manifest[id] && existsSync(join(root, "public", file))) {
    console.log(`= ${id} (já existe)`);
    continue;
  }
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("size", "large");
  url.searchParams.set("per_page", "15");
  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) {
    console.error(`! ${id}: busca falhou (${res.status})`);
    continue;
  }
  const { photos } = await res.json();
  // Evita repetir a mesma foto em duas cenas.
  const photo = photos.find((p) => !used.has(p.id)) ?? photos[0];
  if (!photo) {
    console.error(`! ${id}: nenhuma foto para "${query}"`);
    continue;
  }
  used.add(photo.id);
  const img = await fetch(`${photo.src.original}?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop`);
  if (!img.ok) {
    console.error(`! ${id}: download falhou (${img.status})`);
    continue;
  }
  writeFileSync(join(root, "public", file), Buffer.from(await img.arrayBuffer()));
  manifest[id] = {
    file,
    pexelsId: photo.id,
    photographer: photo.photographer,
    url: photo.url,
    alt: photo.alt,
  };
  console.log(`+ ${id}: ${photo.photographer} — ${photo.url}`);
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\n${Object.keys(manifest).length} fotos em ${manifestPath}`);

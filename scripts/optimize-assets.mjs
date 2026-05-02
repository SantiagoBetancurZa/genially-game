#!/usr/bin/env node
// Optimiza assets de raw_assets/ a public/assets/ usando sips (macOS nativo).
//
// Estrategia:
//   - Fondos (sin transparencia) → JPEG calidad 85, ancho máx 1920px (~300-800KB).
//   - Personajes (con transparencia) → PNG re-encodeado a ancho máx 1920px (~1.5-2.5MB).
//
// Por qué no WebP: sips de macOS lee WebP pero no lo escribe. Si necesitás
// WebP/AVIF para reducir aún más, instalá sharp como devDependency y refactorizá
// este script. Para el target actual (escritorio, ~5-10 imágenes), el hybrid
// JPEG/PNG con sips es suficiente y zero-dependency.
//
// Uso: node scripts/optimize-assets.mjs
// Si añadís un asset nuevo a raw_assets/, registralo en RAW_TO_PUBLIC.

import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RAW_DIR = join(ROOT, 'raw_assets');
const PUBLIC_DIR = join(ROOT, 'public', 'assets');

// Mapa explícito: nombre del archivo fuente → { dest, kind }.
// kind 'opaque' → JPEG; kind 'transparent' → PNG. Mantener kebab-case en dest.
// Ver docs/asset-pipeline.md.
const RAW_TO_PUBLIC = {
  // Nota: 'Pantalla inicio.png' y 'Pantalla 1.png' son composiciones completas
  // (personaje + fondo juntos), no fuentes para procesar — se ignoran a propósito.
  'Fondo Pantalla 1.png':   { dest: 'backgrounds/level-intro-bg.jpg',     kind: 'opaque' },
  'Aya en Pantalla1.png':   { dest: 'characters/aya/aya-level-intro.png', kind: 'transparent' },
};

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 85;

function sipsExists() {
  try {
    execSync('command -v sips', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function optimize(srcPath, destPath, kind) {
  mkdirSync(dirname(destPath), { recursive: true });
  const args = ['-Z', String(MAX_WIDTH)];
  if (kind === 'opaque') {
    args.push('-s', 'format', 'jpeg', '-s', 'formatOptions', String(JPEG_QUALITY));
  } else {
    args.push('-s', 'format', 'png');
  }
  args.push(srcPath, '--out', destPath);
  execFileSync('sips', args, { stdio: 'inherit' });
}

function fmtBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / (1024 * 1024)).toFixed(2)}MB`;
}

function main() {
  if (!sipsExists()) {
    console.error('sips not found. This script requires macOS.');
    process.exit(1);
  }
  if (!existsSync(RAW_DIR)) {
    console.error(`raw_assets/ not found at ${RAW_DIR}`);
    process.exit(1);
  }

  let processed = 0;
  let skipped = 0;
  for (const [srcName, { dest, kind }] of Object.entries(RAW_TO_PUBLIC)) {
    const srcPath = join(RAW_DIR, srcName);
    const destPath = join(PUBLIC_DIR, dest);
    if (!existsSync(srcPath)) {
      console.log(`-  skip (not found): ${srcName}`);
      skipped++;
      continue;
    }
    const srcSize = statSync(srcPath).size;
    console.log(`>  ${srcName} (${fmtBytes(srcSize)}) → ${dest} [${kind}]`);
    optimize(srcPath, destPath, kind);
    const destSize = statSync(destPath).size;
    console.log(`   done: ${fmtBytes(destSize)} (${((1 - destSize / srcSize) * 100).toFixed(0)}% smaller)`);
    processed++;
  }
  console.log(`\nDone. Processed: ${processed}, Skipped: ${skipped}.`);
}

main();

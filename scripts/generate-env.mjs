import { config as loadDotenv } from 'dotenv';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

loadDotenv();

const apiUrl = process.env.API_URL || 'http://localhost:3000/api';
const outputDir = resolve('public');
const outputPath = resolve(outputDir, 'env.js');

mkdirSync(outputDir, { recursive: true });

const content = `window.__env = {\n  API_URL: '${apiUrl}'\n};\n`;
writeFileSync(outputPath, content, 'utf8');

console.log(`Generated runtime config at ${outputPath}`);

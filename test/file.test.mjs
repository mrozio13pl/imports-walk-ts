import { test } from 'uvu';
import { is } from 'uvu/assert';
import importWalkTs from '../dist/index.mjs';

import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(__dirname, './src.ts'), 'utf8');

test('get `import` and `re-export` statements in typescript', () => {
    const res = importWalkTs(src);

    is(res.length, 12)
});

test.run();
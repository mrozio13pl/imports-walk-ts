# imports-walk-ts

> Find `import` and `re-export` statements in typescript using [babel parser](https://babeljs.io/docs/babel-parser).

## Install

```bash
npm i imports-walk-ts
```

## Usage

`source.ts`
```ts
import moduleA from './module-a';
import moduleB from './module-b';
import moduleC = require('./module-c');
export * from './module-d';
```

`program.ts`
```ts
import importsWalkTs from 'imports-walk-ts';
import fs from 'fs';
const source = fs.readFileSync('source.ts', 'utf8');

importsWalkTs(source); // <= ['./module-a', './module-b', './module-c', './module-d']
```

## API

### `importsWalkTs(src, options?)`

Looks for `import` and `re-export` statements.

#### `src`

Type: `String`<br>
Source, where `import` and `re-export` statements will be looked for.

#### `options`

Type: `Object`<br>
Options are the same as [babel parser options](https://babeljs.io/docs/babel-parser#options).

## License

MIT 💖
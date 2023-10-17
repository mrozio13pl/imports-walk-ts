/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse, type ParserOptions } from '@babel/parser';
import type { Node } from '@babel/types';

function isNode(obj: any): obj is Node {
    return obj && typeof obj === 'object';
}

function findImports(node: Node, imports: string[] = []) {
    if (node.type === 'ImportDeclaration' || node.type === 'ExportAllDeclaration') {
        imports.push(node.source.value);
    } else if (node.type === 'ExportNamedDeclaration' && node.source) {
        imports.push(node.source.value);
    } else if (node.type === 'CallExpression') {
        if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 'require' &&
            node.arguments.length === 1 &&
            node.arguments[0].type === 'StringLiteral'
        ) {
            imports.push(node.arguments[0].value);
        }
    } else if (node.type === 'TSExternalModuleReference') {
        imports.push(node.expression.value);
    }

    for (const key in node) {
        if (isNode((<any>node)[key])) {
            findImports((<any>node)[key], imports);
        }
    }

    return imports;
}

/**
 * Find `import` and `re-export` statements in typescript.
 * @param {string} src Source, where `import` and `re-export` statements will be looked for.
 * @param {ParserOptions} options Options are the same as babel parser options.
 * @see https://babeljs.io/docs/babel-parser#options
 * @returns {string[]} Array of imported modules.
 *
 * @example
 *
 * `source.ts`
 * ```ts
 * import moduleA from './module-a';
 * import moduleB from './module-b';
 * import moduleC = require('./module-c');
 * export * from './module-d';
 * ```
 *
 * `program.ts`
 * ```ts
 * import importsWalkTs from 'imports-walk-ts';
 * import fs from 'fs';
 * const source = fs.readFileSync('source.ts', 'utf8');
 *
 * importsWalkTs(source); // <= ['./module-a', './module-b', './module-c', './module-d']
 * ```
 */
export = function (src: string, options: ParserOptions = {}): string[] {
    const ast = parse(src, {
        sourceType: 'module',
        plugins: ['typescript', ...(options.plugins || [])],
        ...options
    });

    return findImports(ast);
}
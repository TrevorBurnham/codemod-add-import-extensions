# codemod-add-import-extensions

A codemod to automatically add file extensions to relative imports in your TypeScript project.

```ts
// Before
import x from "../x";

// After
import x from "../x.ts"; // Or whatever the actual file extension is!
```

## Usage

Run with npx, passing the path to your project's `tsconfig.json` as an argument:

```sh
npx codemod-add-import-extensions --tsconfig tsconfig.json
```

By default, all TypeScript files will be updated in place. If you'd prefer to see what would change, use the `--dry-run` flag.

If your `tsconfig.json` specifies [`allowImportingTsExtensions`](https://www.typescriptlang.org/tsconfig/#allowImportingTsExtensions) or [`rewriteRelativeImportExtensions`](https://www.typescriptlang.org/tsconfig/#rewriteRelativeImportExtensions), TypeScript extensions like `.ts` will be used. Otherwise, they'll be transformed to their `.js` equivalents.

## Limitations

- Only ESM modules are supported, not CommonJS (`require("../x")`).
- Only static imports are supported, not dynamic ones (`import("../x")`).
- Import aliases are not supported (`import x from "@my-alias/x"`).
- If there are multiple files that could potentially match, the codemod emits a warning rather than trying to resolve the ambiguity.

## Why use explicit file extensions?

- **Performance:** Using explicit file extensions makes imports faster. See [Speeding up the JavaScript ecosystem – module resolution](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-2/).
- **Direct execution:** Using explicit file extensions allows TypeScript to be run without a compilation step. To learn how, see the [TypeScript 5.7 release notes – Path Rewriting for Relative Paths](https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/#path-rewriting-for-relative-paths).

## Preventing regressions

Once you've added file extensions to all of your relative imports, consider enabling the [`import/extensions` rule](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md) from [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) or [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x) to ensure that they're used consistently going forward.

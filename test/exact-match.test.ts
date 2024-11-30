import path from "node:path";
import { expect, test } from "vitest";

import { processFixtureSourceFile } from "./test-util";

test("ignores existing import declarations that already have an exact match", async () => {
  const { sourceFile, warnings } = await processFixtureSourceFile(
    path.join(__dirname, "fixtures", "exact-match"),
    "main.ts",
  );

  expect(warnings.length).toBe(0);

  const importDeclarations = sourceFile
    .getImportDeclarations()
    .map((decl) => decl.getText());

  expect(importDeclarations).toEqual([
    'import { js } from "./js-dep.js";',
    'import ts from "./ts-dep.ts";',
    'import jsIndex from "./js/index.js";',
    'import { tsIndex } from "./ts/index.ts";',
  ]);
});

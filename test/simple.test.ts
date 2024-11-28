import path from "node:path";
import { expect, test } from "vitest";

import { processFixtureSourceFile } from "./test-util";

test("adds missing extensions to filenames", async () => {
  const { sourceFile, warnings } = await processFixtureSourceFile(
    path.join(__dirname, "fixtures", "simple"),
    "main.ts",
  );

  expect(warnings.length).toBe(0);

  const importDeclarations = sourceFile
    .getImportDeclarations()
    .map((decl) => decl.getText());

  expect(importDeclarations).toEqual([
    'import { js } from "./js-dep.js";',
    'import { jsx } from "./jsx-dep.jsx";',
    'import ts from "./ts-dep.ts";',
    'import tsx from "./tsx-dep.tsx";',
  ]);
});

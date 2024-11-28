import path from "node:path";
import { expect, test } from "vitest";

import { processFixtureSourceFile } from "./test-util";

test("adds missing filenames to directory index imports", async () => {
  const { sourceFile, warnings } = await processFixtureSourceFile(
    path.join(__dirname, "fixtures", "directories"),
    "main.ts",
  );

  expect(warnings.length).toBe(0);

  const importDeclarations = sourceFile
    .getImportDeclarations()
    .map((decl) => decl.getText());

  expect(importDeclarations).toEqual([
    'import { ts } from "./ts-subdir/index.ts";',
  ]);
});

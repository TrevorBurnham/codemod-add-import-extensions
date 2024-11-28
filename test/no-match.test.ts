import path from "node:path";
import { expect, test } from "vitest";

import { processFixtureSourceFile } from "./test-util";

test("adds missing extensions to filenames", async () => {
  const { sourceFile, warnings } = await processFixtureSourceFile(
    path.join(__dirname, "fixtures", "no-match"),
    "main.ts",
  );

  expect(warnings).toEqual([
    expect.stringContaining(
      'test/fixtures/no-match/main.ts: No matching files found for import path "./404".',
    ),
  ]);

  const importDeclarations = sourceFile
    .getImportDeclarations()
    .map((decl) => decl.getText());

  expect(importDeclarations).toEqual(['import notFound from "./404";']);
});

import path from "node:path";
import { expect, test } from "vitest";

import { processFixtureSourceFile } from "./test-util";

test("adds missing extensions to filenames", async () => {
  const { sourceFile, warnings } = await processFixtureSourceFile(
    path.join(__dirname, "fixtures", "multi-match"),
    "main.ts",
  );

  expect(warnings).toEqual([
    expect.stringContaining(
      'test/fixtures/multi-match/main.ts: Multiple matching files found for import path "./multi": "./multi.ts", "./multi/index.js".',
    ),
  ]);

  const importDeclarations = sourceFile
    .getImportDeclarations()
    .map((decl) => decl.getText());

  expect(importDeclarations).toEqual(['import { multi } from "./multi";']);
});

import path from "node:path";
import { expect, test } from "vitest";

import { processFixtureSourceFile } from "./test-util";

test.each([true, false])(
  "adds missing filenames to directory index imports (allowImportingTsExtensions=%s)",
  async (allowImportingTsExtensions) => {
    const { sourceFile, warnings } = await processFixtureSourceFile(
      path.join(__dirname, "fixtures", "directories"),
      "main.ts",
      allowImportingTsExtensions,
    );

    expect(warnings.length).toBe(0);

    const importDeclarations = sourceFile
      .getImportDeclarations()
      .map((decl) => decl.getText());

    expect(importDeclarations).toEqual([
      `import { ts } from "./ts-subdir/index${allowImportingTsExtensions ? ".ts" : ".js"}";`,
    ]);
  },
);

import path from "node:path";
import { expect, test } from "vitest";

import { processFixtureSourceFile } from "./test-util";

test.each([true, false])(
  "adds missing extensions to filenames (allowImportingTsExtensions=%p)",
  async (allowImportingTsExtensions) => {
    const { sourceFile, warnings } = await processFixtureSourceFile(
      path.join(__dirname, "fixtures", "simple"),
      "main.ts",
      allowImportingTsExtensions,
    );

    expect(warnings.length).toBe(0);

    const importDeclarations = sourceFile
      .getImportDeclarations()
      .map((decl) => decl.getText());

    expect(importDeclarations).toEqual([
      'import { js } from "./js-dep.js";',
      'import { jsx } from "./jsx-dep.jsx";',
      `import ts from "./ts-dep${allowImportingTsExtensions ? ".ts" : ".js"}";`,
      `import tsx from "./tsx-dep${allowImportingTsExtensions ? ".tsx" : ".jsx"}";`,
    ]);
  },
);

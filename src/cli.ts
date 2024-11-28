import arg from "arg";
import codemodAddImportExtensions from "./index.js";

const args = arg({
  "--tsconfig": String,
  "--dry-run": Boolean,
  "--silent": Boolean,
});

if (!args["--tsconfig"]) {
  console.error(
    `Usage:\n\n$ npx codemod-add-import-extensions --tsconfig <tsconfig.json> [--dry-run] [--silent]`,
  );
  process.exit(1);
}

await codemodAddImportExtensions({
  tsConfigFilePath: args["--tsconfig"],
  dryRun: args["--dry-run"],
  silent: args["--silent"],
});

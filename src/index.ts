import { Project } from "ts-morph";
import { processSourceFile } from "./process.js";

const pluralize = (str: string, count: number) =>
  `${str}${count === 1 ? "" : "s"}`;

export default async function codemodAddImportExtensions({
  tsConfigFilePath,
  silent = false,
  dryRun = false,
}: {
  tsConfigFilePath: string;
  silent?: boolean;
  dryRun?: boolean;
}) {
  const project = new Project({
    tsConfigFilePath,
  });

  const allWarnings = [];

  for (const sourceFile of project.getSourceFiles()) {
    const { warnings } = await processSourceFile(sourceFile, silent, dryRun);
    allWarnings.push(...warnings);
  }

  if (allWarnings.length && !silent) {
    console.warn(
      `\nFinished run with ${allWarnings.length} ${pluralize("warning", allWarnings.length)}:\n\n` +
        allWarnings.join("\n"),
    );
  }
}

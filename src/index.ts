import { Project } from "ts-morph";
import { processSourceFile } from "./process.js";

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

  for (const sourceFile of project.getSourceFiles()) {
    await processSourceFile(sourceFile, silent, dryRun);
  }
}

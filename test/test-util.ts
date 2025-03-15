import path from "path";
import { Project } from "ts-morph";
import { processSourceFile } from "../src/process";

export const processFixtureSourceFile = async (
  fixtureDir: string,
  filename: string,
  allowImportingTsExtensions = false,
) => {
  const project = new Project({
    tsConfigFilePath: path.join(fixtureDir, "tsconfig.json"),
  });
  return await processSourceFile(
    project.getSourceFile(path.join(fixtureDir, filename))!,
    { silent: true, dryRun: true, allowImportingTsExtensions },
  );
};

import { posix } from "node:path";

import type { SourceFile } from "ts-morph";
import { filterDirContents } from "./util/fs.js";
import type { Dirent } from "node:fs";

// Use POSIX-based path conventions to avoid generating import paths with "\" under Windows.
const path = posix;

const isRelativeImportPath = (importPath: string) => {
  return importPath.startsWith(".");
};

export const processSourceFile = async (
  sourceFile: SourceFile,
  silent = false,
  dryRun = false,
) => {
  const sourceFileDirname = path.dirname(sourceFile.getFilePath());
  const warnings = [];

  for (const importDeclaration of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDeclaration.getModuleSpecifier();
    const originalImportPath = moduleSpecifier.getLiteralValue();

    if (!isRelativeImportPath(originalImportPath)) continue;

    const validImportPaths = await findValidImportPaths(
      sourceFileDirname,
      originalImportPath,
    );

    if (validImportPaths.length === 1) {
      const newImportPath = validImportPaths[0]!;
      moduleSpecifier.setLiteralValue(newImportPath);
      if (!silent) {
        console.info(
          `${sourceFile.getFilePath()}: "${originalImportPath}" -> "${newImportPath}"`,
        );
      }
    } else if (validImportPaths.length === 0) {
      warnings.push(
        `${sourceFile.getFilePath()}: No matching files found for import path "${originalImportPath}".`,
      );
    } else if (validImportPaths.length > 1) {
      warnings.push(
        `${sourceFile.getFilePath()}: Multiple matching files found for import path "${originalImportPath}": ${validImportPaths.map((str) => `"${str}"`).join(", ")}.`,
      );
    }
  }

  if (!dryRun) {
    await sourceFile.save();
  }

  return { sourceFile, warnings };
};

const findValidImportPaths = async (
  sourceFileDirname: string,
  originalImportPath: string,
) => {
  const resolvedImportPath = path.join(sourceFileDirname, originalImportPath);
  const importFilename = path.basename(originalImportPath);

  const validSiblingFiles = await filterDirContents(
    path.dirname(resolvedImportPath),
    (dirent) =>
      dirent.isFile() &&
      path.basename(dirent.name, path.extname(dirent.name)) === importFilename,
  );

  let validIndexFiles: Dirent[] = [];
  try {
    validIndexFiles = await filterDirContents(
      resolvedImportPath,
      (dirent) =>
        dirent.isFile() &&
        path.basename(dirent.name, path.extname(dirent.name)) === "index",
    );
  } catch {
    // No such directory.
  }

  return [
    ...validSiblingFiles.map(
      ({ name: filename }) => `${path.dirname(originalImportPath)}/${filename}`,
    ),
    ...validIndexFiles.map(
      ({ name: filename }) => `${originalImportPath}/${filename}`,
    ),
  ];
};

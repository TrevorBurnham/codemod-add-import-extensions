import { opendir, stat } from "node:fs/promises";
import type { Dirent } from "node:fs";

/**
 * Find all items in a directory that satisfies the given `matcher`.
 *
 * @param dirPath
 * @param matcher
 * @returns An array of matching items.
 */
export const filterDirContents = async (
  dirPath: string,
  matcher: (dirent: Dirent) => boolean,
) => {
  const matches = [];
  const dir = await opendir(dirPath);
  for await (const dirent of dir) {
    if (matcher(dirent)) matches.push(dirent);
  }
  return matches;
};

/**
 * Check whether a file exists at the given path.
 *
 * @param filePath
 * @returns true if `filePath` points to a file, false otherwise.
 */
export const fileExists = async (filePath: string) => {
  try {
    if ((await stat(filePath)).isFile()) return true;
  } catch {
    /* No matching file was found. */
  }
  return false;
};

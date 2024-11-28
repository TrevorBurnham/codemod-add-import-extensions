import { opendir } from "node:fs/promises";
import type { Dirent } from "node:fs";

/**
 * Find all items in a directory that satisfies the given `matcher`.
 *
 * @param dirPath
 * @param matcher
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

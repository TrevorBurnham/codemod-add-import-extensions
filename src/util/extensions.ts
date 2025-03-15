import { extname } from "node:path";

const TYPESCRIPT_EXTENSION_TRANFSORMS = {
  ".ts": ".js",
  ".tsx": ".jsx",
  ".mts": ".mjs",
  ".cts": ".cjs",
} as const;

export const transformTsExtension = (pathWithExtension: string) => {
  const extension = extname(pathWithExtension);
  if (extension in TYPESCRIPT_EXTENSION_TRANFSORMS) {
    return (
      pathWithExtension.slice(0, pathWithExtension.length - extension.length) +
      TYPESCRIPT_EXTENSION_TRANFSORMS[
        extension as keyof typeof TYPESCRIPT_EXTENSION_TRANFSORMS
      ]
    );
  }

  return pathWithExtension;
};

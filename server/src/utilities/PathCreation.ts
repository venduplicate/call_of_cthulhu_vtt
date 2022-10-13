import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

export function createDirName(importMetaUrl: string) {
  return path.dirname(fileURLToPath(importMetaUrl));
}

export function createPath(dirName: string, folderString: string) {
  return path.join(dirName, folderString);
}

export async function getFiles(importMetaUrl: string, folderString: string) {
  const __dirname = createDirName(importMetaUrl);
  const pathName = createPath(__dirname, folderString);
  const eventFiles = fs
    .readdirSync(pathName)
    .filter((file: string) => file.endsWith(".js"));
  return eventFiles;
}

export async function getDefaultData(dirPath: string, file: string) {
  const filePath = path.join(dirPath, file);
  const data = await import(pathToFileURL(filePath).toString());
  
  return data.default;
}

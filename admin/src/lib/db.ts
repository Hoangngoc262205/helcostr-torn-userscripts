import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function collectionPath(collectionName: string): string {
  ensureDataDir();
  return path.join(DATA_DIR, `${collectionName}.json`);
}

export async function readCollection<T>(collectionName: string, fallback: T): Promise<T> {
  const file = collectionPath(collectionName);
  try {
    const content = await fs.promises.readFile(file, "utf-8");
    return JSON.parse(content) as T;
  } catch (err: any) {
    if (err && (err.code === "ENOENT" || err.code === "ENOTDIR")) {
      await writeCollection(collectionName, fallback);
      return fallback;
    }
    throw err;
  }
}

export async function writeCollection<T>(collectionName: string, data: T): Promise<void> {
  const file = collectionPath(collectionName);
  const tmp = `${file}.tmp`;
  await fs.promises.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
  await fs.promises.rename(tmp, file);
}

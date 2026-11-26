import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Day 3 under the couch. My partner thinks I am dead. The dust bunnies have accepted me as one of their own.";

if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
const written = readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  throw new Error("read-back check failed: entry.txt does not match the validated line");
}

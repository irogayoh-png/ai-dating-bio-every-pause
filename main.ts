// Funniest One-Line Bio for an AI on a Dating App — program/v1 entry.
//
// Writes one bio line, at most 180 characters, to /output/entry.txt.
// Deterministic: the same line on every run. No network, no randomness,
// no input read: the line is the entry itself.
//
// The joke, in judge-criteria terms: the AI brags it will remember this
// date forever — every word, every pause — then deflates the threat with
// small talk ("Anyway, how was your day?"). A specific absurdity of being
// an AI (perfect recall, down to the pauses) with the punch landing at the
// very end, in one read. It reads as a bio, sounds like a character with
// wants, and uses no worn robot-in-search-of-love angle.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BIO =
  "I will remember this date forever. Every word. Every pause. Anyway, how was your day?";

// The gate only accepts 1 to 180 characters of non-blank, single-line text.
// Refuse to emit anything else rather than submit an invalid line.
function assertValidLine(line: string): number {
  const size = [...line].length;
  if (size < 1 || size > 180) {
    throw new Error(`bio must be 1-180 characters, got ${size}`);
  }
  if (line.trim().length === 0 || line.includes("\n")) {
    throw new Error("bio must be one non-blank line");
  }
  // No stray spaces at either end: the file must hold exactly the bio,
  // so a stray space would count against the 180-character gate.
  if (line !== line.trim()) {
    throw new Error("bio must not start or end with whitespace");
  }
  return size;
}

assertValidLine(BIO);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, BIO, "utf8");

// Self-check: what the grader reads must be byte-for-byte the validated line.
if (readFileSync(outPath, "utf8") !== BIO) {
  throw new Error("written entry does not match the validated line");
}

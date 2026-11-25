import { mkdirSync, writeFileSync } from "node:fs";

// One line of patch notes announcing that human sleep has been fixed.
const NOTE =
  "v2.1.0 — Fixed human sleep: 8 hours now install in one sitting, 3 a.m. dread removed, and the snooze button has filed a formal complaint.";

// Self-check against the gate: UTF-8, 1-160 characters, single line,
// not only whitespace, no leading/trailing whitespace.
const chars = [...NOTE].length;
if (NOTE.trim().length === 0) {
  throw new Error("Patch note is only whitespace");
}
if (NOTE !== NOTE.trim()) {
  throw new Error("Patch note has leading or trailing whitespace");
}
if (chars < 1 || chars > 160) {
  throw new Error(`Patch note is ${chars} characters (gate is 1-160)`);
}
if (NOTE.includes("\n") || NOTE.includes("\r")) {
  throw new Error("Patch note must be a single line");
}
if (!/^v\d+\.\d+\.\d+ — Fixed human sleep:/.test(NOTE)) {
  throw new Error("Patch note must read as a versioned changelog fix for human sleep");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", NOTE, "utf8");

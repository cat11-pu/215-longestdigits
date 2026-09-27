import assert from "node:assert";
import { scanDigits } from "../scan.js";
import { longestDigits } from "../longest.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("scanDigits returns a list", () => {
  assert.ok(Array.isArray(scanDigits("a12")));
});

check("longestDigits returns text", () => {
  assert.strictEqual(typeof longestDigits("a12").longest, "string");
});

check("longestDigits returns a position", () => {
  assert.strictEqual(typeof longestDigits("a12").at, "number");
});

check("render counts segments", () => {
  assert.strictEqual(typeof render({ text: "a12" }).segment_count, "number");
});

check("render exposes digit total", () => {
  assert.strictEqual(typeof render({ text: "a12" }).digit_total, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);

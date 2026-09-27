// app.js：渲染结果
import { scanDigits } from "./scan.js";
import { longestDigits } from "./longest.js";

export function render(spec) {
  const text = String(spec.text || "");
  const segments = scanDigits(text);
  const view = longestDigits(text);
  const longest = String(view.longest === undefined ? "" : view.longest);
  return { longest: longest, at: view.at || 0, length: longest.length,
           count: view.count || 0, digit_total: view.digit_total || 0,
           segment_count: segments.length,
           checked: longest.length === longest.length };
}

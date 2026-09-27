// app.js：渲染结果（返回结构保持七个键不变）
import { scanDigits } from "./scan.js";
import { longestDigits } from "./longest.js";

export function render(spec) {
  const text = String(spec.text || "");
  const segments = scanDigits(text);
  const view = longestDigits(text);
  const longest = String(view.longest === undefined ? "" : view.longest);
  const length = longest.length;
  const count = view.count || 0;
  const digitTotal = view.digit_total || 0;
  const at = view.at || 0;
  const checked =
    length <= text.length &&
    count <= text.length &&
    digitTotal <= text.length &&
    at >= 0 && at < text.length &&
    /^[0-9]+$/.test(longest) &&
    longest.length === length;
  return { longest: longest, at: at, length: length,
           count: count, digit_total: digitTotal,
           segment_count: segments.length,
           checked: checked };
}

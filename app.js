// app.js：渲染结果（返回结构七键固定：longest/at/length/count/digit_total/segment_count/checked）
import { scanDigits } from "./scan.js";
import { longestInSegments } from "./longest.js";

// 不变量自检：长度不越界、计数不越界、起点合法、最长段为纯数字且长度一致。
function invariantsHold(view, textLength) {
  return view.length <= textLength
      && view.count <= textLength
      && view.digit_total <= textLength
      && view.at >= 0 && view.at < textLength
      && /^[0-9]+$/.test(view.longest)
      && view.longest.length === view.length;
}

export function render(spec) {
  const text = String(spec.text || "");
  const segments = scanDigits(text);
  const view = longestInSegments(segments);
  const longest = String(view.longest === undefined ? "" : view.longest);
  const result = { longest: longest, at: view.at || 0, length: longest.length,
                   count: view.count || 0, digit_total: view.digit_total || 0,
                   segment_count: segments.length };
  result.checked = invariantsHold(result, text.length);
  return result;
}

// longest.js：取最长数字段；长度相同取靠前的那段（只在严格更长时更换）。
import { scanDigits } from "./scan.js";

// 没有数字时报 E_NO_DIGITS，错误对象必带 code 字段。
function noDigitsError() {
  const error = new Error("text has no digits");
  error.code = "E_NO_DIGITS";
  return error;
}

// 在已扫出的段表上取最长，供 render 复用，避免对同一文本扫第二遍。
export function longestInSegments(segments) {
  if (!segments.length) throw noDigitsError();
  let best = segments[0];
  let digitTotal = 0;
  for (const segment of segments) {
    digitTotal += segment.text.length;
    if (segment.text.length > best.text.length) best = segment;
  }
  return { longest: best.text, at: best.at, count: segments.length, digit_total: digitTotal };
}

export function longestDigits(text) {
  return longestInSegments(scanDigits(text));
}

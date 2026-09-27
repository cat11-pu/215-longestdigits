// longest.js：在 scanDigits 的单遍扫描结果上取最长段，并列时保留靠前的段
import { scanDigits } from "./scan.js";

export function longestDigits(text) {
  const segments = scanDigits(text);
  if (segments.length === 0) {
    const error = new Error("文本里没有数字");
    error.code = "E_NO_DIGITS";
    throw error;
  }
  let best = segments[0];
  let digitTotal = best.text.length;
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    digitTotal += segment.text.length;
    if (segment.text.length > best.text.length) {
      best = segment;
    }
  }
  return { longest: best.text, at: best.at, count: segments.length, digit_total: digitTotal };
}

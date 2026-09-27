// scan.js：单遍扫描，连续数字算一段，返回每段的起点（at，从零数）与文本（text）
export const SCAN_LIMIT = 50000;

export function scanDigits(text) {
  const source = String(text == null ? "" : text);
  if (source.length > SCAN_LIMIT) {
    const error = new Error("文本超过 " + SCAN_LIMIT + " 字符的扫描预算");
    error.code = "E_TOO_LONG";
    throw error;
  }
  const segments = [];
  let start = -1;
  let digits = "";
  for (let i = 0; i < source.length; i++) {
    const code = source.charCodeAt(i);
    if (code >= 48 && code <= 57) {
      if (start === -1) {
        start = i;
        digits = "";
      }
      digits += String.fromCharCode(code);
    } else if (start !== -1) {
      segments.push({ at: start, text: digits });
      start = -1;
    }
  }
  if (start !== -1) {
    segments.push({ at: start, text: digits });
  }
  return segments;
}

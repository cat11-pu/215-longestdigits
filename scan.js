// scan.js：单趟扫描，连续数字算一段，返回每段的起点与文本。
// 预算：五万字符一次扫描，每字符只看一次（O(n)，无回溯）。
export function scanDigits(text) {
  const source = String(text === undefined || text === null ? "" : text);
  const segments = [];
  let start = -1;
  for (let index = 0; index < source.length; index += 1) {
    const ch = source[index];
    if (ch >= "0" && ch <= "9") {
      if (start < 0) start = index;
    } else if (start >= 0) {
      segments.push({ at: start, text: source.slice(start, index) });
      start = -1;
    }
  }
  if (start >= 0) {
    segments.push({ at: start, text: source.slice(start) });
  }
  return segments;
}

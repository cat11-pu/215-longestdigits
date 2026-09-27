// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "文本长度 " + String(spec.text || "").length + "，点按钮找最长数字串。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    const row = document.createElement("div");
    row.className = "row";
    const head = document.createElement("span");
    head.textContent = "最长数字串";
    row.appendChild(head);
    const mark = document.createElement("span");
    mark.className = "chip ok";
    mark.textContent = view.longest === "" ? "（没有）" : view.longest;
    row.appendChild(mark);
    parts.stage.appendChild(row);
    const row2 = document.createElement("div");
    row2.className = "row";
    row2.textContent = "起点 " + view.at + "，长度 " + view.length + "，数字串共 " + view.count + " 段";
    parts.stage.appendChild(row2);
    parts.legend.textContent = "数字总个数 " + view.digit_total;
    parts.log.textContent = "是否逐段核过 " + view.checked;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "找最长数字串";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加三位数字";
  addButton.addEventListener("click", function () {
    spec.text = String(spec.text || "") + "123";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后三位";
  dropButton.addEventListener("click", function () {
    spec.text = String(spec.text || "").slice(0, -3);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "a1234b";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value }));
      parts.out.textContent = box.value + " 的最长数字串是 " + (view.longest === "" ? "没有" : view.longest);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看长度";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "最长数字串长度 " + view.length + "，起点 " + view.at;
  });
  parts.controls.appendChild(readButton);

  draw();
}

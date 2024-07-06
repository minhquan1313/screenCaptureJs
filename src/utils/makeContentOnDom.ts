import windrag from "windrag";

let count = Number(localStorage.getItem("mtb_counter")) || 0;
let wId: ReturnType<(typeof windrag)["create"]>;
const id = "__mtb_time__";
const idDom = "#" + id;

export function makeContentOnDom(str: string, withCount = true) {
  const boxDiv = getBoxDiv();

  const contentDiv = document.createElement("div");
  boxDiv.innerHTML = "";
  boxDiv.append(contentDiv);

  contentDiv.style.cssText = `
    background: rgba(0, 0, 0, 0.7);
    padding: 0.6rem 1.5rem;
    font-size: 1.2rem;
    text-align: right;
    border-radius: 1rem;
    border: 1px solid white;
    font-family: consolas;
    `;

  const _str = str
    .split("\n")
    .filter((v) => v.trim())
    .join("\n");

  if (!withCount) {
    contentDiv.innerText = _str;
    return;
  }
  contentDiv.innerText = _str + "\n#" + count++;
  if (count === 99) count = 0;
  localStorage.setItem("mtb_counter", String(count));
}

function getBoxDiv() {
  const oldBoxDiv = document.querySelector<HTMLDivElement>(idDom);

  const boxDiv = oldBoxDiv || document.createElement("div");
  boxDiv.id = id;

  if (!oldBoxDiv) {
    boxDiv.style.cssText = `
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 1;
      `;
  }

  document.body.append(boxDiv);

  wId = oldBoxDiv
    ? wId
    : windrag.create(idDom, idDom, {
        limitMovement: true,
      });
  return boxDiv;
}

function getBoxDiv1() {
  const boxDiv = document.createElement("div");
  boxDiv.id = id;
  boxDiv.className = id;
  document.body.append(boxDiv);
  const wId = windrag.create(idDom, idDom, {
    limitMovement: true,
    css: `
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 1;
      `,
  });
  return boxDiv;
}

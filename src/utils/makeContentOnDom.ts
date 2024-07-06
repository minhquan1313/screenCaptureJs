import { cssApply } from "@/utils/cssApply";
import windrag from "windrag";

let count = Number(localStorage.getItem("mtb_counter")) || 0;
let wId: ReturnType<(typeof windrag)["create"]>;
const id = "__mtb_time__";
const idDom = "#" + id;

export function makeContentOnDom(str: string, withCount = true) {
  const boxDiv = getBoxDiv();
  boxDiv.innerHTML = "";

  const contentDiv = makeContentDiv(str, withCount);

  boxDiv.append(contentDiv);
}

export const contentDivCssV1: Partial<CSSStyleDeclaration> = {
  background: "rgba(0, 0, 0, 0.7)",
  padding: "0.6rem 1.5rem",
  fontSize: "1.2rem",
  textAlign: "right",
  borderRadius: "1rem",
  border: "1px solid white",
  fontFamily: "consolas",
};
export const contentDivCssV2: Partial<CSSStyleDeclaration> = {
  background: "rgba(0, 0, 0, 0.7)",
  padding: "0.6rem 1.5rem",
  fontSize: "1.2rem",
  textAlign: "right",
  borderRadius: "1rem",
  border: "1px solid white",
  fontFamily: "consolas",
};
export function makeContentDiv(str: string, withCount = true) {
  const contentDiv = document.createElement("div");

  cssApply(contentDiv, contentDivCssV2);

  const _str = str
    .split("\n")
    .filter((v) => v.trim())
    .join("\n");

  if (!withCount) {
    contentDiv.innerText = _str;
    return contentDiv;
  }
  contentDiv.innerText = _str + "\n#" + count++;
  if (count === 99) count = 0;
  localStorage.setItem("mtb_counter", String(count));

  return contentDiv;
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

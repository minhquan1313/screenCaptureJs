import { appendVanieToToolBar } from "@/addon/appendVanieToToolBar";
import svg from "@/assets/svg/dev.svg";
import { cssApply } from "@/utils/cssApply";
import Vanie from "vanie";

const appName = "MTB HL Plan";
let count = Number(localStorage.getItem("mtb_counter")) || 0;
// const id = "__mtb_time__";
// const idDom = "#" + id;
let vanie: Vanie;
let panel: HTMLElement;

const destroyListener: (() => void)[] = [];

export function onContentWindowDestroyAttach(listener: () => void) {
  destroyListener.push(listener);
}
function onContentWindowDestroy() {
  destroyListener.forEach((listener) => listener());
}

export function makeContentOnDomV2(str: string, withCount = true, controlPanel?: HTMLElement) {
  const boxDiv = getBoxDiv();

  const contentDiv = makeContentDivV2(str, withCount);
  if (controlPanel) {
    panel = controlPanel;
    contentDiv.appendChild(controlPanel);
  } else if (panel) {
    contentDiv.appendChild(panel);
  }

  boxDiv.lienzo = contentDiv;

  const { clientWidth: wC, clientHeight: hC } = contentDiv;

  const { w, h } = boxDiv.dLienzo;
  if (w < wC || h < hC) boxDiv.dLienzo = { w: wC, h: hC };
}

export function makeContentDivV2(str: string, withCount = true) {
  const contentDiv = document.createElement("div");

  cssApply(contentDiv, {
    padding: "0.6rem 1.5rem",
    fontSize: "1.2rem",
    textAlign: "right",
    fontFamily: "consolas",
    whiteSpace: "nowrap",
    width: "fit-content",
  });

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
  if (!vanie) {
    vanie = initVanieWindow();
  }

  const boxDiv = vanie;

  return boxDiv;
}

function initVanieWindow() {
  const vani = new Vanie("mac-claro");
  vani.asignarPadre(document.body);

  const headerEle = cssApply(document.createElement("span"), {
    padding: "0px 0.4rem",
    pointerEvents: "none",
  });

  headerEle.innerText = appName;

  const icon = cssApply(document.createElement("div"), {
    aspectRatio: "1 / 1",
    height: "100%",
    margin: "0px 0.4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  });

  icon.innerHTML = svg;

  vani.ico = icon;
  vani.cabecera = headerEle;
  vani.dLienzo = { h: 100, w: 100 };
  vani.dMinima = { h: 50, w: 50 };
  vani.pApertura = { x: 20, y: 20 };

  vani.abrir();

  cssApply(vani.lienzo, {
    backgroundColor: "#2f3542",
  });

  (window as any)["vani"] = vani;

  appendVanieToToolBar(vani, appName);
  vani.addEventListener("cerrar", onContentWindowDestroy);

  return vani;
}

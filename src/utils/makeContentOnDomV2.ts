import svg from "@/assets/svg/dev.svg";
import { createCopyTradingViewRightToolBar } from "@/utils/createCopyTradingViewRightToolBar";
import { cssApply } from "@/utils/cssApply";
import { getTradingViewRightToolBarBtn } from "@/utils/getTradingViewRightToolBarBtn";
import { textToDom } from "@/utils/textToDom";
import Vanie from "vanie";

const appName = "MTB HL Plan";
let count = Number(localStorage.getItem("mtb_counter")) || 0;
// const id = "__mtb_time__";
// const idDom = "#" + id;
let vanie: Vanie;

export function makeContentOnDomV2(str: string, withCount = true) {
  const boxDiv = getBoxDiv();

  const contentDiv = makeContentDivV2(str, withCount);

  boxDiv.lienzo = contentDiv;

  const { clientWidth: wC, clientHeight: hC } = contentDiv;
  // console.log(contentDiv.getBoundingClientRect(), contentDiv.getClientRects());

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

  const headerEle = document.createElement("span");

  cssApply(headerEle, {
    padding: "0px 0.4rem",
    pointerEvents: "none",
  });

  headerEle.innerText = appName;

  // const svgEle = textToDom(svg);
  // console.log("🚀 ~ initVanieWindow ~ svg:", svg);

  // console.log("🚀 ~ initVanieWindow ~ svgEle:", svgEle);

  // svgEle.style.height = "100%";
  const icon = document.createElement("div");
  cssApply(icon, {
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

  appendToToolBar(vani);

  return vani;
}
function appendToToolBar(vani: Vanie) {
  // insertBefore
  // const btnInToolbar = getXPath('//div[@data-name="right-toolbar"]/*[last()]');
  return new Promise<void>((rs) => {
    let itv = setInterval(() => {
      const btnInToolbar = getTradingViewRightToolBarBtn();

      if (!btnInToolbar) return;
      const svgEle = textToDom(svg);
      // cssApply(svgEle, {
      //   width: "36px",
      //   height: "36px",
      // });

      // const btnCopy = textToDom(btnInToolbar.outerHTML);
      // btnCopy.setAttribute("aria-label", appName);
      // btnCopy.setAttribute("data-name", appName);
      // btnCopy.setAttribute("data-tooltip", appName);
      // const spanSvgWrapper = btnCopy.querySelector("span");
      // if (spanSvgWrapper) {
      //   spanSvgWrapper.innerHTML = "";
      //   spanSvgWrapper.append(svgEle);
      // }

      // const element = btnCopy;
      const element = createCopyTradingViewRightToolBar(svgEle, appName);
      if (!element) return;

      btnInToolbar.parentElement?.insertBefore(element, btnInToolbar);

      const resizeHandler = () => {
        const { x, y } = element.getBoundingClientRect();
        vani.pRetorno = { x, y };
      };
      const clickHandler = () => {
        resizeHandler();

        // if (vani.estaMinimizado) {
        //   // const { x, y } = element.getBoundingClientRect();
        //   // vani.posicion = { x, y };
        // }

        vani.minimizar();
      };

      resizeHandler();

      vani.addEventListener("cerrar", () => {
        element.remove();
      });

      element.addEventListener("click", clickHandler);
      window.addEventListener("resize", resizeHandler);

      clearInterval(itv);
      rs();
    }, 300);
  });
}

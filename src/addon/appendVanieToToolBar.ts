import svg from "@/assets/svg/dev.svg";
import { textToDom } from "@/utils/textToDom";
import { createCopyTradingViewRightToolBar } from "@/utils/tradingView/createCopyTradingViewRightToolBar";
import { getTradingViewRightToolBarBtn } from "@/utils/tradingView/getTradingViewRightToolBarBtn";
import Vanie from "vanie";

export function appendVanieToToolBar(vani: Vanie, name: string) {
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
      const element = createCopyTradingViewRightToolBar(svgEle, name);
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

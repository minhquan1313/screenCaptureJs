import { cssApply } from "@/utils/cssApply";
import { defaultIconSize } from "@/utils/tradingView/createCopyTradingViewRightToolBar";

interface IParams {
  btnCopy: HTMLElement;
  icon?: HTMLElement;
  name?: string;
  size?: {
    width: string;
    height: string;
  };
}

export function updateCopyTradingViewRightToolBar(value: IParams) {
  const { btnCopy, icon, name, size = defaultIconSize } = value;

  if (icon) {
    const spanSvgWrapper = btnCopy.querySelector("span");
    if (spanSvgWrapper) {
      spanSvgWrapper.innerHTML = "";
      cssApply(icon, size);
      spanSvgWrapper.append(icon);
    }
  }

  if (name) {
    btnCopy.setAttribute("aria-label", name);
    btnCopy.setAttribute("data-name", name);
    btnCopy.setAttribute("data-tooltip", name);
  }

  if (size) {
    const spanSvgWrapper = btnCopy.querySelector("span");
    if (spanSvgWrapper) {
      cssApply(spanSvgWrapper.firstElementChild as HTMLElement, size);
    }
  }

  return;
}

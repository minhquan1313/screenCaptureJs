import { cssApply } from "@/utils/cssApply";
import { getXPath } from "@/utils/getXPath";

export const defaultIconSize = {
  width: "36px",
  height: "36px",
};

export function createCopyTradingViewRightToolBar(icon: HTMLElement, name: string, size = defaultIconSize) {
  const xpath = '//div[@data-name="right-toolbar"]/button[@aria-pressed="false"][1]';
  const btnInToolbar = getXPath(xpath);

  if (!btnInToolbar) return;

  const temp = document.createElement("div");
  temp.innerHTML = btnInToolbar.outerHTML;

  const btnCopy = temp.firstElementChild as HTMLElement;
  btnCopy.setAttribute("aria-label", name);
  btnCopy.setAttribute("data-name", name);
  btnCopy.setAttribute("data-tooltip", name);
  const spanSvgWrapper = btnCopy.querySelector("span");
  console.log("🚀 ~ createCopyTradingViewRightToolBar ~ spanSvgWrapper:", spanSvgWrapper);

  if (!spanSvgWrapper) return;

  spanSvgWrapper.innerHTML = "";
  cssApply(icon, size);
  spanSvgWrapper.append(icon);

  return btnCopy;
}

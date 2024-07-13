import { cssApply } from "@/utils/cssApply";
import { getXPath } from "@/utils/getXPath";

export function createCopyTradingViewRightToolBar(
  icon: HTMLElement,
  name: string,
  size = {
    width: "36px",
    height: "36px",
  },
) {
  const xpath = '//div[@data-name="right-toolbar"]/*[contains(@class,"filler")]/following-sibling::button[1]';
  const btnInToolbar = getXPath(xpath);

  if (!btnInToolbar) return;

  const temp = document.createElement("div");
  temp.innerHTML = btnInToolbar.outerHTML;

  const btnCopy = temp.firstElementChild!;
  btnCopy.setAttribute("aria-label", name);
  btnCopy.setAttribute("data-name", name);
  btnCopy.setAttribute("data-tooltip", name);
  const spanSvgWrapper = btnCopy.querySelector("span");
  if (spanSvgWrapper) {
    spanSvgWrapper.innerHTML = "";
    cssApply(icon, size);
    spanSvgWrapper.append(icon);

    return btnCopy;
  }

  return;
}

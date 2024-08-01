import { getXPath } from "@/utils/getXPath";

export function createCopyTradingViewDialogSectionInput(group: string, title: string, defaultValue: string | number) {
  const xpath = '//div[contains(@class,"dialog")]//*[@data-section-name and .//input]';
  const itemToCopy = getXPath(xpath);
  // if (!btnInToolbar) return;p
  // const temp = document.createElement("div");
  // temp.innerHTML = btnInToolbar.outerHTML;
  // const btnCopy = temp.firstElementChild as HTMLElement;
  // btnCopy.setAttribute("aria-label", name);
  // btnCopy.setAttribute("data-name", name);
  // btnCopy.setAttribute("data-tooltip", name);
  // const spanSvgWrapper = btnCopy.querySelector("span");
  // if (!spanSvgWrapper) return;
  // spanSvgWrapper.innerHTML = "";
  // cssApply(icon, size);
  // spanSvgWrapper.append(icon);
  // return btnCopy;
}

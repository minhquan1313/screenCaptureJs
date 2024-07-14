import { getClassActive } from "@/utils/tradingView/getClassActive";

export function isTradingViewBtnHightLighted(btn: Element) {
  const activeClass = getClassActive();

  if (!activeClass) return false;

  return btn.classList.contains(activeClass);
}

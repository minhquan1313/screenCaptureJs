import { getClassActive } from "@/utils/tradingView/getClassActive";

export async function isTradingViewBtnHightLighted(btn: Element) {
  const activeClass = await getClassActive();

  if (!activeClass) return false;

  return btn.classList.contains(activeClass);
}

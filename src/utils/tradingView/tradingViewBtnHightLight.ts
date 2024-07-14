import { getClassActive } from "./getClassActive";

export async function tradingViewBtnHightLight(btn: Element, hightLight: boolean) {
  btn.setAttribute("aria-pressed", String(hightLight));

  const activeClass = await getClassActive();

  if (!activeClass) return;

  if (hightLight) {
    btn.classList.add(activeClass);
  } else {
    btn.classList.remove(activeClass);
  }
}

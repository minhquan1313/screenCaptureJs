export function cssApply(ele: HTMLElement, css: Partial<CSSStyleDeclaration>) {
  for (const key in css) {
    if (!css[key]) continue;

    ele.style[key] = css[key];
  }
}

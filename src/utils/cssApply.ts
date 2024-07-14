export function cssApply<T extends HTMLElement>(ele: T, css: Partial<CSSStyleDeclaration>) {
  for (const key in css) {
    const value = css[key];
    if (!key || !value) continue;

    ele.style[key] = value;
  }

  return ele;
}

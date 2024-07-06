export function textToDom<T = HTMLElement>(value: string) {
  const div = document.createElement("div");
  div.innerHTML = value;

  return div.firstChild as T;
}

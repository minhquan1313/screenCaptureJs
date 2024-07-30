export function getXPath<T = HTMLElement>(xpath: string, ref: Node = document) {
  return document.evaluate(xpath, ref).iterateNext() as T | null;
}

export function getXPathList(xpath: string, ref: Node = document) {
  const list = document.evaluate(xpath, ref);

  const items: HTMLElement[] = [];

  let temp = list.iterateNext();
  while (temp !== null) {
    items.push(temp as HTMLElement);

    temp = list.iterateNext();
  }

  return items;
}

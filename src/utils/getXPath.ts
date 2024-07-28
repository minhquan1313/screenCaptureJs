export function getXPath(xpath: string, ref: Node = document) {
  return document.evaluate(xpath, ref).iterateNext() as HTMLElement | null;
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

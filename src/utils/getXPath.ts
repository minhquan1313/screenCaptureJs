export function getXPath(xpath: string, ref: Node = document) {
  return document.evaluate(xpath, ref).iterateNext() as HTMLElement | null;
}

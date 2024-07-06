export function getXPath(xpath: string) {
  return document.evaluate(xpath, document).iterateNext() as HTMLElement | null;
}

import { getXPath } from "@/utils/getXPath";

export function getDiffXauVsGc1ForDom() {
  const [xauXPath, gc1XPath] = ["XAUUSD", "GC1"].map(
    (v) => `//span[contains(@class,"last-") and preceding-sibling::div[contains(@class,"symbolName") and .//span[contains(text(),"${v}")]]]`,
  );

  const xau = getXPath(xauXPath);
  const gc1 = getXPath(gc1XPath);
  let s = "";

  if (!xau || !gc1) return s;

  const [nXau, nGc1] = [xau, gc1].map((v) => Number(v.innerText.trim()));
  if ([nXau, nGc1].find((v) => Number.isNaN(v))) return s;

  s = "GC1 - XAU = " + String((nGc1 - nXau).toFixed(2));

  return s;
}

import { getXPathList } from "@/utils/getXPath";

export function isAutoFitSScreen(btn: HTMLElement) {
  // const xpath =
  //   '//div[contains(@class,"chart-markup-table") and contains(@class,"pane") and .//div[contains(@class,"legendMainSourceWrapper")]]/following-sibling::div[contains(@class,"price-axis-container")]//button[text()="A" and contains(@class,"priceScaleModeButtons__button_activated")]';

  return btn.className.includes("activated");
}

export function getAutoFitScreenBtn() {
  return getXPathList(
    '//div[contains(@class,"chart-markup-table") and contains(@class,"pane") and .//div[contains(@class,"legendMainSourceWrapper")]]/following-sibling::div[contains(@class,"price-axis-container")]//button[text()="A"]',
  );
}

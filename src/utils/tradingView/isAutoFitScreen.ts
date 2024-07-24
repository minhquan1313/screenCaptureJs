import { getXPath } from "@/utils/getXPath";

export function isAutoFitSScreen() {
  const xpath =
    '//div[contains(@class,"chart-markup-table") and .//div[contains(@class,"legendMainSourceWrapper")]]/following-sibling::div[contains(@class,"price-axis-container")]//button[text()="A" and contains(@class,"priceScaleModeButtons__button_activated")]';

  return !!getXPath(xpath);
}

export function getAutoFitScreenBtn() {
  return getXPath(
    '//div[contains(@class,"chart-markup-table") and .//div[contains(@class,"legendMainSourceWrapper")]]/following-sibling::div[contains(@class,"price-axis-container")]//button[text()="A"]',
  );
}

import { getXPath } from "@/utils/getXPath";

export function isAutoFitSScreen() {
  return !!getXPath('//button[text()="A" and contains(@class,"priceScaleModeButtons__button_activated")]');
}

export function getAutoFitSScreenBtn() {
  return getXPath('//button[text()="A"]');
}

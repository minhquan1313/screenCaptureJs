import { getXPath } from "@/utils/getXPath";

export function getTradingViewRightToolBarBtn() {
  const xpath = '//div[@data-name="right-toolbar"]/*[contains(@class,"filler")]/following-sibling::button[1]';
  const btnInToolbar = getXPath(xpath);

  if (!btnInToolbar) return;

  return btnInToolbar;
}

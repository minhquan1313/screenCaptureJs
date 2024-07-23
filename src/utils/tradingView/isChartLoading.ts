import { getXPath } from "@/utils/getXPath";

export function isChartLoading() {
  return !!getXPath('//*[contains(@class,"screen") and contains(@class,"fade")]');
}

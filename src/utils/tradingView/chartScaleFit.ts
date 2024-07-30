import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { getAutoFitScreenBtn, isAutoFitSScreen } from "@/utils/tradingView/isAutoFitScreen";
import { whileFind } from "@/utils/whileFind";

const delay = 50;
export async function chartScaleFit() {
  /**
   * Hide all indicators
   */
  const hideAllArrow = getXPath('//*[@data-name="hide-all"]//button[contains(@class,"arrow")]');
  if (!hideAllArrow) return;

  hideAllArrow.click();
  await sleep(delay);

  const hideAllXp = '//*[@data-name="hide-all" and @data-role="menuitem"]';

  let hideAll = await whileFind({
    find: function () {
      return getXPath(hideAllXp);
    },
    sleepFn: sleep,
  });

  if (!hideAll.className.includes("isActive")) {
    hideAll.click();
  } else {
    hideAllArrow.click();
  }
  await sleep(delay);

  const autoFitScreenBtnList = getAutoFitScreenBtn();

  let index = 1;
  for await (const btn of autoFitScreenBtnList) {
    // if (!isAutoFitSScreen(btn)) {
    const chartXpath =
      '(//div[contains(@class,"chart-markup-table") and contains(@class,"pane") and .//div[contains(@class,"legendMainSourceWrapper")]])[' +
      index +
      "]//canvas[2]";
    const chart = getXPath(chartXpath);
    if (chart) {
      const event = new MouseEvent("contextmenu");
      chart.dispatchEvent(event);
      await sleep(delay);
      const reset = getXPath('//tr[@data-role="menuitem" and .//span[text()="Alt + R"]]');
      if (reset) {
        reset.click();
        await sleep(delay);
      }
    }

    if (!isAutoFitSScreen(btn)) {
      btn.click();
      await sleep(delay);
    }
    // }
    index++;
  }

  autoFitScreenBtnList[0]?.click();
  await sleep(delay);

  hideAllArrow.click();
  hideAll = await whileFind({
    find: function () {
      return getXPath(hideAllXp);
    },
    sleepFn: sleep,
  });
  hideAll.click();
}

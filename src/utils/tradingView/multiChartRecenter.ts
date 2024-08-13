import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { getAutoFitScreenBtn, isAutoFitSScreen } from "@/utils/tradingView/isAutoFitScreen";
import { whileFind } from "@/utils/whileFind";

const delay = 25;

interface IParams {
  //
  selectedChart?: HTMLElement | null;
}

export async function multiChartRecenter(value: IParams = {}) {
  const { selectedChart } = value;

  /**
   * Hide all click
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

  /**
   * Reset charts click
   */
  for await (const btn of autoFitScreenBtnList) {
    if (isAutoFitSScreen(btn)) continue;

    if (selectedChart && !selectedChart.contains(btn)) {
      btn.click();
      await sleep(delay);
    } else if (!selectedChart) {
      btn.click();
      await sleep(delay);
    }
  }

  /**
   * Unlock auto fit
   */
  for await (const btn of autoFitScreenBtnList) {
    if (selectedChart && !selectedChart.contains(btn)) {
      btn.click();
    } else if (!selectedChart) {
      btn.click();
    }
  }

  // autoFitScreenBtnList[0]?.click();
  await sleep(delay);

  /**
   * Show all again
   */
  hideAllArrow.click();
  hideAll = await whileFind({
    find: function () {
      return getXPath(hideAllXp);
    },
    sleepFn: sleep,
  });
  hideAll.click();
}

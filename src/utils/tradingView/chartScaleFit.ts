import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { getAutoFitScreenBtn, isAutoFitSScreen } from "@/utils/tradingView/isAutoFitScreen";
import { whileFind } from "@/utils/whileFind";

const delay = 100;
export async function chartScaleFit() {
  const hideAllArrow = getXPath('//*[@data-name="hide-all"]//button[contains(@class,"arrow")]');
  if (!hideAllArrow) return;

  hideAllArrow.click();
  await sleep(delay);

  const hideAllXp = '//*[@data-name="hide-all" and @data-role="menuitem"]';

  const hideAll = await whileFind({
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

  if (!isAutoFitSScreen()) {
    const chart = getXPath("//canvas[2]");
    const event = new CustomEvent("contextmenu");
    chart?.dispatchEvent(event);
    await sleep(delay);

    const reset = getXPath('//tr[@data-role="menuitem" and .//span[text()="Alt + R"]]');
    reset?.click();
    await sleep(delay);

    if (!isAutoFitSScreen()) {
      getAutoFitScreenBtn()?.click();
      await sleep(delay);
    }
  }

  getAutoFitScreenBtn()?.click();

  hideAllArrow.click();
  (
    await whileFind({
      find: function () {
        return getXPath(hideAllXp);
      },
      sleepFn: sleep,
    })
  ).click();
}

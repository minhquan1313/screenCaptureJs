import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { getAutoFitSScreenBtn, isAutoFitSScreen } from "@/utils/tradingView/isAutoFitSScreen";
import { whileFind } from "@/utils/whileFind";

const delay = 100;
export async function chartScaleFit() {
  if (!isAutoFitSScreen()) {
    const chart = getXPath("//canvas[2]");
    const event = new CustomEvent("contextmenu");
    chart?.dispatchEvent(event);
    await sleep(delay);

    const reset = getXPath('//tr[@data-role="menuitem" and .//span[text()="Alt + R"]]');
    console.log(`~🤖 chartScaleFit 🤖~ `, { reset });

    reset?.click();
    await sleep(delay);

    if (!isAutoFitSScreen()) {
      getAutoFitSScreenBtn()?.click();
      await sleep(delay);
    }
  }

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

  getAutoFitSScreenBtn()?.click();

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

import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { triggerMouseDownUp } from "@/utils/triggerMouseDownUp";
import { whileFind } from "@/utils/whileSleep";

export function chartScaleFix() {
  return new Promise<void>(async (rs) => {
    try {
      let xpath = '(//*[contains(@class,"price-axis-container")])[last()]/div';
      const settingEleToTrigger = getXPath(xpath);

      if (!settingEleToTrigger) return;

      await triggerMouseDownUp(settingEleToTrigger);

      xpath = '//span[text()="Settings…"]';

      const settingBtn = await whileFind({
        find: () => getXPath(xpath),
        sleepFn: sleep,
      });

      settingBtn.click();
      // -==-
      xpath = '//span[text()="Scales and lines"]';

      const scaleNLineBtn = await whileFind({
        find: () => getXPath(xpath),
        sleepFn: sleep,
      });
      scaleNLineBtn.click();

      xpath = '//div[@data-section-name="lockScale"]//input[@type="checkbox"]';
      const checkBox = (await whileFind({
        find: () => getXPath(xpath),
        sleepFn: sleep,
      })) as HTMLInputElement;
      if (!checkBox.checked) {
        checkBox.click();
      }

      xpath = '//div[@data-section-name="lockScale"]//input[@type="text"]';
      const input = (await whileFind({
        find: () => getXPath(xpath),
        sleepFn: sleep,
      })) as HTMLInputElement;

      input.focus();

      async function blurHandler() {
        await sleep(100);

        xpath = '//button[@data-name="submit-button"]';
        getXPath(xpath)?.click();

        input.removeEventListener("blur", blurHandler);

        rs();
      }

      input.addEventListener("blur", blurHandler);
    } catch (error) {
      console.log("Error xau scale", error);
    }
  });
}

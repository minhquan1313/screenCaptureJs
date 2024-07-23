import { cssApply } from "@/utils/cssApply";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { triggerMouseDownUp } from "@/utils/triggerMouseDownUp";
import { whileFind } from "@/utils/whileFind";

interface IParams {
  valueHint?: {
    [symbol: string]: number;
  };
}

export function chartScaleFix(param: IParams = {}) {
  return new Promise<void>(async (rs) => {
    try {
      const { valueHint } = param;

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

      const currentSelectedSymbol = getCurrentSelectedSym();
      if (valueHint && currentSelectedSymbol) {
        for (const symName in valueHint) {
          if (!checkSymbolName(currentSelectedSymbol, symName, true)) continue;

          const value = valueHint[symName];

          appendValueHint(value);
        }
      }

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

export function getCurrentSelectedSym() {
  // return getXPath(
  //   '//div[@class="widgetbar-widgetbody"]/div[contains(@class,"watchlist")]//div[contains(@class,"listContainer")]/div/div[.//div[contains(@class,"active")]]',
  // );
  const xpath =
    '//div[@class="widgetbar-widgetbody"]/div[contains(@class,"watchlist")]//div[contains(@class,"listContainer")]/div/div[.//div[contains(@class,"active")]]';

  const currentSelectedSymbol = getXPath(xpath);
  if (!currentSelectedSymbol) return;

  const nameEle = getXPath('.//span[contains(@class,"symbolNameText")]', currentSelectedSymbol);
  if (!nameEle) return;

  return nameEle.textContent;
}

export function checkSymbolName(selectedSymbol: string, symbolName: string, contain = false) {
  // const xpath =
  //   '//div[@class="widgetbar-widgetbody"]/div[contains(@class,"watchlist")]//div[contains(@class,"listContainer")]/div/div[.//div[contains(@class,"active")]]';

  // const currentSelectedSymbol = getXPath(xpath);
  // if (!currentSelectedSymbol) return false;

  // const nameEle = getXPath('.//span[contains(@class,"symbolNameText")]', selectedSymbol);
  // if (!nameEle) return false;

  const name = selectedSymbol;

  if (contain) {
    return name.includes(symbolName);
  }

  return name === symbolName;
}

export function checkSymbolNameFromHint(hint: IParams["valueHint"], selectedSymbol: string, contain = false) {
  for (const symName in hint) {
    if (checkSymbolName(selectedSymbol, symName, contain)) {
      return true;
    }
  }

  return false;
}

function appendValueHint(value: number) {
  const xpath = '(//div[@data-section-name="lockScale"][last()]//div[contains(@class,"wrap")])[1]';
  const inputWrapper = getXPath(xpath);

  if (!inputWrapper) return;

  const div = cssApply(document.createElement("div"), {
    padding: "0 8px",
  });

  inputWrapper.appendChild(div);
  navigator.clipboard.writeText(String(value));
  div.textContent = "Đã copy: " + value;
}

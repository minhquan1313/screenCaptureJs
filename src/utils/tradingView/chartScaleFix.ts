import { anyChartXpath, focusedChartXpath } from "@/constants/tdv";
import { cssApply } from "@/utils/cssApply";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { textToDom } from "@/utils/textToDom";
import { triggerMouseDownUp } from "@/utils/triggerMouseDownUp";
import { whileFind } from "@/utils/whileFind";

export type TValueHint = {
  [symbol: string]: number;
};

interface IChartScaleFixParams {
  valueHint?: TValueHint;
  settingOfFocusedChart?: boolean;
  onUpdate?: (sym: string, value: number) => void;
  selectedChart?: HTMLElement | null;
}
export function chartScaleFix(param: IChartScaleFixParams = {}) {
  return new Promise<void>(async (rs) => {
    try {
      const { valueHint, settingOfFocusedChart = false, onUpdate, selectedChart } = param;

      // ('//div[@class="chart-markup-table" and .//div[contains(@class,"legendMainSourceWrapper")]]/div[last()]/div[last()]/div');

      // const settingEleToTriggerList = getXPathList(
      //   '//div[@class="chart-markup-table" and .//div[contains(@class,"legendMainSourceWrapper")]]/div[last()]/div[last()]/div',
      // );

      // for await (const settingEleToTrigger of settingEleToTriggerList) {
      const xpathSettingChild = "/div[last()]/div[last()]/div";
      let xpath = (settingOfFocusedChart ? focusedChartXpath : anyChartXpath) + xpathSettingChild;
      const settingEleToTrigger = selectedChart ? getXPath("." + xpathSettingChild, selectedChart) : getXPath(xpath);
      console.log(`~🤖 chartScaleFix 🤖~ `, { xpathSettingChild, xpath, settingEleToTrigger, selectedChart });

      if (!settingEleToTrigger) return;

      await triggerMouseDownUp(settingEleToTrigger);

      xpath = '//tr[@data-role="menuitem" and ./td[contains(@class,"icon")]//*[local-name()="svg"]][last()]';
      // xpath = '//span[text()="Settings…"]';

      const settingBtn = await whileFind({
        find: () => getXPath(xpath),
        sleepFn: sleep,
      });

      settingBtn.click();

      xpath = '//*[@data-name="scales"]';
      // xpath = '//span[text()="Scales and lines"]';

      const scaleNLineBtn = await whileFind({
        find: () => getXPath(xpath),
        sleepFn: sleep,
      });
      scaleNLineBtn.click();

      // xpath = '//div[@data-section-name="lockScale"]//input[1]';
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
      let supported = false;
      if (valueHint && currentSelectedSymbol) {
        for (const symName in valueHint) {
          if (!checkSymbolName(currentSelectedSymbol, symName, true)) continue;

          const value = valueHint[symName];

          appendValueHint(value, symName, onUpdate);

          input.value = "" + value.toFixed(5);
          supported = true;
          break;
        }
      }

      async function clickHandle() {
        if (getXPath('//div[@data-section-name="lockScale"]//input[@type="text"]')) return;

        input.removeEventListener("input", inpHandler);
        window.removeEventListener("click", clickHandle);
        // input.removeEventListener("blur", inpHandler);

        rs();
      }
      async function inpHandler() {
        await sleep(100);
        input.blur();
        await sleep(100);

        // xpath = '//span[contains(@class,"applyToAllButton")]/button|//button[@data-name="submit-button"]';
        xpath = '//button[@data-name="submit-button"]';
        getXPath(xpath)?.click();

        input.removeEventListener("input", inpHandler);
        // input.removeEventListener("blur", inpHandler);
        window.removeEventListener("click", clickHandle);

        rs();
      }

      if (!supported && currentSelectedSymbol) {
        appendValueHint(undefined, currentSelectedSymbol, onUpdate);
      }
      input.addEventListener("input", inpHandler);
      // }
      // input.addEventListener("blur", inpHandler);

      window.addEventListener("click", clickHandle);
    } catch (error) {
      console.log("Error xau scale", error);
    }
  });
}

export function getCurrentSelectedSym() {
  const xpath =
    '//div[@class="widgetbar-widgetbody"]/div[contains(@class,"watchlist")]//div[contains(@class,"listContainer")]/div/div[.//div[contains(@class,"active")]]';

  const currentSelectedSymbol = getXPath(xpath);
  if (!currentSelectedSymbol) return;

  const nameEle = getXPath('.//span[contains(@class,"symbolNameText")]', currentSelectedSymbol);
  if (!nameEle) return;

  return nameEle.textContent;
}

export function checkSymbolName(selectedSymbol: string, symbolName: string, contain = false) {
  const name = selectedSymbol;

  if (contain) {
    return name.includes(symbolName);
  }

  return name === symbolName;
}

export function checkSymbolNameFromHint(hint: IChartScaleFixParams["valueHint"], selectedSymbol: string, contain = false) {
  for (const symName in hint) {
    if (checkSymbolName(selectedSymbol, symName, contain)) {
      return true;
    }
  }

  return false;
}

function appendValueHint(value: number | undefined, symbol: string, onUpdate: IChartScaleFixParams["onUpdate"]) {
  "wrap-Q2NZ0gvI wrap-nGXZ4vJz breakpointNormal-nGXZ4vJz";

  const xpath = '(//div[@data-section-name="lockScale"][last()]//div[contains(@class,"wrap")])[1]';
  const inputWrapper = getXPath(xpath);

  if (!inputWrapper) return;
  const addonSpanWithInput = makeCopyInput(value);

  if (addonSpanWithInput) {
    inputWrapper.appendChild(addonSpanWithInput);
    const inp = addonSpanWithInput.querySelector("input")!;

    if (!onUpdate) return;
    inp.addEventListener("input", () => {
      const { value } = inp;
      const v = parseFloat(value);

      if (!Number.isNaN(v) && v) {
        onUpdate(symbol, v);
      }
    });
    inp.addEventListener("focus", () => {
      inp.select();
    });
  } else {
    const div = cssApply(document.createElement("div"), {
      padding: "0 8px",
    });
    inputWrapper.appendChild(div);
    // navigator.clipboard.writeText(String(value));
    div.textContent = "D: " + value;
  }
}

function makeCopyInput(value?: number) {
  const spanHasInput = getXPath(
    '//div[contains(@class,"dialog")]//div[contains(@class,"content")]//span[contains(@class,"container")][.//input[@inputmode="numeric"]]',
  );
  if (!spanHasInput) return undefined;

  const spanCopy = textToDom(spanHasInput.outerHTML);
  spanCopy.querySelector("input")!.value = "Mặc định: " + (value ? value : "chưa có");
  return spanCopy;
}

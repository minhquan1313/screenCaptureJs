import { cssApply } from "@/utils/cssApply";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { whileFind } from "@/utils/whileFind";

/**
 * Auto copy entry | stop loss | take profit
 * for local MT5 EA
 */
let isRunning = false;
export function addAutoEST() {
  window.addEventListener("click", () => {
    autoEST();
  });
}
async function autoEST() {
  try {
    if (isBtnAlreadyExist() || isRunning) return;

    await sleep(50);

    isRunning = true;
    const isPositionDialogOpen = await whileFind({
      find: () => getXPath('//div[contains(@class,"dialog")]//*[contains(@data-section-name,"EntryPrice")]'),
      sleepFn: sleep,
    });

    if (!isPositionDialogOpen) return;

    const copyBtn = createCopyBtn();
    appendToDialog(copyBtn);

    const clickHandle = () => {
      const est = getEST();
      if (!est) {
        copyBtn.textContent = "Switch to input, pls";
        return;
      }
      const positionType = detectBuySell(est);
      if (!positionType) {
        copyBtn.textContent = "Can't detect";
        return;
      }
      isRunning = true;
      const value = [positionType, ...Object.values(est)].join("|");
      navigator.clipboard.writeText(value);
      copyBtn.textContent = "Copied";
      setTimeout(() => {
        getXPath('//button[@data-name="submit-button"]')?.click();
        isRunning = false;
      }, 500);
    };
    copyBtn.addEventListener("click", clickHandle);
  } catch (error) {
    if (error) console.log("Auto EST error", error);
  }
  isRunning = false;
}

interface IEst {
  et: number;
  sl: number;
  tp: number;
}

export function getEST(): IEst | undefined {
  const [et, sl, tp] = [
    '//div[contains(@data-section-name,"EntryPrice")]//input',
    '//div[contains(@data-section-name,"StopLevelPrice")]//input',
    '//div[contains(@data-section-name,"ProfitLevelPrice")]//input',
  ].map((xp) => parseFloat(getXPath<HTMLInputElement>(xp)?.value!));

  if ([et, sl, tp].includes(NaN)) return;

  return {
    et,
    sl,
    tp,
  };
}
export function detectBuySell(est: IEst): "buy-limit" | "sell-limit" | undefined {
  const { et, sl, tp } = est;

  if (et === sl) {
    if (et < tp) return "buy-limit";
    if (et > tp) return "sell-limit";
    return undefined;
  } else if (et > sl) return "buy-limit";
  else return "sell-limit";
}
export function createCopyBtn() {
  // const iconEle = document.createElement("div");
  // iconEle.textContent = "Copy EST";

  const btnToCopy = getXPath('//div[contains(@class,"dialog")]//button[@name="submit"]');

  // const btn = await whileFind({
  //   find: () => createCopyTradingViewRightToolBar(iconEle, "Copy EST"),
  //   sleepFn: sleep,
  // });
  const btn = cssApply(document.createElement("button"), {
    marginRight: "12px",
    marginLeft: "12px",
  });
  btn.id = "Copy-EST";
  btn.className = btnToCopy?.className || "";
  btn.textContent = "Copy EST";

  return btn;
}
function isBtnAlreadyExist() {
  return !!getXPath('//*[@id="Copy-EST"]');
}
export function appendToDialog(copyBtn: HTMLElement) {
  const dialogF = getXPath('//div[contains(@class,"dialog")]//div[contains(@class,"footer")]/div');
  dialogF?.prepend(copyBtn);
}

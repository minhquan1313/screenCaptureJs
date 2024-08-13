import svg from "@/assets/svg/expand.svg";
import { focusedChartXpath } from "@/constants/tdv";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { textToDom } from "@/utils/textToDom";
import { chartScaleFit } from "@/utils/tradingView/chartScaleFit";
import { chartScaleFix, getCurrentSelectedSym, TValueHint } from "@/utils/tradingView/chartScaleFix";
import { createCopyTradingViewRightToolBar } from "@/utils/tradingView/createCopyTradingViewRightToolBar";
import { getTradingViewRightToolBarBtn } from "@/utils/tradingView/getTradingViewRightToolBarBtn";
import { isChartLoading } from "@/utils/tradingView/isChartLoading";
import { tradingViewBtnHightLight } from "@/utils/tradingView/tradingViewBtnHightLight";
import { whileFind } from "@/utils/whileFind";

const valueHint: TValueHint = importValueHint() || {
  XAUUSD: 1.0,
  GC1: 1.0,
  USDWTI: 0.05,
  BTC: 60,
  ETH: 3,
  CHFJPY: 0.03,
};

let allowAuto = true;

export async function addXauScale1() {
  // const iconEle = textToDom(svgScale);
  const iconEleAuto = textToDom(svg);

  const tradingViewToolBtn = await whileFind({
    find: getTradingViewRightToolBarBtn,
    sleepFn: sleep,
  });

  // const newBtn = await whileFind({
  //   find: () =>
  //     createCopyTradingViewRightToolBar(iconEle, "Khoá thu phóng", {
  //       height: "26px",
  //       width: "26px",
  //     }),
  //   sleepFn: sleep,
  // });
  const newBtnAuto = await whileFind({
    find: () =>
      createCopyTradingViewRightToolBar(iconEleAuto, "Khoá thu phóng tự động", {
        height: "26px",
        width: "26px",
      }),
    sleepFn: sleep,
  });

  tradingViewBtnHightLight(newBtnAuto, allowAuto);
  // tradingViewToolBtn.parentElement?.insertBefore(newBtn, tradingViewToolBtn);
  tradingViewToolBtn.parentElement?.insertBefore(newBtnAuto, tradingViewToolBtn);

  const fitHandle = async (e: MouseEvent) => {
    if (!allowAuto) return;
    const target = e.target as HTMLElement | null;
    if (!target) return;
    // console.clear();
    await sleep(100);
    await whileFind({
      find: function () {
        return !isChartLoading();
      },
      sleepFn: sleep,
      delay: 50,
    });

    const watchList = await whileFind({
      find: () => getXPath('//div[@class="widgetbar-widgetbody"]/div[contains(@class,"watchlist")]//div[contains(@class,"listContainer")]/div'),
      sleepFn: sleep,
    });

    if (!watchList.contains(target)) return;

    const row = target.closest('div[style*="position: absolute"]');
    if (!row) return;
    let symbol = getXPath('.//span[contains(@class,"symbolNameText")]', row)?.textContent;

    if (!symbol) return;

    const selectedChart = getXPath(focusedChartXpath);

    // Start process

    await chartScaleFit();

    symbol = getCurrentSelectedSym();

    if (!symbol) return;

    await chartScaleFix({ valueHint, onUpdate: updateValueHint, selectedChart: selectedChart });
  };

  // newBtn.addEventListener("click", async () => {
  //   try {
  //     tradingViewBtnHightLight(newBtn, true);

  //     await whileFind({
  //       find: function () {
  //         return !isChartLoading();
  //       },
  //       sleepFn: sleep,
  //       delay: 50,
  //     });

  //     // await chartScaleFit();

  //     await chartScaleFix({ valueHint, settingOfFocusedChart: true, onUpdate: updateValueHint });
  //   } catch (error) {}
  //   tradingViewBtnHightLight(newBtn, false);
  // });

  newBtnAuto.addEventListener("click", async () => {
    allowAuto = !allowAuto;
    tradingViewBtnHightLight(newBtnAuto, allowAuto);
  });

  window.addEventListener("click", fitHandle);

  exportValueHint();
}

function importValueHint(): TValueHint | undefined {
  const json = localStorage.getItem("mtb.tdv.valueHint");

  if (!json) return undefined;

  const obj = JSON.parse(json);

  if (typeof obj !== "object" || typeof obj === null) return undefined;

  if (Object.keys(obj).length === 0) return {};

  for (const key in obj) {
    const value = obj[key];
    if (typeof value !== "number") return {};
  }

  return obj;
}

function updateValueHint(sym: string, value: number) {
  valueHint[sym] = value;
  exportValueHint();
}

function exportValueHint() {
  localStorage.setItem("mtb.tdv.valueHint", JSON.stringify(valueHint));
}

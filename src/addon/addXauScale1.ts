import svg from "@/assets/svg/expand.svg";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { textToDom } from "@/utils/textToDom";
import { chartScaleFit } from "@/utils/tradingView/chartScaleFit";
import { chartScaleFix, checkSymbolNameFromHint, getCurrentSelectedSym } from "@/utils/tradingView/chartScaleFix";
import { createCopyTradingViewRightToolBar } from "@/utils/tradingView/createCopyTradingViewRightToolBar";
import { getTradingViewRightToolBarBtn } from "@/utils/tradingView/getTradingViewRightToolBarBtn";
import { isChartLoading } from "@/utils/tradingView/isChartLoading";
import { tradingViewBtnHightLight } from "@/utils/tradingView/tradingViewBtnHightLight";
import { whileFind } from "@/utils/whileFind";

const valueHint = {
  XAUUSD: 1.0,
  GC1: 1.0,
  USDWTI: 0.05,
  BTC: 60,
  ETH: 3,
  CHFJPY: 0.03,
};

let allowAuto = true;

export async function addXauScale1() {
  const iconEle = textToDom(svg);
  const iconEleAuto = textToDom(svg);

  const tradingViewToolBtn = await whileFind({
    find: getTradingViewRightToolBarBtn,
    sleepFn: sleep,
  });

  const newBtn = await whileFind({
    find: () =>
      createCopyTradingViewRightToolBar(iconEle, "Khoá thu phóng", {
        height: "26px",
        width: "26px",
      }),
    sleepFn: sleep,
  });
  const newBtnAuto = await whileFind({
    find: () =>
      createCopyTradingViewRightToolBar(iconEleAuto, "Khoá thu phóng tự động", {
        height: "26px",
        width: "26px",
      }),
    sleepFn: sleep,
  });

  newBtn.addEventListener("click", async () => {
    try {
      tradingViewBtnHightLight(newBtn, true);

      await chartScaleFit();

      await chartScaleFix({ valueHint });
    } catch (error) {}
    tradingViewBtnHightLight(newBtn, false);
  });
  newBtnAuto.addEventListener("click", async () => {
    allowAuto = !allowAuto;
    tradingViewBtnHightLight(newBtnAuto, allowAuto);
  });

  tradingViewBtnHightLight(newBtnAuto, allowAuto);
  tradingViewToolBtn.parentElement?.insertBefore(newBtn, tradingViewToolBtn);
  tradingViewToolBtn.parentElement?.insertBefore(newBtnAuto, tradingViewToolBtn);

  const watchList = await whileFind({
    find: () => getXPath('//div[@class="widgetbar-widgetbody"]/div[contains(@class,"watchlist")]//div[contains(@class,"listContainer")]/div'),
    sleepFn: sleep,
  });

  const fitHandle = async (e?: MouseEvent) => {
    if (!allowAuto) return;
    await sleep(100);
    await whileFind({
      find: function () {
        return !isChartLoading();
      },
      sleepFn: sleep,
      delay: 50,
    });

    // if (isAutoFitSScreen()) return;

    if (e) {
      const row = (e.target as HTMLElement).closest('div[style*="position: absolute"]');
      if (!row) return;
      const symbol = getXPath('.//span[contains(@class,"symbolNameText")]', row)?.textContent;

      if (!symbol) return;
    }

    await chartScaleFit();

    const symbol = getCurrentSelectedSym();

    if (!symbol || !checkSymbolNameFromHint(valueHint, symbol, true)) return;

    await chartScaleFix({ valueHint });
  };

  watchList.addEventListener("click", fitHandle);
}

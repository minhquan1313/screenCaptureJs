import svg from "@/assets/svg/reset.svg";
import { focusedChartXpath } from "@/constants/tdv";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { textToDom } from "@/utils/textToDom";
import { createCopyTradingViewRightToolBar } from "@/utils/tradingView/createCopyTradingViewRightToolBar";
import { getTradingViewRightToolBarBtn } from "@/utils/tradingView/getTradingViewRightToolBarBtn";
import { multiChartRecenter } from "@/utils/tradingView/multiChartRecenter";
import { tradingViewBtnHightLight } from "@/utils/tradingView/tradingViewBtnHightLight";
import { whileFind } from "@/utils/whileFind";

export async function addMultiChartCenterCurrent() {
  const iconEle = textToDom(svg);

  const tradingViewToolBtn = await whileFind({
    find: getTradingViewRightToolBarBtn,
    sleepFn: sleep,
  });

  const newBtn = await whileFind({
    find: () =>
      createCopyTradingViewRightToolBar(iconEle, "Recenter MultiChart", {
        height: "24px",
        width: "24px",
      }),
    sleepFn: sleep,
  });

  newBtn.addEventListener("click", async () => {
    try {
      tradingViewBtnHightLight(newBtn, true);

      const currentSelectedChart = getXPath(focusedChartXpath);

      await multiChartRecenter({ selectedChart: currentSelectedChart });
    } catch (error) {}
    tradingViewBtnHightLight(newBtn, false);
  });

  tradingViewToolBtn.parentElement?.insertBefore(newBtn, tradingViewToolBtn);
}

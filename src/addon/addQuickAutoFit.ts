import svg from "@/assets/svg/reset.svg";
import { sleep } from "@/utils/sleep";
import { textToDom } from "@/utils/textToDom";
import { chartScaleFit } from "@/utils/tradingView/chartScaleFit";
import { createCopyTradingViewRightToolBar } from "@/utils/tradingView/createCopyTradingViewRightToolBar";
import { getTradingViewRightToolBarBtn } from "@/utils/tradingView/getTradingViewRightToolBarBtn";
import { tradingViewBtnHightLight } from "@/utils/tradingView/tradingViewBtnHightLight";
import { whileFind } from "@/utils/whileFind";

export async function addQuickAutoFit() {
  const iconEle = textToDom(svg);

  const tradingViewToolBtn = await whileFind({
    find: getTradingViewRightToolBarBtn,
    sleepFn: sleep,
  });

  const newBtn = await whileFind({
    find: () =>
      createCopyTradingViewRightToolBar(iconEle, "Auto fit nhanh", {
        height: "24px",
        width: "24px",
      }),
    sleepFn: sleep,
  });

  newBtn.addEventListener("click", async () => {
    try {
      tradingViewBtnHightLight(newBtn, true);

      await chartScaleFit();
    } catch (error) {}
    tradingViewBtnHightLight(newBtn, false);
  });

  tradingViewToolBtn.parentElement?.insertBefore(newBtn, tradingViewToolBtn);
}

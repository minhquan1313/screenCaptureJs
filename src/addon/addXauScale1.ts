import svg from "@/assets/svg/expand.svg";
import { sleep } from "@/utils/sleep";
import { textToDom } from "@/utils/textToDom";
import { chartScaleFix } from "@/utils/tradingView/chartScaleFix";
import { createCopyTradingViewRightToolBar } from "@/utils/tradingView/createCopyTradingViewRightToolBar";
import { getTradingViewRightToolBarBtn } from "@/utils/tradingView/getTradingViewRightToolBarBtn";
import { whileFind } from "@/utils/whileSleep";

export async function addXauScale1() {
  const iconEle = textToDom(svg);

  const tradingViewToolBtn = await whileFind({
    find: getTradingViewRightToolBarBtn,
    sleepFn: sleep,
  });

  const newBtn = await whileFind({
    find: () =>
      createCopyTradingViewRightToolBar(iconEle, "Khoá thu phóng", {
        height: "24px",
        width: "24px",
      }),
    sleepFn: sleep,
  });

  newBtn.addEventListener("click", chartScaleFix);

  tradingViewToolBtn.parentElement?.insertBefore(newBtn, tradingViewToolBtn);
}

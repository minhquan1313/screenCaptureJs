import { panelOptions } from "@/constants/panelOptions";
import { capture } from "@/utils/capture";
import { getHMS } from "@/utils/getHMS";
import { getTimeForDom } from "@/utils/getTimeForDom";
import { makeContentOnDomV2, onContentWindowDestroyAttach } from "@/utils/makeContentOnDomV2";
import { sleep } from "@/utils/sleep";
import { getDiffXauVsGc1ForDom } from "@/utils/tradingView/getDiffXauVsGc1ForDom";
import { makePanelOptionUI } from "@/utils/tradingView/makePanelOptionUI";
import { tradingViewCheckTime } from "@/utils/tradingView/tradingViewCheckTime";

const requireCondition = true;

async function main() {
  try {
    let lastCaptured: Date = new Date();
    lastCaptured.setMinutes(lastCaptured.getMinutes() - 1);

    const timeToDom = getTimeForDom();
    makeContentOnDomV2(timeToDom + "\n", false, makePanelOptionUI(panelOptions));

    let keepRunning = true;

    onContentWindowDestroyAttach(() => {
      keepRunning = false;
    });

    while (keepRunning) {
      const everyMinute = panelOptions.captureMinute.value as number;
      const delay = (panelOptions.scanTimeInterval.value as number) * 1000;

      const minuteMap = Array(Math.ceil(60 / everyMinute))
        .fill(0)
        .map((_, i) => i * everyMinute);

      const time = new Date();
      const [h, m] = getHMS(time);

      const [hLast, mLast] = getHMS(lastCaptured);

      let captureValid = false;

      if (requireCondition) {
        // console.log("🚀 ~ main ~ minuteMap.includes(m):", minuteMap.includes(m));
        // console.log("🚀 ~ main ~ tradingViewCheckTime(time):", tradingViewCheckTime(time));
        // console.log("🚀 ~ main ~ mLast !== m:", mLast !== m);
        // console.log("======================================================================");

        console.log("NOW I capture screen", new Date().toLocaleString());

        if (minuteMap.includes(m) && mLast !== m && tradingViewCheckTime(time)) {
          captureValid = true;
        } else {
          console.log("Not capturing time");
          captureValid = false;
        }
      }

      if (captureValid && panelOptions.allowCapture.value) {
        const timeToDom = getTimeForDom();
        const diffXauVsGc1 = getDiffXauVsGc1ForDom();
        makeContentOnDomV2(timeToDom + "\n" + diffXauVsGc1 + "\n", true, makePanelOptionUI(panelOptions));

        await capture("tradingViewGC1");
        lastCaptured = time;
      } else if (panelOptions.updateRealtime.value) {
        const timeToDom = getTimeForDom();
        const diffXauVsGc1 = getDiffXauVsGc1ForDom();
        makeContentOnDomV2(timeToDom + "\n" + diffXauVsGc1 + "\n", false, makePanelOptionUI(panelOptions));
      }

      // await sleep(200);
      await sleep(delay);
    }
  } catch (error) {
    const timeToDom = getTimeForDom();
    makeContentOnDomV2(timeToDom + "\n" + "Đã xảy ra lỗi và script đã dừng", false, makePanelOptionUI(panelOptions));
    console.log({ error });
  }
}

main();

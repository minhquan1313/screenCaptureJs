import { capture } from "@/utils/capture";
import { getDiffXauVsGc1ForDom } from "@/utils/getDiffXauVsGc1ForDom";
import { getHMS } from "@/utils/getHMS";
import { getTimeForDom } from "@/utils/getTimeForDom";
import { makeContentOnDomV2 } from "@/utils/makeContentOnDomV2";
import { sleep } from "@/utils/sleep";
import { tradingViewCheckTime } from "@/utils/tradingViewCheckTime";

const requireCondition = true;

async function main(delay = 3000, everyMinute = 30) {
  try {
    let lastCaptured: Date = new Date();
    lastCaptured.setMinutes(lastCaptured.getMinutes() - 1);

    const minuteMap = Array(Math.ceil(60 / everyMinute))
      .fill(0)
      .map((_, i) => i * everyMinute);

    const timeToDom = getTimeForDom();
    makeContentOnDomV2(timeToDom + "\n", false);

    while (true) {
      const time = new Date();
      const [h, m] = getHMS(time);

      const [hLast, mLast] = getHMS(lastCaptured);

      let allowCapture = true;

      if (requireCondition) {
        console.log("🚀 ~ main ~ minuteMap.includes(m):", minuteMap.includes(m));
        console.log("🚀 ~ main ~ tradingViewCheckTime(time):", tradingViewCheckTime(time));
        console.log("🚀 ~ main ~ mLast !== m:", mLast !== m);
        console.log("======================================================================");

        if (minuteMap.includes(m) && mLast !== m && tradingViewCheckTime(time)) {
          console.log("NOW I capture screen", new Date().toLocaleString());
          allowCapture = true;
        } else {
          console.log("Not capturing time");
          allowCapture = false;
        }
      }

      if (allowCapture) {
        console.clear();

        const timeToDom = getTimeForDom();
        const diffXauVsGc1 = getDiffXauVsGc1ForDom();
        makeContentOnDomV2(timeToDom + "\n" + diffXauVsGc1 + "\n", allowCapture);

        await capture("tradingViewGC1");
        lastCaptured = time;
      }

      await sleep(delay);
    }
  } catch (error) {
    const timeToDom = getTimeForDom();
    makeContentOnDomV2(timeToDom + "\n" + "Đã xảy ra lỗi và script đã dừng");
    console.log({ error });
  }
}

main();

import { capture } from "@/utils/capture";
import { getDiffXauVsGc1ForDom } from "@/utils/getDiffXauVsGc1ForDom";
import { getHMS } from "@/utils/getHMS";
import { getTimeForDom } from "@/utils/getTimeForDom";
import { makeContentOnDom } from "@/utils/makeContentOnDom";
import { sleep } from "@/utils/sleep";

const requireCondition = true;

async function main(delay = 3000, everyMinute = 30) {
  let lastCaptured: Date = new Date();
  lastCaptured.setMinutes(lastCaptured.getMinutes() - 1);

  const minuteMap = Array(Math.ceil(60 / everyMinute))
    .fill(0)
    .map((_, i) => i * everyMinute);

  const timeToDom = getTimeForDom();
  makeContentOnDom(timeToDom + "\n", false);

  while (true) {
    let time = new Date();
    const [h, m] = getHMS(time);

    const [hLast, mLast] = getHMS(lastCaptured);

    let allowCapture = true;

    if (requireCondition) {
      if (minuteMap.includes(m) && mLast !== m) {
        console.log("NOW I capture screen", new Date().toLocaleString());
        allowCapture = true;
      } else {
        console.log("Not capturing time");
        allowCapture = false;
      }
    }

    if (allowCapture) {
      const timeToDom = getTimeForDom();
      const diffXauVsGc1 = getDiffXauVsGc1ForDom();
      makeContentOnDom(timeToDom + "\n" + diffXauVsGc1 + "\n");

      await capture("tradingViewGC1");
      lastCaptured = time;
    }

    await sleep(delay);
  }
}

main();

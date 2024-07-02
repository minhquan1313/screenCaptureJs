import { capture } from "@/utils/capture";
import { getHMS } from "@/utils/getHMS";
import { sleep } from "@/utils/sleep";

const requireCondition = true;

async function main(delay = 1000, everyMinute = 30) {
  let lastCaptured: Date = new Date();
  lastCaptured.setMinutes(lastCaptured.getMinutes() - 1);

  const minuteMap = Array(Math.ceil(60 / everyMinute))
    .fill(0)
    .map((_, i) => i * everyMinute);

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
      await capture("tradingViewGC1");
      lastCaptured = time;
    }

    await sleep(delay);
  }
}

main();

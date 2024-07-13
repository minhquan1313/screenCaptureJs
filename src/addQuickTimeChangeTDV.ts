import { createCopyTradingViewRightToolBar } from "@/utils/createCopyTradingViewRightToolBar";
import { cssApply } from "@/utils/cssApply";
import { getTradingViewRightToolBarBtn } from "@/utils/getTradingViewRightToolBarBtn";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";

async function addQuickTimeChangeTDV() {
  while (true) {
    const tradingViewToolBtn = getTradingViewRightToolBarBtn();
    if (!tradingViewToolBtn) {
      await sleep(100);
      continue;
    }

    const [utc1Btn, utc7Btn] = [
      {
        value: "(UTC+1) London",
        label: "T+1",
      },
      {
        value: "(UTC+7) Ho Chi Minh",
        label: "T+7",
      },
    ].map(({ value, label }) => {
      const d = document.createElement("div");

      const xPath = '//tr//span[contains(text(),"' + value + '")]';

      d.onclick = async () => {
        const tdvTimeBtn = document.querySelector<HTMLButtonElement>('button[data-name="time-zone-menu"]');
        if (!tdvTimeBtn) return;

        tdvTimeBtn.click();

        let timedOut = false;
        const sto = setTimeout(() => {
          timedOut = true;
        }, 10000);

        while (true) {
          if (timedOut) return;

          const element = getXPath(xPath);

          // console.log(`~🤖 index2 🤖~ `, { element, xPath });

          if (!element) {
            await sleep(100);
            continue;
          }

          clearTimeout(sto);
          element.click();

          return;
        }
      };

      d.textContent = label;

      cssApply(d, {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });

      return d;
    });

    const eleList = [utc1Btn, utc7Btn].map((e) => createCopyTradingViewRightToolBar(e, e.innerText)!);

    eleList.forEach((ele) => tradingViewToolBtn.parentElement?.insertBefore(ele, tradingViewToolBtn));

    return;
  }
}

addQuickTimeChangeTDV();

import { cssApply } from "@/utils/cssApply";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { createCopyTradingViewRightToolBar } from "@/utils/tradingView/createCopyTradingViewRightToolBar";
import { getTradingViewRightToolBarBtn } from "@/utils/tradingView/getTradingViewRightToolBarBtn";
import { tradingViewBtnHightLight } from "@/utils/tradingView/tradingViewBtnHightLight";
import { whileFind } from "@/utils/whileSleep";

const data = [
  {
    value: "(UTC+1) London",
    label: "T+1",
  },
  {
    value: "(UTC+7) Ho Chi Minh",
    label: "T+7",
  },
] as const;

export async function addQuickTimeChangeTDV() {
  while (true) {
    await sleep(100);

    const tradingViewToolBtn = getTradingViewRightToolBarBtn();
    if (!tradingViewToolBtn || !tradingViewToolBtn.parentElement) continue;

    const eleList = data.map((d) => {
      const { value, label } = d;

      const icon = document.createElement("div");
      icon.textContent = label;
      cssApply(icon, {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });

      return { ele: createCopyTradingViewRightToolBar(icon, value), ...d };
    });

    const regex = /\(UTC[+-]\d+\)/;
    const currentTimeZoneSelected = getXPath('//*[@data-name="time-zone-menu"]')?.textContent?.match(regex)?.[0];
    console.log(`~🤖 addQuickTimeChangeTDV 🤖~ `, { currentTimeZoneSelected });

    if (!currentTimeZoneSelected) continue;

    eleList.forEach(({ ele, value }) => {
      if (!ele) return;

      console.log({ include: value.includes(currentTimeZoneSelected), value });
      if (value.includes(currentTimeZoneSelected)) {
        tradingViewBtnHightLight(ele, true);
      }

      const clickHandler = async () => {
        try {
          const tdvTimeBtn = document.querySelector<HTMLButtonElement>('button[data-name="time-zone-menu"]');
          if (!tdvTimeBtn) return;

          tdvTimeBtn.click();

          const timeEle = await whileFind({
            find: () => {
              const xPath = '//tr//span[contains(text(),"' + value + '")]';
              const ele = getXPath(xPath);

              return ele;
            },
            sleepFn: sleep,
          });

          timeEle.click();

          tradingViewBtnHightLight(ele, true);

          eleList.forEach(({ ele: ele1 }) => ele1 && ele1 !== ele && tradingViewBtnHightLight(ele1, false));
        } catch (error) {}
      };

      ele.addEventListener("click", clickHandler);

      tradingViewToolBtn.parentElement?.insertBefore(ele, tradingViewToolBtn);
    });

    break;
  }
}

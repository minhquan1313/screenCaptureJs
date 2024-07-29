import { cssApply } from "@/utils/cssApply";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { createCopyTradingViewRightToolBar } from "@/utils/tradingView/createCopyTradingViewRightToolBar";
import { getTradingViewRightToolBarBtn } from "@/utils/tradingView/getTradingViewRightToolBarBtn";
import { tradingViewBtnHightLight } from "@/utils/tradingView/tradingViewBtnHightLight";
import { whileFind } from "@/utils/whileFind";

const data = [
  {
    value: "UTC",
    label: "UTC",
  },
  {
    value: "London",
    label: "T+1",
  },
  {
    value: "(UTC+7)",
    label: "T+7",
  },
] as const;

export async function addQuickTimeChangeTDV() {
  const tradingViewToolBtn = await whileFind({
    find: getTradingViewRightToolBarBtn,
    sleepFn: sleep,
  });

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

  const regex = /\(UTC[+-]?\d*\)/;

  const currentTimeZoneSelected = await whileFind({
    find: () => getXPath('//*[@data-name="time-zone-menu"]')?.textContent?.match(regex)?.[0],
    sleepFn: sleep,
  });

  eleList.forEach(({ ele, value }) => {
    if (!ele) return;

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
}

import playSvg from "@/assets/svg/play.svg";
import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { textToDom } from "@/utils/textToDom";
import { createCopyTradingViewRightToolBar } from "@/utils/tradingView/createCopyTradingViewRightToolBar";
import { getTradingViewRightToolBarBtn } from "@/utils/tradingView/getTradingViewRightToolBarBtn";
import { tradingViewBtnHightLight } from "@/utils/tradingView/tradingViewBtnHightLight";
import { updateCopyTradingViewRightToolBar } from "@/utils/tradingView/updateCopyTradingViewRightToolBar";
import { whileFind } from "@/utils/whileSleep";

let delay = Number(localStorage.getItem("mtb.tdv.play_replay_delay")) || 1;
const delayGap = 0.5;
const delayMin = 0.5;
const delayMax = 10;
export async function addPlayReplayTDV() {
  const tradingViewToolBtn = await whileFind({
    find: getTradingViewRightToolBarBtn,
    sleepFn: sleep,
  });

  const playEle = textToDom(playSvg);

  function getName() {
    return "Chạy " + delay.toFixed(1) + "s";
  }

  const tdvBtn = await whileFind({
    find: () => createCopyTradingViewRightToolBar(playEle, getName()),
    sleepFn: sleep,
  });

  let sto: number;
  let isPlaying = false;

  const update = () => {
    localStorage.setItem("mtb.tdv.play_replay_delay", String(delay));

    updateCopyTradingViewRightToolBar({
      btnCopy: tdvBtn,
      name: getName(),
    });
  };

  const clickHandler = () => {
    if (isPlaying) return;

    const playXPath = '//*[contains(@class,"controls__control")][2]/div';
    const playBtn = getXPath(playXPath);

    if (!playBtn) return;
    clearTimeout(sto);
    playBtn.click();
    tradingViewBtnHightLight(tdvBtn, true);

    isPlaying = true;

    sto = setTimeout(() => {
      playBtn.click();
      isPlaying = false;
      tradingViewBtnHightLight(tdvBtn, false);
    }, delay * 1000);
  };
  const wheelHandler = (e: WheelEvent) => {
    const { deltaY } = e;

    if (deltaY > 0) {
      // Scroll down
      delay -= delayGap;
      if (delay < delayMin) delay = delayMin;
    } else {
      // Scroll up
      delay += delayGap;
      if (delay > delayMax) delay = delayMax;
    }

    update();
  };

  tdvBtn.addEventListener("click", clickHandler);
  tdvBtn.addEventListener("wheel", wheelHandler);

  tradingViewToolBtn.parentElement?.insertBefore(tdvBtn, tradingViewToolBtn);
}

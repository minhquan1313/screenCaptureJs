import { getCenterCoord } from "@/utils/getCenterCoord";
import { sleep } from "@/utils/sleep";

export async function triggerMouseDownUp(ele: HTMLElement) {
  ele.scrollIntoView({
    behavior: "instant",
  });

  const { x, y } = getCenterCoord(ele);

  const mousedown = new MouseEvent("mousedown", {
    clientX: x,
    clientY: y,
    bubbles: true,
    cancelable: true,
    view: window,
  });
  const mouseup = new MouseEvent("mouseup", {
    clientX: x,
    clientY: y,
    bubbles: true,
    cancelable: true,
    view: window,
  });

  ele.dispatchEvent(mousedown);
  await sleep(50);
  ele.dispatchEvent(mouseup);
}

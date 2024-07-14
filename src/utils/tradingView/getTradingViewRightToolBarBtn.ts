import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";

const xpath = '//div[@data-name="right-toolbar"]/*[contains(@class,"filler")]/following-sibling::button[1]';

export function getTradingViewRightToolBarBtn() {
  const btnInToolbar = getXPath(xpath);

  if (!btnInToolbar) return;

  return btnInToolbar;
}
export function getTradingViewRightToolBarBtnAsync() {
  return new Promise<HTMLElement>((rs, rj) => {
    (async () => {
      let allowRun = true;

      const sto = setTimeout(() => {
        allowRun = false;
        rj("Timed out");
      }, 10000);

      while (allowRun) {
        const btnInToolbar = getXPath(xpath);

        if (!btnInToolbar) {
          await sleep(100);
          continue;
        }

        clearTimeout(sto);
        rs(btnInToolbar);
        return;
      }
    })();
  });
}

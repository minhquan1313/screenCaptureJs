import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { whileFind } from "@/utils/whileSleep";

export async function getClassActive() {
  const btnInToolbar = await whileFind({
    sleepFn: sleep,
    find: () => {
      const xpath = '//div[@data-name="right-toolbar"]/button[contains(@class, "isActive")][1]';
      const btnInToolbar = getXPath(xpath);
      return btnInToolbar;
    },
  });

  const className = [...btnInToolbar.classList].find((str) => str.includes("isActive"));
  return className;

  // return new Promise<string | undefined>(async (rs) => {
  //   let allowRun = true;

  //   const sto = setTimeout(() => {
  //     allowRun = false;
  //     rs(undefined);
  //   }, 10000);

  //   while (allowRun) {
  //     await sleep(100);

  //     const xpath = '//div[@data-name="right-toolbar"]/button[contains(@class, "isActive")][1]';
  //     const btnInToolbar = getXPath(xpath);

  //     if (!btnInToolbar) {
  //       continue;
  //     }

  //     const c = [...btnInToolbar.classList].find((str) => str.includes("isActive"));

  //     clearTimeout(sto);
  //     return rs(c);
  //   }

  //   rs(undefined);
  // });
}

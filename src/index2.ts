import { getXPath } from "@/utils/getXPath";
import { sleep } from "@/utils/sleep";
import { whileFind } from "@/utils/whileFind";

async function main() {
  const regex = /\(UTC[+-]?\d*\)/;

  const currentTimeZoneSelected = await whileFind({
    find: () => {
      const t = getXPath('//*[@data-name="time-zone-menu"]')?.textContent;

      console.log(`~🤖 index2 🤖~ `, { t });

      const value = t?.match(regex)?.[0];
      console.log("🚀 ~ main ~ value:", value);

      return value;
    },
    sleepFn: sleep,
  });
}

main();

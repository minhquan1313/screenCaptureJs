import { getHMS, getYMD } from "@/utils/getHMS";

export function getTimeForDom() {
  const timeNow = new Date();
  const [h, m, s] = getHMS(timeNow);
  const [y, mo, d] = getYMD(timeNow);

  const timeStrDom =
    [y, mo, d].map((v) => String(v).padStart(2, "0")).join("/") + " " + [h, m, s].map((v) => String(v).padStart(2, "0")).join(":") + "(UTC+7)";

  const timeStrDom2 = timeNow.toLocaleString("en-GB", { timeZone: "Europe/London", timeZoneName: "shortOffset" });
  const timeStrDom3 = timeNow.toLocaleString("en-GB", { timeZone: "Asia/Bangkok", timeZoneName: "shortOffset" });

  return timeStrDom2 + "\n" + timeStrDom3;
}

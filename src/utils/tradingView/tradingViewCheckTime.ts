import { getHMS, getYMD } from "@/utils/getHMS";

export function tradingViewCheckTime(nowTime: Date) {
  const tdvTime = getTdvTime();

  if (!tdvTime) return false;
  const [nH, nM] = getHMS(nowTime);
  const [tH, tM] = getHMS(tdvTime);

  return nH === tH && nM === tM;
}

function getTdvTime() {
  const ele = document.querySelector<HTMLButtonElement>('button[data-name="time-zone-menu"]');
  if (!ele) return;

  const regex = /[()]|UTC/g;

  const eleText = ele.innerText.trim();
  const [time, utc] = eleText.split(" ").map((text) => text.replace(regex, ""));
  const [utcSign, utcNumber] = [utc[0], utc.slice(1).padStart(2, "0")];

  const dateStr = getYMD(new Date())
    .map((v) => String(v).padStart(2, "0"))
    .join("-");
  const timeStr = "T" + time + ".000" + utcSign + utcNumber + ":00";

  const date = new Date(dateStr + timeStr);
  return date;
}

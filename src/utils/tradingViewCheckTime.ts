import { getHMS, getYMD } from "@/utils/getHMS";

export function tradingViewCheckTime(nowTime: Date) {
  const tdvTime = getTdvTime();

  console.log(`~🤖 tradingViewCheckTime 🤖~ `, { tdvTime: tdvTime?.toLocaleTimeString(), nowTime: nowTime.toLocaleTimeString() });

  if (!tdvTime) return false;
  const [nH, nM] = getHMS(nowTime);
  const [tH, tM] = getHMS(tdvTime);

  return nH === tH && nM === tM;
}

function getTdvTime() {
  const ele = document.querySelector<HTMLButtonElement>('button[data-name="time-zone-menu"]');
  if (!ele) return;

  const regex = /[()]|UTC/g;

  //   const template = "2024-07-11T16:01:35.000+01:00";
  //   console.log(new Date(template).toString());

  const eleText = ele.innerText.trim();
  //   const eleText = "16:05:38 (UTC+1)";
  const [time, utc] = eleText.split(" ").map((text) => text.replace(regex, ""));
  const [utcSign, utcNumber] = [utc[0], utc.slice(1).padStart(2, "0")];

  //   if (!time||!utc) return;

  //   time;
  //   utc;
  //   utcSign;
  //   utcNumber;

  const dateStr = getYMD(new Date())
    .map((v) => String(v).padStart(2, "0"))
    .join("-");
  const timeStr = "T" + time + ".000" + utcSign + utcNumber + ":00";
  //   dateStr;
  //   timeStr;

  const date = new Date(dateStr + timeStr);
  return date;
  //   const [h, m, s] = getHMS(date);
  //   h;
  //   m;
  //   s;
  //   console.log(date.toString());

  //   const template = "2024-06-11T16:01:35.000+01:00";

  //   console.log("🚀 ~ getTdvTime ~ time, utc:", { time, utc });
}

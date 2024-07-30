import { detectBuySell, getEST } from "@/addon/addAutoEST";

async function main() {
  const clickHandle = () => {
    const est = getEST();
    if (!est) return;
    const positionType = detectBuySell(est);
    if (!positionType) return;

    const value = [positionType, ...Object.values(est)].join("|");
  };

  clickHandle();
}

main();

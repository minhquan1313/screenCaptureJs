import { addAutoEST } from "@/addon/addAutoEST";
import { addMultiChartCenterCurrent } from "@/addon/addMultiChartCenterCurrent";
import { addPlayReplayTDV } from "@/addon/addPlayReplayTDV";
import { addQuickTimeChangeTDV } from "@/addon/addQuickTimeChangeTDV";
import { addXauScale1 } from "@/addon/addXauScale1";

async function makeTradingViewAddonBtn() {
  try {
    addAutoEST();

    await addQuickTimeChangeTDV();

    await addPlayReplayTDV();

    await addXauScale1();

    await addMultiChartCenterCurrent();
  } catch (error) {
    console.log("makeTradingViewAddonBtn error", error);
  }
}

makeTradingViewAddonBtn();

import { addAutoEST } from "@/addon/addAutoEST";
import { addMultiChartCenterCurrent } from "@/addon/addMultiChartCenterCurrent";
import { addPlayReplayTDV } from "@/addon/addPlayReplayTDV";
import { addQuickTimeChangeTDV } from "@/addon/addQuickTimeChangeTDV";
import { addXauScale1 } from "@/addon/addXauScale1";

async function makeTradingViewAddonBtn() {
  console.log("Starting...");
  try {
    addAutoEST();
    console.log("addAutoEST");

    await addQuickTimeChangeTDV();
    console.log("addQuickTimeChangeTDV");

    await addPlayReplayTDV();
    console.log("addPlayReplayTDV");

    await addXauScale1();
    console.log("addXauScale1");

    await addMultiChartCenterCurrent();
    console.log("addMultiChartCenterCurrent");
  } catch (error) {
    console.log("makeTradingViewAddonBtn error", error);
  }
}

makeTradingViewAddonBtn();

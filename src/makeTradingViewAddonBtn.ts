import { addAutoEST } from "@/addon/addAutoEST";
import { addPlayReplayTDV } from "@/addon/addPlayReplayTDV";
import { addQuickTimeChangeTDV } from "@/addon/addQuickTimeChangeTDV";
import { addXauScale1 } from "@/addon/addXauScale1";

async function makeTradingViewAddonBtn() {
  try {
    await addQuickTimeChangeTDV();

    await addPlayReplayTDV();

    await addXauScale1();

    addAutoEST();
    // await addQuickAutoFit();
  } catch (error) {
    console.log("makeTradingViewAddonBtn error", error);
  }
}

makeTradingViewAddonBtn();

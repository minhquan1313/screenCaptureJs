import { addPlayReplayTDV } from "@/addon/addPlayReplayTDV";
import { addQuickAutoFit } from "@/addon/addQuickAutoFit";
import { addQuickTimeChangeTDV } from "@/addon/addQuickTimeChangeTDV";
import { addXauScale1 } from "@/addon/addXauScale1";

async function makeTradingViewAddonBtn() {
  await addQuickTimeChangeTDV();
  await addPlayReplayTDV();
  await addXauScale1();
  await addQuickAutoFit();
}

makeTradingViewAddonBtn();
